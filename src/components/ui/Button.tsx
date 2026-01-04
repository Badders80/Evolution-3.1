'use client';

import { forwardRef, type ComponentProps } from 'react';
import { Button as OnceButton } from '@once-ui-system/core/components';

type OnceVariant = 'primary' | 'secondary' | 'tertiary' | 'danger';
type OnceSize = 's' | 'm' | 'l';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

const variantMap: Record<ButtonVariant, OnceVariant> = {
  primary: 'primary',
  secondary: 'secondary',
  outline: 'tertiary',
  ghost: 'tertiary',
  danger: 'danger',
};

const sizeMap: Record<ButtonSize, OnceSize> = {
  sm: 's',
  md: 'm',
  lg: 'l',
};

export type ButtonProps = Omit<ComponentProps<typeof OnceButton>, 'variant' | 'size'> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, ...props }, ref) => {
    const mappedVariant = variantMap[variant] ?? 'primary';
    const mappedSize = sizeMap[size] ?? 'm';

    return (
      <OnceButton
        ref={ref as any}
        variant={mappedVariant}
        size={mappedSize}
        className={className}
        {...(props as any)}
      />
    );
  }
);

Button.displayName = 'Button';
