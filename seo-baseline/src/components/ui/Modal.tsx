'use client';

type ModalProps = {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function Modal({
  title,
  message,
  confirmLabel = 'Yes',
  cancelLabel = 'No',
  onConfirm,
  onCancel,
}: ModalProps) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-6 py-16 overflow-hidden">
      {/* Radial gradient background - covers everything including NavBar */}
      <div className="fixed inset-0 bg-black" style={{
        background: 'radial-gradient(ellipse at center, #2a2a2a 0%, #1a1a1a 20%, #0a0a0a 40%, black 80%)',
        opacity: 1
      }} />
      
      {/* Subtle grid pattern */}
      <div className="fixed inset-0" style={{
        backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.01) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.01) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        maskImage: 'radial-gradient(circle at center, black, transparent 50%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 50%)',
      }} />

      {/* Modal container */}
      <div className="relative w-full max-w-sm z-10">
        <div className="relative group">
          {/* Circular highlight effect */}
          <div className="absolute -inset-2 bg-neutral-900/80 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
               style={{
                 filter: 'blur(40px)',
                 background: 'radial-gradient(circle at center, rgba(38,38,38,0.6) 0%, rgba(0,0,0,0) 70%)'
               }} 
          />
          
          {/* Main card */}
          <div className="relative bg-[#111111] border border-neutral-800/80 rounded-2xl p-8 shadow-2xl">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-medium tracking-wide text-neutral-100">
                {title}
              </h2>
              <p className="mt-2 text-sm text-neutral-400">
                {message}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={onConfirm}
                className="h-12 w-full rounded-md bg-white/95 hover:bg-white/85 text-[#0a0a0a] text-[0.85rem] font-medium tracking-wide transition-all hover:shadow-lg hover:shadow-black/20"
              >
                {confirmLabel}
              </button>
              <button
                onClick={onCancel}
                className="h-12 w-full rounded-md bg-white/8 hover:bg-white/12 border border-neutral-800/80 text-neutral-100 text-[0.85rem] font-medium tracking-wide transition-all"
              >
                {cancelLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
