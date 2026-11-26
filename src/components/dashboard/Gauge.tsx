import { useId } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { computeGaugeArc } from '../../lib/dashboardLogic';

interface GaugeProps {
  title: string;
  value: number;
  maxValue: number;
  unit: string;
  subtitle: string;
  statusLabel: string;
}

export function Gauge({
  title,
  value,
  maxValue,
  unit,
  subtitle,
  statusLabel,
}: GaugeProps) {
  const { formatNumber, t } = useLanguage();
  const rawId = useId();
  const gradId = `goldGrad${rawId.replace(/[^a-zA-Z0-9]/g, '')}`;
  const radius = 56;
  const strokeWidth = 7;
  const size = 144;
  const center = size / 2;
  const { circumference, arcLength, dashOffset } = computeGaugeArc(
    value,
    maxValue,
    radius,
    0.75
  );

  return (
    <div className="surface-panel rounded-lg p-6 flex flex-col justify-between gap-5 text-start">
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-[#f5f2eb] leading-snug">{title}</h3>
        <p className="text-sm text-[#d4b278] font-medium">
          {statusLabel}
        </p>
      </div>

      <div className="relative mx-auto w-[144px] h-[144px] flex items-center justify-center">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="overflow-visible"
          role="img"
          aria-label={`${title}: ${formatNumber(value)} ${unit}`}
        >
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a88852" />
              <stop offset="100%" stopColor="#ebd09e" />
            </linearGradient>
          </defs>

          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${arcLength} ${circumference}`}
            transform={`rotate(135 ${center} ${center})`}
          />

          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={dashOffset}
            transform={`rotate(135 ${center} ${center})`}
            className="transition-[stroke-dashoffset] duration-500 ease-out"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center pt-1">
          <div className="flex items-baseline gap-1 tabular-nums">
            <span className="text-3xl font-bold text-[#f5f2eb]">
              {formatNumber(value)}
            </span>
            <span className="text-sm font-medium text-[#d4b278]">{unit}</span>
          </div>
          <span className="text-xs text-[#c2bbb0] mt-1">
            {t.dashboard.gaugeMaxPrefix} {formatNumber(maxValue)}
          </span>
        </div>
      </div>

      <p className="text-sm text-[#c2bbb0] border-t border-white/8 pt-4 text-start">
        {subtitle}
      </p>
    </div>
  );
}
