import { FormEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import type { EvolutionJoinProps } from './types';

type JoinState = 'closed' | 'open' | 'success';

const widthVariants: Record<NonNullable<EvolutionJoinProps['width']>, string> = {
  sm: 'w-full max-w-xs',
  md: 'w-full max-w-sm',
  lg: 'w-full max-w-md',
};

export function EvolutionJoin({
  campaign,
  placeholder = 'Enter your email',
  successText = 'Welcome to the Evolution.',
  onSubmit,
  width = 'md',
}: EvolutionJoinProps) {
  const [state, setState] = useState<JoinState>('closed');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state === 'open') {
      inputRef.current?.focus();
    }
  }, [state]);

  const handleOpen = () => {
    setError(null);
    setState('open');
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (isSubmitting) return;

    const trimmed = email.trim();
    if (!trimmed) {
      setError('Please enter an email.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmit(trimmed);
      setEmail('');
      setState('success');
    } catch (submissionError) {
      const message =
        submissionError instanceof Error
          ? submissionError.message
          : 'Unable to submit right now. Please try again.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (state === 'success') {
    return (
      <div
        className="text-sm text-neutral-400"
        role="status"
        aria-live="polite"
        data-campaign={campaign}
      >
        {successText}
      </div>
    );
  }

  if (state === 'closed') {
    return (
      <div className="relative group inline-block" data-campaign={campaign}>
        <div className="absolute -inset-[2px] rounded-full bg-gradient-to-r from-white/5 via-white/10 to-white/5 blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] w-0 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 blur-[2px] group-hover:w-full group-hover:opacity-100 transition-all duration-500 ease-out" />
        <button
          type="button"
          onClick={handleOpen}
          className="relative inline-flex items-center justify-center whitespace-nowrap rounded-full px-8 py-3.5 text-[11px] font-light tracking-wider uppercase text-white/70 transition-all duration-300 hover:text-white hover:scale-105 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary/50 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.12] overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent animate-shimmer opacity-50" />
          <span className="relative z-10 inline-block transition-all duration-300 group-hover:scale-110">
            Join the Evolution
          </span>
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(
        'flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-2 py-1 text-white',
        'transition-all duration-300 focus-within:border-white/30 focus-within:bg-white/[0.05]',
        widthVariants[width],
      )}
      data-campaign={campaign}
    >
      <label className="sr-only" htmlFor={`${campaign}-email`}>
        Join the Evolution email
      </label>
      <input
        ref={inputRef}
        id={`${campaign}-email`}
        type="email"
        autoComplete="email"
        placeholder={placeholder}
        value={email}
        onChange={event => setEmail(event.target.value)}
        className="flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none"
        disabled={isSubmitting}
        aria-invalid={Boolean(error)}
      />
      <div className="flex items-center">
        <button
          type="submit"
          className={clsx(
            'ml-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] transition-opacity duration-300',
            email ? 'opacity-90 animate-evo-pulse hover:opacity-100' : 'opacity-0 pointer-events-none',
            'disabled:opacity-30',
          )}
          disabled={!email.trim() || isSubmitting}
          aria-label="Submit email"
        >
          {isSubmitting ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--evolution-gold)] border-t-transparent" />
          ) : (
            <span className="text-[20px] leading-none font-semibold text-[var(--evolution-gold)] translate-x-[0.5px]">
              →
            </span>
          )}
        </button>
      </div>
      {error && (
        <p className="ml-3 text-xs text-rose-300" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
