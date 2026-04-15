import type { OfficialDocument, OfficialDocumentType } from '@/types/marketplace';

/**
 * Returns the official documents for a listing, falling back to an empty
 * array if the field is missing (e.g. legacy listings without documents).
 */
export function getOfficialDocumentsForListing(
  listing: { officialDocuments?: OfficialDocument[] },
): OfficialDocument[] {
  return listing.officialDocuments ?? [];
}

/**
 * Finds a specific document by its type within a list of official documents.
 */
export function getDocumentByType(
  documents: OfficialDocument[],
  type: OfficialDocumentType,
): OfficialDocument | undefined {
  return documents.find((d) => d.documentType === type);
}

/**
 * The three document types that must be acknowledged before purchase.
 */
export const REQUIRED_DOCUMENT_TYPES: OfficialDocumentType[] = [
  'hlt_term_sheet',
  'pds',
  'syndicate_agreement',
];

/**
 * Human-readable labels for each required document type, used in
 * acknowledgement checkboxes and confirmation emails.
 */
export const DOCUMENT_TYPE_LABELS: Record<OfficialDocumentType, string> = {
  hlt_term_sheet: 'HLT Term Sheet',
  pds: 'Product Disclosure Statement',
  syndicate_agreement: 'Syndicate Agreement',
};

/**
 * Formats a byte count as a human-readable file size string.
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}