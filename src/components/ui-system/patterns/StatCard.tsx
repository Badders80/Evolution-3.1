import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/shadcn/card';

interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  trend?: {
    value: string | number;
    isPositive: boolean;
  };
  className?: string;
}

/**
 * StatCard Pattern
 *
 * Standardized for dashboards and KPI displays.
 */
export function StatCard({
  label,
  value,
  subValue,
  trend,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("rounded-xl border border-white/5 bg-neutral-900 p-6 flex flex-col justify-center", className)}>
      <p className="label-overline mb-2">
        {label}
      </p>
      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-medium tracking-tight text-neutral-100">
          {value}
        </p>
        {subValue && (
          <p className="text-sm text-neutral-400">
            {subValue}
          </p>
        )}
      </div>
      {trend && (
        <p className={cn(
          "mt-1 text-sm",
          trend.isPositive ? "text-emerald-400" : "text-red-400"
        )}>
          {trend.isPositive ? '+' : ''}{trend.value}
        </p>
      )}
    </Card>
  );
}
