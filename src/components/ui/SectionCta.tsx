import React from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';

type ButtonVariantProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined;
  external?: never;
};

type AnchorVariantProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  external?: boolean;
};

type SectionCtaProps = {
  children: React.ReactNode;
  showArrow?: boolean;
  className?: string;
} & (ButtonVariantProps | AnchorVariantProps);

const baseClasses =
  'inline-flex items-center justify-center gap-3 rounded-lg border border-primary px-6 py-3 text-sm font-medium uppercase tracking-[0.2em] text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:bg-primary hover:text-primary-foreground disabled:pointer-events-none disabled:opacity-50';

export const SectionCta = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  SectionCtaProps
>((props, ref) => {
  const { children, showArrow = true, className, ...rest } = props;
  const classes = clsx(baseClasses, className);

  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <span aria-hidden className="text-base">
          &rsaquo;
        </span>
      )}
    </>
  );

  if ('href' in rest && rest.href) {
    const { href, external, ...anchorProps } = rest;

    if (!external && href.startsWith('/')) {
      return (
        <Link href={href} className={classes} ref={ref as React.Ref<HTMLAnchorElement>} {...anchorProps}>
          {content}
        </Link>
      );
    }

    return (
      <a
        href={href}
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={classes}
        target={external ? '_blank' : anchorProps.target}
        rel={external ? 'noopener noreferrer' : anchorProps.rel}
        {...anchorProps}
      >
        {content}
      </a>
    );
  }

  const buttonProps = rest as ButtonVariantProps;

  return (
    <button
      type={buttonProps.type ?? 'button'}
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      {...buttonProps}
    >
      {content}
    </button>
  );
});

SectionCta.displayName = 'SectionCta';
