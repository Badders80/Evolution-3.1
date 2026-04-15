'use client';

import { formatFileSize } from '@/lib/marketplace-documents';
import type { OfficialDocument } from '@/types/marketplace';

type OfficialDocumentsSectionProps = {
  documents: OfficialDocument[];
};

export function OfficialDocumentsSection({
  documents,
}: OfficialDocumentsSectionProps) {
  if (!documents || documents.length === 0) return null;

  return (
    <section className="space-y-4 rounded-[28px] border border-[#D4A964]/30 bg-black/20 p-6">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-[#D4A964]">
          Required Documents
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
          Official offering documents
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-white/60">
          You must read and acknowledge all three documents before reserving your stake.
        </p>
      </div>

      <ul className="space-y-3">
        {documents.map((doc) => (
          <li key={doc.id}>
            <a
              href={doc.filePath}
              target="_blank"
              rel="noreferrer"
              aria-label={`Download ${doc.title} (PDF, ${formatFileSize(doc.fileSizeBytes)})`}
              className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-[#D4A964]/40"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D4A964]/10 text-[#D4A964] transition group-hover:bg-[#D4A964]/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  <path d="M12 18v-6" />
                  <path d="m9 15 3-3 3 3" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white group-hover:text-[#D4A964]">
                  {doc.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-white/55">
                  {doc.description}
                </p>
                <p className="mt-2 text-xs text-white/40">
                  PDF · {formatFileSize(doc.fileSizeBytes)} · v{doc.version}
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}