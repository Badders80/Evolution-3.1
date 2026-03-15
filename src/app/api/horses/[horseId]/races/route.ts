import { NextResponse } from 'next/server';
import { loadSsotSeed } from '@/lib/ssot/seed-loader';
import type { HorseRaceRow } from '@/types/ssot';

const MONTHS: Record<string, string> = {
  Jan: '01',
  Feb: '02',
  Mar: '03',
  Apr: '04',
  May: '05',
  Jun: '06',
  Jul: '07',
  Aug: '08',
  Sep: '09',
  Oct: '10',
  Nov: '11',
  Dec: '12',
};

const RACE_BLOCK_REGEX =
  /<div class="table-indepth[\s\S]*?border-top-0[\s\S]*?<div class="p-0 py-1[\s\S]*?placing[^"]*">([\s\S]*?)<\/div>[\s\S]*?<div class="p-0 pr-1[\s\S]*?col4[\s\S]*?">([\s\S]*?)<\/div>[\s\S]*?(<a href="[^"]+"[\s\S]*?<\/a>)[\s\S]*?<div class="p-0 pr-1[\s\S]*?col2[\s\S]*?">([\s\S]*?)<\/div>/gi;

const decodeEntity = (value: string) => {
  return value
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');
};

const toText = (value: string) => {
  return decodeEntity(value.replace(/<[^>]*>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
};

const toAnchorText = (value: string) => {
  const match = value.match(/>([^<>]*)<\/a>\s*$/);
  return toText(match?.[1] ?? '');
};

const toAbsoluteUrl = (value: string) => {
  if (value.startsWith('http://') || value.startsWith('https://')) return value;
  if (value.startsWith('/')) return `https://loveracing.nz${value}`;
  return `https://loveracing.nz/${value}`;
};

const toDateIso = (value: string) => {
  const match = value.match(/^(\d{1,2})\s([A-Za-z]{3})\s(\d{2,4})$/);
  if (!match) return '';

  const day = match[1].padStart(2, '0');
  const month = MONTHS[match[2]];
  const yearRaw = match[3];
  if (!month) return '';

  const year =
    yearRaw.length === 2 ? `${Number(yearRaw) >= 70 ? '19' : '20'}${yearRaw}` : yearRaw;

  return `${year}-${month}-${day}`;
};

const sortByRaceDate = (a: HorseRaceRow, b: HorseRaceRow) => {
  const aKey = a.dateIso || a.dateLabel;
  const bKey = b.dateIso || b.dateLabel;
  return bKey.localeCompare(aKey);
};

const extractRaceRows = (horseId: string, html: string): HorseRaceRow[] => {
  const results: HorseRaceRow[] = [];
  const seen = new Set<string>();
  let index = 0;

  while (true) {
    const match = RACE_BLOCK_REGEX.exec(html);
    if (!match) break;

    const positionSummary = toText(match[1]);
    const dateLabel = toText(match[2]);
    const anchorHtml = match[3];
    const hrefMatch = anchorHtml.match(/href="([^"]+)"/i);
    const raceUrl = toAbsoluteUrl(hrefMatch?.[1] ?? '');
    const raceName = toAnchorText(anchorHtml);
    const distance = toText(match[4]);
    const dateIso = toDateIso(dateLabel);

    if (!positionSummary || !dateLabel || !raceName || !hrefMatch?.[1]) continue;

    const dedupeKey = `${dateLabel}|${raceName}|${positionSummary}|${distance}`;
    if (seen.has(dedupeKey)) continue;
    seen.add(dedupeKey);

    results.push({
      raceKey: `${horseId}-${index}`,
      positionSummary,
      dateLabel,
      dateIso,
      raceName,
      raceUrl,
      distance,
    });
    index += 1;
  }

  return results.sort(sortByRaceDate).slice(0, 3);
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'nodejs';

type RouteParams = {
  params: {
    horseId: string;
  };
};

export async function GET(_req: Request, { params }: RouteParams) {
  const seed = await loadSsotSeed(true);
  const horse = seed.horses.find((item) => item.horse_id === params.horseId);
  if (!horse) {
    return NextResponse.json(
      {
        ok: false,
        error: `Horse not found for id ${params.horseId}.`,
      },
      { status: 404 },
    );
  }

  try {
    const response = await fetch(horse.performance_profile_url, {
      method: 'GET',
      headers: {
        'User-Agent': 'EvolutionPlatformPrototype/1.0',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Performance profile request failed (${response.status}).`);
    }

    const html = await response.text();
    const races = extractRaceRows(params.horseId, html);

    return NextResponse.json({
      ok: true,
      snapshot: {
        horseId: params.horseId,
        horseName: horse.horse_name,
        performanceProfileUrl: horse.performance_profile_url,
        races,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unable to fetch race profile.';
    return NextResponse.json({
      ok: true,
      warning: message,
      snapshot: {
        horseId: params.horseId,
        horseName: horse.horse_name,
        performanceProfileUrl: horse.performance_profile_url,
        races: [],
      },
    });
  }
}
