import { useId } from 'react';
import { computeGaugeArc, toPersianDigits } from '../../lib/dashboardLogic';

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
    <div className="surface-panel rounded-lg p-5 flex flex-col justify-between gap-4">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-[#f4f0e8]">{title}</h3>
        <span className="text-xs text-[#c5a46d] font-medium whitespace-nowrap">
          {statusLabel}
        </span>
      </div>

      <div className="relative mx-auto w-[144px] h-[144px] flex items-center justify-center">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="overflow-visible"
          role="img"
          aria-label={`${title}: ${toPersianDigits(value)} ${unit}`}
        >
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#80643c" />
              <stop offset="55%" stopColor="#c5a46d" />
              <stop offset="100%" stopColor="#e4c995" />
            </linearGradient>
          </defs>

          {/* Background 270-degree track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.09)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${arcLength} ${circumference}`}
            transform={`rotate(135 ${center} ${center})`}
          />

          {/* Active champagne-gold progress arc */}
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

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pt-1">
          <div className="flex items-baseline gap-1 font-mono-tech tabular-nums">
            <span className="text-3xl font-bold text-[#f4f0e8]">
              {toPersianDigits(value)}
            </span>
            <span className="text-sm text-[#e4c995]">{unit}</span>
          </div>
          <span className="text-[11px] text-[#77716a] mt-1">
            حداکثر {toPersianDigits(maxValue)}
          </span>
        </div>
      </div>

      <p className="text-xs text-[#aaa39a] text-center border-t border-[#c5a46d]/14 pt-3">
        {subtitle}
      </p>
    </div>
  );
}
