import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import type {
  RegionalStatistics,
} from '../../features/analytics/types'

interface CellComparisonChartProps {
  statistics: RegionalStatistics
}

export default function CellComparisonChart({
  statistics,
}: CellComparisonChartProps) {
  const data = statistics.records.map(
    (record) => ({
      cell: record.cellId
        .split('-')
        .slice(-2)
        .join('-')
        .toUpperCase(),

      baseline: record.baseline,
      intervention: record.intervention,
    }),
  )

  return (
    <section className="analytics-chart-panel analytics-wide-panel">
      <p className="eyebrow">
        03 / Spatial comparison
      </p>

      <h3>Variation across the region.</h3>

      <p className="analytics-description">
        Comparison of calculated baseline and
        intervention values for every configured cell.
      </p>

      {data.length === 0 ? (
        <div className="analytics-empty">
          No geographical cells have been configured.
        </div>
      ) : (
        <div className="analytics-chart-scroll">
          <div
            className="analytics-chart-frame"
            style={{
              minWidth: Math.max(
                300,
                data.length * 36 + 70,
              ),
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 15,
                  right: 15,
                  bottom: 28,
                  left: 0,
                }}
                barGap={2}
              >
                <CartesianGrid
                  vertical={false}
                  stroke="#d5d8cd"
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="cell"
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={48}
                  tick={{ fontSize: 9 }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  domain={[
                    0,
                    statistics.mode === 'research'
                      ? 100
                      : 500,
                  ]}
                  tick={{ fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  width={42}
                />

                <Tooltip
                  formatter={(value) =>
                    `${Number(value).toFixed(2)} ${statistics.unit}`
                  }
                  contentStyle={{
                    background: '#f5f4ee',
                    border: '1px solid #c7cbbd',
                    fontSize: '12px',
                  }}
                />

                <Legend
                  wrapperStyle={{
                    fontSize: '11px',
                  }}
                />

                <Bar
                  dataKey="baseline"
                  name="Baseline"
                  fill="#a4a99b"
                  maxBarSize={35}
                  isAnimationActive={false}
                />

                <Bar
                  dataKey="intervention"
                  name="Intervention"
                  fill="#626b4c"
                  maxBarSize={35}
                  isAnimationActive={false}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <p className="analytics-description">
        Unconfigured cells are excluded.
        Scroll horizontally to inspect larger experiments.
      </p>
    </section>
  )
}
