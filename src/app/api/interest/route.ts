import { appendMarketplaceManualOpsEntry } from '@/lib/marketplace-manual-ops';
import { getOperatorSession } from '@/lib/auth';
import { getMarketplaceListingBySlug } from '@/lib/marketplace';
import {
  getMarketplaceReleaseStage,
  isMarketplacePreviewEnabled,
} from '@/lib/marketplace-release-stage';
import { NextResponse } from 'next/server';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const AMOUNT_EPSILON = 0.01;
const STEP_EPSILON = 0.000001;

function getGoogleSheetsWebAppUrl() {
  return process.env.GOOGLE_SHEETS_WEB_APP_URL?.trim() || null;
}

function normalizeOptionalString(value: unknown) {
  return typeof value === 'string' ? value.trim() || undefined : undefined;
}

function normalizeOptionalNumber(value: unknown) {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
}

function createSubmissionReference() {
  const stamp = new Date()
    .toISOString()
    .slice(0, 19)
    .replace(/-/g, '')
    .replace(/:/g, '')
    .replace('T', '');
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `MKT-${stamp}-${random}`;
}

function isMultipleOfStep(value: number, step: number) {
  if (step <= 0) return false;
  const ratio = value / step;
  return Math.abs(ratio - Math.round(ratio)) < STEP_EPSILON;
}

function amountsMatch(left: number, right: number) {
  return Math.abs(left - right) <= AMOUNT_EPSILON;
}

export async function POST(req: Request) {
  const releaseStage = getMarketplaceReleaseStage();
  const googleSheetsWebAppUrl = getGoogleSheetsWebAppUrl();
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const {
    email,
    campaignKey,
    source,
    fullName,
    phone,
    horseId,
    horseName,
    leaseId,
    listingSlug,
    submissionType,
    applicationStatus,
    requestedStakePercent,
    requestedUnits,
    reservationAmountNzd,
    notes,
  } =
    body && typeof body === 'object' ? (body as Record<string, unknown>) : {};

  if (typeof email !== 'string' || typeof campaignKey !== 'string') {
    return NextResponse.json(
      { error: 'Missing email or campaignKey' },
      { status: 400 }
    );
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (!EMAIL_PATTERN.test(normalizedEmail)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  const normalizedCampaignKey = campaignKey.trim();
  if (!normalizedCampaignKey) {
    return NextResponse.json({ error: 'Missing email or campaignKey' }, { status: 400 });
  }

  const normalizedSource = normalizeOptionalString(source);
  const normalizedFullName = normalizeOptionalString(fullName);
  const normalizedPhone = normalizeOptionalString(phone);
  const normalizedHorseId = normalizeOptionalString(horseId);
  const normalizedHorseName = normalizeOptionalString(horseName);
  const normalizedLeaseId = normalizeOptionalString(leaseId);
  const normalizedListingSlug = normalizeOptionalString(listingSlug);
  const normalizedSubmissionType = normalizeOptionalString(submissionType);
  const normalizedApplicationStatus =
    normalizeOptionalString(applicationStatus) ?? 'submitted';
  const normalizedRequestedStakePercent =
    normalizeOptionalNumber(requestedStakePercent);
  const normalizedRequestedUnits = normalizeOptionalNumber(requestedUnits);
  const normalizedReservationAmountNzd =
    normalizeOptionalNumber(reservationAmountNzd);
  const normalizedNotes = normalizeOptionalString(notes);

  const isMarketplaceSubmission =
    normalizedCampaignKey.startsWith('marketplace-') ||
    Boolean(
      normalizedListingSlug ||
        normalizedHorseId ||
        normalizedHorseName ||
        normalizedLeaseId ||
        normalizedRequestedStakePercent != null,
    );

  if (isMarketplaceSubmission && !isMarketplacePreviewEnabled()) {
    return NextResponse.json(
      { error: 'Marketplace applications are not available in the current release stage.' },
      { status: 404 },
    );
  }

  if (isMarketplaceSubmission && releaseStage === 'pending') {
    const session = await getOperatorSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Marketplace review access is restricted.' },
        { status: 403 },
      );
    }
  }

  if (!googleSheetsWebAppUrl && !isMarketplaceSubmission) {
    return NextResponse.json(
      { error: 'Lead capture is not configured for this environment.' },
      { status: 503 },
    );
  }

  let submissionReference: string | undefined;
  let googleSheetsStatus: 'forwarded' | 'not_configured' | 'failed' =
    googleSheetsWebAppUrl ? 'failed' : 'not_configured';
  let googleSheetsError: string | undefined;

  let upstreamResponse: Response | null = null;
  let upstreamData: unknown = null;
  let warning: string | undefined;

  if (isMarketplaceSubmission) {
    if (
      !normalizedListingSlug ||
      !normalizedFullName ||
      normalizedRequestedStakePercent == null ||
      normalizedRequestedUnits == null ||
      normalizedReservationAmountNzd == null
    ) {
      return NextResponse.json(
        { error: 'Missing required marketplace application fields.' },
        { status: 400 },
      );
    }

    const listing = getMarketplaceListingBySlug(normalizedListingSlug);
    if (!listing || listing.publishStatus !== 'live') {
      return NextResponse.json(
        { error: 'This listing is not available for applications.' },
        { status: 400 },
      );
    }

    if (normalizedCampaignKey !== listing.application.campaignKey) {
      return NextResponse.json(
        { error: 'Campaign details do not match the live listing.' },
        { status: 400 },
      );
    }

    if (normalizedSource && normalizedSource !== listing.application.sourcePath) {
      return NextResponse.json(
        { error: 'Application source does not match the live listing.' },
        { status: 400 },
      );
    }

    if (
      normalizedHorseId &&
      normalizedHorseId !== listing.horse.id
    ) {
      return NextResponse.json(
        { error: 'Horse details do not match the live listing.' },
        { status: 400 },
      );
    }

    if (
      normalizedHorseName &&
      normalizedHorseName !== listing.horse.name
    ) {
      return NextResponse.json(
        { error: 'Horse details do not match the live listing.' },
        { status: 400 },
      );
    }

    if (
      normalizedLeaseId &&
      normalizedLeaseId !== listing.offering.leaseId
    ) {
      return NextResponse.json(
        { error: 'Lease details do not match the live listing.' },
        { status: 400 },
      );
    }

    if (
      normalizedRequestedStakePercent < listing.application.minimumStakePercent ||
      normalizedRequestedStakePercent > listing.application.maximumStakePercent
    ) {
      return NextResponse.json(
        { error: 'Requested stake falls outside the live listing limits.' },
        { status: 400 },
      );
    }

    if (
      !isMultipleOfStep(
        normalizedRequestedStakePercent,
        listing.offering.stakeUnitPercent,
      )
    ) {
      return NextResponse.json(
        { error: 'Requested stake must align to the listing stake unit.' },
        { status: 400 },
      );
    }

    const expectedUnits = Math.round(
      normalizedRequestedStakePercent / listing.offering.stakeUnitPercent,
    );
    if (!Number.isInteger(normalizedRequestedUnits) || normalizedRequestedUnits !== expectedUnits) {
      return NextResponse.json(
        { error: 'Requested units do not match the requested stake.' },
        { status: 400 },
      );
    }

    const expectedReservationAmountNzd = Number(
      (expectedUnits * listing.offering.tokenPriceNzd).toFixed(2),
    );
    if (
      !amountsMatch(
        normalizedReservationAmountNzd,
        expectedReservationAmountNzd,
      )
    ) {
      return NextResponse.json(
        { error: 'Reservation value does not match the live listing pricing.' },
        { status: 400 },
      );
    }

    submissionReference = createSubmissionReference();

    if (googleSheetsWebAppUrl) {
      try {
        upstreamResponse = await fetch(googleSheetsWebAppUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: normalizedEmail,
            campaignKey: normalizedCampaignKey,
            source: listing.application.sourcePath,
            fullName: normalizedFullName,
            phone: normalizedPhone,
            horseId: listing.horse.id,
            horseName: listing.horse.name,
            leaseId: listing.offering.leaseId,
            listingSlug: listing.slug,
            submissionType: 'application_reservation',
            applicationStatus: normalizedApplicationStatus,
            requestedStakePercent: normalizedRequestedStakePercent,
            requestedUnits: expectedUnits,
            reservationAmountNzd: expectedReservationAmountNzd,
            notes: normalizedNotes,
            submittedAt: new Date().toISOString(),
            submissionReference,
          }),
        });

        try {
          upstreamData = await upstreamResponse.json();
        } catch {
          upstreamData = null;
        }

        const upstreamError =
          upstreamData &&
          typeof upstreamData === 'object' &&
          'error' in upstreamData
            ? (upstreamData as { error?: string }).error
            : null;

        if (!upstreamResponse.ok || upstreamError) {
          googleSheetsError =
            upstreamError || 'Failed to mirror submission to Google Sheets';
        } else {
          googleSheetsStatus = 'forwarded';
        }
      } catch {
        googleSheetsError = 'Lead capture service is currently unavailable';
      }
    }

    let localInboxSaved = false;
    try {
      await appendMarketplaceManualOpsEntry({
        submissionReference,
        submittedAt: new Date().toISOString(),
        campaignKey: normalizedCampaignKey,
        source: listing.application.sourcePath,
        fullName: normalizedFullName,
        email: normalizedEmail,
        phone: normalizedPhone,
        listingId: listing.id,
        listingSlug: listing.slug,
        horseId: listing.horse.id,
        horseName: listing.horse.name,
        leaseId: listing.offering.leaseId,
        requestedStakePercent: normalizedRequestedStakePercent,
        requestedUnits: expectedUnits,
        reservationAmountNzd: expectedReservationAmountNzd,
        applicationStatus: normalizedApplicationStatus as
          | 'submitted'
          | 'under_review'
          | 'reserved_manual'
          | 'closed',
        notes: normalizedNotes,
        googleSheetsStatus,
        googleSheetsError,
      });
      localInboxSaved = true;
    } catch (error) {
      if (!googleSheetsWebAppUrl || googleSheetsStatus !== 'forwarded') {
        return NextResponse.json(
          {
            error:
              error instanceof Error
                ? error.message
                : 'Unable to save the marketplace request',
          },
          { status: 500 },
        );
      }
    }

    if (googleSheetsStatus === 'not_configured') {
      warning = 'Saved to the founder manual ops inbox only.';
    } else if (googleSheetsStatus === 'failed') {
      warning =
        'Saved to the founder manual ops inbox, but the Google Sheets mirror failed.';
    }

    return NextResponse.json({
      ok: true,
      status: normalizedApplicationStatus,
      submissionReference,
      delivery: {
        googleSheets: googleSheetsStatus,
        localInbox: localInboxSaved ? 'saved' : 'failed',
      },
      warning,
    });
  }

  const captureUrl = googleSheetsWebAppUrl;
  if (!captureUrl) {
    return NextResponse.json(
      { error: 'Lead capture is not configured for this environment.' },
      { status: 503 },
    );
  }

  try {
    upstreamResponse = await fetch(captureUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: normalizedEmail,
        campaignKey: normalizedCampaignKey,
        source: normalizedSource,
        fullName: normalizedFullName,
        phone: normalizedPhone,
        horseId: normalizedHorseId,
        horseName: normalizedHorseName,
        leaseId: normalizedLeaseId,
        listingSlug: normalizedListingSlug,
        submissionType: normalizedSubmissionType,
        applicationStatus: normalizedApplicationStatus,
        requestedStakePercent: normalizedRequestedStakePercent,
        requestedUnits: normalizedRequestedUnits,
        reservationAmountNzd: normalizedReservationAmountNzd,
        notes: normalizedNotes,
        submittedAt: new Date().toISOString(),
      }),
    });
  } catch {
    return NextResponse.json(
      { error: 'Lead capture service is currently unavailable' },
      { status: 502 }
    );
  }

  try {
    upstreamData = await upstreamResponse.json();
  } catch {
    upstreamData = null;
  }

  const upstreamError =
    upstreamData && typeof upstreamData === 'object' && 'error' in upstreamData
      ? (upstreamData as { error?: string }).error
      : null;

  if (!upstreamResponse.ok || upstreamError) {
    const message =
      upstreamError || 'Failed to submit interest to Google Sheets';
    return NextResponse.json({ error: message }, { status: 502 });
  }

  return NextResponse.json({
    ok: true,
    status: normalizedApplicationStatus,
    delivery: {
      googleSheets: 'forwarded',
      localInbox: 'not_applicable',
    },
  });
}
