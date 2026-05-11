export type InterestPayload = {
  email: string;
  campaignKey: string;
  source?: string;
  fullName?: string;
  phone?: string;
  horseId?: string;
  horseName?: string;
  leaseId?: string;
  listingSlug?: string;
  submissionType?: "interest" | "application_reservation";
  applicationStatus?:
    | "submitted"
    | "under_review"
    | "reserved_manual"
    | "closed"
    | "interest";
  requestedStakePercent?: number;
  requestedUnits?: number;
  reservationAmountNzd?: number;
  notes?: string;
};

export type InterestSubmissionResult = {
  ok: true;
  status: string;
  submissionReference?: string;
  delivery?: {
    googleSheets: "forwarded" | "not_configured" | "failed";
    localInbox: "saved" | "failed" | "not_applicable";
  };
  warning?: string;
};
