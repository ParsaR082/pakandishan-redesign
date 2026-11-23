import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { toPersianDigits } from '../../lib/dashboardLogic';

interface ProductionPoint {
  hour: string;
  output: number;
  target: number;
}

interface ProductionChartProps {
  data: ProductionPoint[];
}

export function ProductionChart({ data }: ProductionChartProps) {
  return (
    <div className="surface-panel rounded-lg p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h3 className="text-sm font-semibold text-[#f4f0e8]">
            نمودار روند تولید ساعتی (داده نمونه)
          </h3>
          <p className="text-xs text-[#77716a] mt-1">
            مقایسه خروجی شبیه‌سازی‌شده با ظرفیت هدف در طول شیفت کاری
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs text-[#aaa39a]">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-[#e4c995]" aria-hidden="true" />
            <span>خروجی واقعی (نمونه)</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-[#77716a]" aria-hidden="true" />
            <span>هدف شیفت</span>
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
              tickFormatter={(val: number) => toPersianDigits(val)}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#171512',
                borderColor: 'rgba(197, 164, 109, 0.35)',
                borderRadius: '8px',
                color: '#f4f0e8',
                fontFamily: 'Vazirmatn, sans-serif',
                direction: 'rtl',
                textAlign: 'right',
              }}
              labelStyle={{ color: '#e4c995', marginBottom: '4px', fontWeight: 600 }}
              formatter={(val, name) => {
                const scalar = Array.isArray(val) ? val[0] : val;
                return [
                  `${toPersianDigits(scalar ?? 0)} عدد`,
                  name === 'output' ? 'خروجی نمونه' : 'ظرفیت هدف',
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
