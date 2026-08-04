// src/app/(admin)/components/admin/reports/TrendLineChart.tsx

interface TrendLineChartProps {
  data: { date: string; value: number }[];
  color: string;
  valuePrefix?: string;
  valueSuffix?: string;
}

export default function TrendLineChart({
  data,
  color,
  valuePrefix = "",
  valueSuffix = "",
}: TrendLineChartProps) {
  if (data.length === 0)
    return (
      <div className="h-48 flex items-center justify-center text-sm text-slate-400">
        No data
      </div>
    );

  const width = 600;
  const height = 180;
  const padding = 20;
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1 || 1)) * (width - padding * 2);
    const y = height - padding - (d.value / maxValue) * (height - padding * 2);
    return { x, y, ...d };
  });

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-48">
      <defs>
        <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#trendGradient)" />
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {points.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="3"
          fill={color}
          className="hover:r-4 transition-all"
        >
          <title>{`${new Date(p.date).toLocaleDateString()}: ${valuePrefix}${p.value.toLocaleString()}${valueSuffix}`}</title>
        </circle>
      ))}
    </svg>
  );
}
