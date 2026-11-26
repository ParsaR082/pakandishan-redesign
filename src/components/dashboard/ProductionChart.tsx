import { useMemo, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface ProductionPoint {
  hour: string;
  output: number;
  target: number;
}

interface ProductionChartProps {
  data: ProductionPoint[];
}

const CHART_WIDTH = 560;
const CHART_HEIGHT = 220;
const PAD_TOP = 16;
const PAD_RIGHT = 16;
const PAD_BOTTOM = 30;
const PAD_LEFT = 48;

function buildSmoothPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

export function ProductionChart({ data }: ProductionChartProps) {
  const { t, formatNumber, isRTL } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const geometry = useMemo(() => {
    const plotW = CHART_WIDTH - PAD_LEFT - PAD_RIGHT;
    const plotH = CHART_HEIGHT - PAD_TOP - PAD_BOTTOM;

    const allVals = data.flatMap((d) => [d.output, d.target]);
    const rawMax = Math.max(...allVals, 10);
    const maxVal = Math.ceil(rawMax / 50) * 50 || 100;
    const yTicks = [0, 0.25, 0.5, 0.75, 1].map((r) => ({
      value: Math.round(maxVal * r),
      y: PAD_TOP + plotH * (1 - r),
    }));

    const stepX = data.length > 1 ? plotW / (data.length - 1) : 0;

    const outputPts = data.map((d, idx) => ({
      x: PAD_LEFT + idx * stepX,
      y: PAD_TOP + plotH * (1 - d.output / maxVal),
    }));

    const targetPts = data.map((d, idx) => ({
      x: PAD_LEFT + idx * stepX,
      y: PAD_TOP + plotH * (1 - d.target / maxVal),
    }));

    const outputPath = buildSmoothPath(outputPts);
    const targetPath = buildSmoothPath(targetPts);
    const baselineY = PAD_TOP + plotH;
    const areaPath =
      outputPts.length > 0
        ? `${outputPath} L ${outputPts[outputPts.length - 1].x.toFixed(1)} ${baselineY.toFixed(1)} L ${outputPts[0].x.toFixed(1)} ${baselineY.toFixed(1)} Z`
        : '';

    return { outputPts, targetPts, outputPath, targetPath, areaPath, yTicks, baselineY };
  }, [data]);

  const activePoint =
    activeIndex !== null && data[activeIndex] ? data[activeIndex] : null;
  const activeCoord =
    activeIndex !== null && geometry.outputPts[activeIndex]
      ? geometry.outputPts[activeIndex]
      : null;

  return (
    <div className="surface-panel rounded-lg p-6 text-start">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-base font-semibold text-[#f5f2eb]">
            {t.dashboard.chartTitle}
          </h3>
          <p className="text-sm text-[#c2bbb0] mt-1">
            {t.dashboard.chartSubtitle}
          </p>
        </div>
        <div className="flex items-center gap-5 text-sm text-[#c2bbb0]">
          <span className="inline-flex items-center gap-2">
            <span className="w-3.5 h-0.5 bg-[#d4b278]" aria-hidden="true" />
            <span>{t.dashboard.chartActualLegend}</span>
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="w-3.5 h-0.5 bg-[#c2bbb0]/60" aria-hidden="true" />
            <span>{t.dashboard.chartTargetLegend}</span>
          </span>
        </div>
      </div>

      <div
        className="relative w-full h-[230px] select-none"
        dir="ltr"
        onMouseLeave={() => setActiveIndex(null)}
      >
        <svg
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          preserveAspectRatio="none"
          className="w-full h-full overflow-visible"
          role="img"
          aria-label={t.dashboard.chartTitle}
        >
          <defs>
            <linearGradient id="pakGoldArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#d4b278" stopOpacity="0.28" />
              <stop offset="95%" stopColor="#d4b278" stopOpacity="0" />
            </linearGradient>
          </defs>

          {geometry.yTicks.map((tick) => (
            <g key={tick.value}>
              <line
                x1={PAD_LEFT}
                x2={CHART_WIDTH - PAD_RIGHT}
                y1={tick.y}
                y2={tick.y}
                stroke="rgba(255,255,255,0.08)"
                strokeDasharray="3 3"
              />
              <text
                x={PAD_LEFT - 10}
                y={tick.y + 4}
                textAnchor="end"
                fill="#c2bbb0"
                fontSize="12"
                className="tabular-nums"
              >
                {formatNumber(tick.value)}
              </text>
            </g>
          ))}

          <line
            x1={PAD_LEFT}
            x2={CHART_WIDTH - PAD_RIGHT}
            y1={geometry.baselineY}
            y2={geometry.baselineY}
            stroke="rgba(255,255,255,0.14)"
          />

          <path d={geometry.areaPath} fill="url(#pakGoldArea)" />

          <path
            d={geometry.targetPath}
            fill="none"
            stroke="#c2bbb0"
            strokeOpacity="0.55"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          <path
            d={geometry.outputPath}
            fill="none"
            stroke="#ebd09e"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {activeCoord && (
            <g>
              <line
                x1={activeCoord.x}
                x2={activeCoord.x}
                y1={PAD_TOP}
                y2={geometry.baselineY}
                stroke="rgba(212,178,120,0.45)"
                strokeDasharray="3 3"
              />
              <circle
                cx={activeCoord.x}
                cy={activeCoord.y}
                r="5"
                fill="#ebd09e"
                stroke="#090908"
                strokeWidth="2"
              />
            </g>
          )}

          {data.map((point, idx) => {
            const pt = geometry.outputPts[idx];
            const colW =
              data.length > 1
                ? (CHART_WIDTH - PAD_LEFT - PAD_RIGHT) / (data.length - 1)
                : CHART_WIDTH;
            return (
              <g key={point.hour}>
                <text
                  x={pt.x}
                  y={CHART_HEIGHT - 8}
                  textAnchor="middle"
                  fill={activeIndex === idx ? '#ebd09e' : '#c2bbb0'}
                  fontSize="12"
                  className="tabular-nums"
                >
                  {point.hour}
                </text>
                <rect
                  x={pt.x - colW / 2}
                  y={PAD_TOP}
                  width={colW}
                  height={geometry.baselineY - PAD_TOP}
                  fill="transparent"
                  className="cursor-crosshair"
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() =>
                    setActiveIndex((prev) => (prev === idx ? null : idx))
                  }
                />
              </g>
            );
          })}
        </svg>

        {activePoint && activeCoord && (
          <div
            className="pointer-events-none absolute top-2 z-20 rounded-md bg-[#1b1916] border border-[#d4b278]/45 px-3.5 py-2.5 text-sm"
            style={{
              left: `${Math.min(68, Math.max(8, (activeCoord.x / CHART_WIDTH) * 100 - 12))}%`,
              direction: isRTL ? 'rtl' : 'ltr',
              textAlign: isRTL ? 'right' : 'left',
            }}
          >
            <p className="font-semibold text-[#ebd09e] mb-1">{activePoint.hour}</p>
            <p className="text-[#f5f2eb] tabular-nums">
              {t.dashboard.chartActualLegend}:{' '}
              <span className="font-semibold">
                {formatNumber(activePoint.output)} {t.dashboard.chartUnit}
              </span>
            </p>
            <p className="text-[#c2bbb0] tabular-nums">
              {t.dashboard.chartTargetLegend}:{' '}
              <span>
                {formatNumber(activePoint.target)} {t.dashboard.chartUnit}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
