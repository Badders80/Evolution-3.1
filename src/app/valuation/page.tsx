'use client';

import { useMemo, useState } from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/SimpleButton';
import { Card } from '@/components/ui/Card';

const valuationInputSchema = z.object({
  ppp: z.number().min(1, 'Price per 1% must be greater than 0'),
  sss: z
    .number()
    .min(1, 'Stake sold must be greater than 0%')
    .max(100, 'Stake sold must be between 1 and 100%'),
  ddd: z.number().min(1, 'Duration must be at least 1 month'),
  rrr: z.number().min(0, 'Owner share must be at least 0%').max(99, 'Owner share must be between 0 and 99%'),
});

type ValuationInputs = z.infer<typeof valuationInputSchema>;
type ValuationFieldErrors = Partial<Record<keyof ValuationInputs, string>>;

interface ValuationResults {
  upfrontIncome: number;
  ownerReturnLease: number;
  ownerReturnNoLease: number;
  breakevenTTT: number;
  breakevenWWW: number;
  xAxisMax: number;
  chartData: Array<{
    ttt: number;
    www: number;
    leaseRevenue: number;
    noLeaseRevenue: number;
  }>;
}

function toFieldErrors(error: z.ZodError<ValuationInputs>): ValuationFieldErrors {
  const nextErrors: ValuationFieldErrors = {};

  for (const issue of error.issues) {
    const field = issue.path[0];
    if (typeof field === 'string' && !(field in nextErrors)) {
      nextErrors[field as keyof ValuationInputs] = issue.message;
    }
  }

  return nextErrors;
}

function calculateValuation(inputs: ValuationInputs): ValuationResults {
  const { ppp, sss, ddd, rrr } = inputs;
  const denominator = 1 - rrr / 100;

  if (
    !Number.isFinite(ppp) ||
    !Number.isFinite(sss) ||
    !Number.isFinite(ddd) ||
    !Number.isFinite(rrr) ||
    ppp <= 0 ||
    sss <= 0 ||
    ddd < 1 ||
    denominator <= 0
  ) {
    throw new Error('Invalid valuation inputs');
  }

  const upfrontIncome = ppp * (ddd / 12) * sss;
  const breakevenTTT = (100 * ppp * (ddd / 12)) / denominator;
  const breakevenWWW = (sss / 100) * breakevenTTT;
  const ownerReturnLease = upfrontIncome + (rrr / 100) * breakevenWWW;
  const ownerReturnNoLease = breakevenWWW;
  const xAxisMax = 2 * breakevenTTT;

  const numPoints = 50;
  const chartData: ValuationResults['chartData'] = [];

  for (let i = 0; i <= numPoints; i += 1) {
    const tttValue = (i / numPoints) * xAxisMax;
    const wwwValue = (sss / 100) * tttValue;
    const noLeaseRevenue = (sss / 100) * tttValue;
    const leaseRevenue = upfrontIncome + (rrr / 100) * wwwValue;

    chartData.push({
      ttt: tttValue,
      www: wwwValue,
      leaseRevenue,
      noLeaseRevenue,
    });
  }

  if (
    !Number.isFinite(upfrontIncome) ||
    !Number.isFinite(ownerReturnLease) ||
    !Number.isFinite(ownerReturnNoLease) ||
    !Number.isFinite(breakevenTTT) ||
    !Number.isFinite(breakevenWWW) ||
    !Number.isFinite(xAxisMax) ||
    chartData.some((point) =>
      [point.ttt, point.www, point.leaseRevenue, point.noLeaseRevenue].some(
        (value) => !Number.isFinite(value)
      )
    )
  ) {
    throw new Error('Calculated valuation results are invalid');
  }

  return {
    upfrontIncome,
    ownerReturnLease,
    ownerReturnNoLease,
    breakevenTTT,
    breakevenWWW,
    xAxisMax,
    chartData,
  };
}

function BreakevenChart({
  chartData,
  breakevenTTT,
}: {
  chartData: ValuationResults['chartData'];
  breakevenTTT: number;
}) {
  const width = 800;
  const height = 450;
  const padding = { top: 50, right: 50, bottom: 70, left: 90 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxTTT = Math.max(...chartData.map((d) => d.ttt));
  const maxRevenue = Math.max(
    ...chartData.map((d) => Math.max(d.leaseRevenue, d.noLeaseRevenue))
  );
  const safeMaxTTT = maxTTT > 0 ? maxTTT : 1;
  const safeMaxRevenue = maxRevenue > 0 ? maxRevenue : 1;

  const scaleX = (ttt: number) => (ttt / safeMaxTTT) * chartWidth;
  const scaleY = (revenue: number) =>
    chartHeight - (revenue / safeMaxRevenue) * chartHeight;

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
    return `$${value.toFixed(0)}`;
  };

  const leasePath = chartData
    .map(
      (d, i) =>
        `${i === 0 ? 'M' : 'L'} ${scaleX(d.ttt) + padding.left} ${scaleY(d.leaseRevenue) + padding.top}`
    )
    .join(' ');

  const noLeasePath = chartData
    .map(
      (d, i) =>
        `${i === 0 ? 'M' : 'L'} ${scaleX(d.ttt) + padding.left} ${scaleY(d.noLeaseRevenue) + padding.top}`
    )
    .join(' ');

  const breakevenX = scaleX(breakevenTTT) + padding.left;
  const fallbackIndex = Math.min(
    chartData.length - 1,
    Math.max(0, Math.round((breakevenTTT / safeMaxTTT) * chartData.length))
  );
  const breakevenDataPoint =
    chartData.find((d) => Math.abs(d.ttt - breakevenTTT) < safeMaxTTT / 50) ||
    chartData[fallbackIndex];
  const breakevenY = breakevenDataPoint
    ? scaleY(breakevenDataPoint.leaseRevenue) + padding.top
    : padding.top + chartHeight / 2;

  return (
    <div className="w-full overflow-x-auto -mx-2 px-2">
      <svg
        width={width}
        height={height}
        className="w-full h-auto max-w-full"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const y = padding.top + ratio * chartHeight;
          return (
            <line
              key={`grid-y-${ratio}`}
              x1={padding.left}
              y1={y}
              x2={width - padding.right}
              y2={y}
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth={1}
            />
          );
        })}

        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const x = padding.left + ratio * chartWidth;
          return (
            <line
              key={`grid-x-${ratio}`}
              x1={x}
              y1={padding.top}
              x2={x}
              y2={height - padding.bottom}
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth={1}
            />
          );
        })}

        <line
          x1={padding.left}
          y1={height - padding.bottom}
          x2={width - padding.right}
          y2={height - padding.bottom}
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth={2}
        />
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={height - padding.bottom}
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth={2}
        />

        <path d={noLeasePath} fill="none" stroke="#f87171" strokeWidth={2} />
        <path d={leasePath} fill="none" stroke="#d4a964" strokeWidth={2} />

        <line
          x1={breakevenX}
          y1={padding.top}
          x2={breakevenX}
          y2={height - padding.bottom}
          stroke="#d4a964"
          strokeWidth={2}
          strokeDasharray="5 5"
          opacity={0.7}
        />

        {breakevenDataPoint ? (
          <circle
            cx={breakevenX}
            cy={breakevenY}
            r={4}
            fill="#d4a964"
            stroke="black"
            strokeWidth={1}
          />
        ) : null}

        <text
          x={breakevenX}
          y={padding.top - 10}
          fill="#d4a964"
          fontSize="12"
          fontWeight="600"
          textAnchor="middle"
        >
          Breakeven
        </text>

        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const x = padding.left + ratio * chartWidth;
          const value = ratio * safeMaxTTT;
          return (
            <g key={`x-label-${ratio}`}>
              <line
                x1={x}
                y1={height - padding.bottom}
                x2={x}
                y2={height - padding.bottom + 5}
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth={1}
              />
              <text
                x={x}
                y={height - padding.bottom + 20}
                fill="rgba(255, 255, 255, 0.5)"
                fontSize="11"
                textAnchor="middle"
              >
                {formatCurrency(value)}
              </text>
            </g>
          );
        })}

        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const y = padding.top + (1 - ratio) * chartHeight;
          const value = ratio * safeMaxRevenue;
          return (
            <g key={`y-label-${ratio}`}>
              <line
                x1={padding.left}
                y1={y}
                x2={padding.left - 5}
                y2={y}
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth={1}
              />
              <text
                x={padding.left - 10}
                y={y + 4}
                fill="rgba(255, 255, 255, 0.5)"
                fontSize="11"
                textAnchor="end"
              >
                {formatCurrency(value)}
              </text>
            </g>
          );
        })}

        <text
          x={width / 2}
          y={height - 10}
          fill="rgba(255, 255, 255, 0.6)"
          fontSize="12"
          textAnchor="middle"
        >
          Total Winnings (TTT)
        </text>
        <text
          x={20}
          y={height / 2}
          fill="rgba(255, 255, 255, 0.6)"
          fontSize="12"
          textAnchor="middle"
          transform={`rotate(-90, 20, ${height / 2})`}
        >
          Owner Return
        </text>
      </svg>

      <div className="flex gap-6 mt-4 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-[#d4a964]" />
          <span className="text-sm text-white/60">Lease Model</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-[#f87171]" />
          <span className="text-sm text-white/60">No Lease Model</span>
        </div>
      </div>
    </div>
  );
}

export default function ValuationPage() {
  const [inputs, setInputs] = useState<ValuationInputs>({
    ppp: 1000,
    sss: 10,
    ddd: 12,
    rrr: 20,
  });
  const [errors, setErrors] = useState<ValuationFieldErrors>({});

  const results = useMemo(() => {
    const validation = valuationInputSchema.safeParse(inputs);
    if (!validation.success) {
      return null;
    }

    try {
      return calculateValuation(validation.data);
    } catch {
      return null;
    }
  }, [inputs]);

  const handleInputChange = (field: keyof ValuationInputs, value: string) => {
    const numValue = Number.parseFloat(value) || 0;
    setInputs((prev) => ({ ...prev, [field]: numValue }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleCalculate = () => {
    const validation = valuationInputSchema.safeParse(inputs);
    if (validation.success) {
      setErrors({});
      return;
    }

    setErrors(toFieldErrors(validation.error));
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-NZ', {
      style: 'currency',
      currency: 'NZD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="min-h-screen w-full bg-black text-white pt-32 md:pt-40">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <section className="mb-12">
          <p className="text-[11px] font-light tracking-[0.2em] uppercase mb-4 text-white/30">
            VALUATION MODEL
          </p>
          <h1 className="text-3xl md:text-4xl font-light tracking-tight mb-4 text-white">
            Valuation Model
          </h1>
          <p className="text-base leading-relaxed text-white/65 max-w-3xl">
            Calculate lease valuations, breakeven points, and compare leasing vs. retaining your stake.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2">
            <Card className="bg-white/[0.02] border-white/[0.08] p-6 md:p-8">
              <h2 className="text-xl font-light mb-6 text-white">Breakeven Analysis</h2>
              {results ? (
                <BreakevenChart
                  chartData={results.chartData}
                  breakevenTTT={results.breakevenTTT}
                />
              ) : (
                <div className="h-[450px] flex items-center justify-center text-white/40">
                  <p>Enter valid parameters and click Calculate to see the breakeven analysis</p>
                </div>
              )}
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="bg-white/[0.02] border-white/[0.08] p-6 md:p-8 sticky top-32">
              <h2 className="text-xl font-light mb-6 text-white">Input Parameters</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-light mb-2 text-white/70">
                    PPP: Price per 1% per year ($)
                  </label>
                  <input
                    type="number"
                    value={inputs.ppp || ''}
                    onChange={(e) => handleInputChange('ppp', e.target.value)}
                    className="w-full px-4 py-2.5 bg-black/50 border border-white/[0.06] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/[0.12] transition-colors"
                    placeholder="1000"
                    min="1"
                    step="100"
                  />
                  {errors.ppp ? (
                    <p className="mt-1 text-xs text-red-400">{errors.ppp}</p>
                  ) : null}
                </div>

                <div>
                  <label className="block text-sm font-light mb-2 text-white/70">
                    SSS: Stake sold (%)
                  </label>
                  <input
                    type="number"
                    value={inputs.sss || ''}
                    onChange={(e) => handleInputChange('sss', e.target.value)}
                    className="w-full px-4 py-2.5 bg-black/50 border border-white/[0.06] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/[0.12] transition-colors"
                    placeholder="10"
                    min="1"
                    max="100"
                    step="1"
                  />
                  {errors.sss ? (
                    <p className="mt-1 text-xs text-red-400">{errors.sss}</p>
                  ) : null}
                </div>

                <div>
                  <label className="block text-sm font-light mb-2 text-white/70">
                    DDD: Duration (months)
                  </label>
                  <input
                    type="number"
                    value={inputs.ddd || ''}
                    onChange={(e) => handleInputChange('ddd', e.target.value)}
                    className="w-full px-4 py-2.5 bg-black/50 border border-white/[0.06] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/[0.12] transition-colors"
                    placeholder="12"
                    min="1"
                    step="1"
                  />
                  {errors.ddd ? (
                    <p className="mt-1 text-xs text-red-400">{errors.ddd}</p>
                  ) : null}
                </div>

                <div>
                  <label className="block text-sm font-light mb-2 text-white/70">
                    RRR: Owner share of stakes (%)
                  </label>
                  <input
                    type="number"
                    value={inputs.rrr || ''}
                    onChange={(e) => handleInputChange('rrr', e.target.value)}
                    className="w-full px-4 py-2.5 bg-black/50 border border-white/[0.06] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/[0.12] transition-colors"
                    placeholder="20"
                    min="0"
                    max="99"
                    step="1"
                  />
                  {errors.rrr ? (
                    <p className="mt-1 text-xs text-red-400">{errors.rrr}</p>
                  ) : null}
                </div>

                <div className="pt-2">
                  <Button onClick={handleCalculate} variant="primary" className="w-full">
                    Calculate
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {results ? (
          <section>
            <Card className="bg-white/[0.02] border-white/[0.08] p-6 md:p-8">
              <h2 className="text-xl font-light mb-6 text-white">Results</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <p className="text-sm text-white/50">Upfront Income</p>
                  <p className="text-2xl font-light text-white">
                    {formatCurrency(results.upfrontIncome)}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-white/50">Owner Return (Lease)</p>
                  <p className="text-2xl font-light text-[#d4a964]">
                    {formatCurrency(results.ownerReturnLease)}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-white/50">Owner Return (No Lease)</p>
                  <p className="text-2xl font-light text-[#f87171]">
                    {formatCurrency(results.ownerReturnNoLease)}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-white/50">Breakeven (TTT*)</p>
                  <p className="text-2xl font-light text-white">
                    {formatCurrency(results.breakevenTTT)}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-white/50">Breakeven (WWW*)</p>
                  <p className="text-2xl font-light text-white">
                    {formatCurrency(results.breakevenWWW)}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-white/50">X-axis Range (Max)</p>
                  <p className="text-2xl font-light text-white">
                    {formatCurrency(results.xAxisMax)}
                  </p>
                </div>
              </div>
            </Card>
          </section>
        ) : null}
      </div>
    </div>
  );
}
