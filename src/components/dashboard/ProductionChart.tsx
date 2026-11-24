import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useLanguage } from '../../context/LanguageContext';

interface ProductionPoint {
  hour: string;
  output: number;
  target: number;
}

interface ProductionChartProps {
  data: ProductionPoint[];
}

export function ProductionChart({ data }: ProductionChartProps) {
  const { t, formatNumber, isRTL } = useLanguage();

  return (
    <div className="surface-panel rounded-lg p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h3 className="text-sm font-semibold text-[#f4f0e8]">
            {t.dashboard.chartTitle}
          </h3>
          <p className="text-xs text-[#77716a] mt-1">
            {t.dashboard.chartSubtitle}
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs text-[#aaa39a]">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-[#e4c995]" aria-hidden="true" />
            <span>{t.dashboard.chartActualLegend}</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-[#77716a]" aria-hidden="true" />
            <span>{t.dashboard.chartTargetLegend}</span>
          </span>
        </div>
      </div>

      <div className="w-full h-[230px]" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
            <defs>
              <linearGradient id="pakGoldArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#c5a46d" stopOpacity={0.34} />
                <stop offset="95%" stopColor="#c5a46d" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="hour"
              stroke="#77716a"
              tick={{ fill: '#aaa39a', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(197,164,109,0.18)' }}
              tickLine={false}
            />
            <YAxis
              stroke="#77716a"
              tick={{ fill: '#aaa39a', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(val: number) => formatNumber(val)}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#171512',
                borderColor: 'rgba(197, 164, 109, 0.35)',
                borderRadius: '8px',
                color: '#f4f0e8',
                fontFamily: 'IRANYekanX, system-ui, sans-serif',
                direction: isRTL ? 'rtl' : 'ltr',
                textAlign: isRTL ? 'right' : 'left',
              }}
              labelStyle={{ color: '#e4c995', marginBottom: '4px', fontWeight: 600 }}
              formatter={(val, name) => {
                const scalar = Array.isArray(val) ? val[0] : val;
                return [
                  `${formatNumber(scalar ?? 0)} ${t.dashboard.chartUnit}`,
                  name === 'output'
                    ? t.dashboard.chartActualLegend
                    : t.dashboard.chartTargetLegend,
                ];
              }}
            />
            <Area
              type="monotone"
              dataKey="target"
              stroke="#77716a"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fill="none"
              isAnimationActive={false}
            />
            <Area
              type="monotone"
              dataKey="output"
              stroke="#e4c995"
              strokeWidth={2.4}
              fill="url(#pakGoldArea)"
              activeDot={{ r: 5, fill: '#e4c995', stroke: '#090909', strokeWidth: 2 }}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
