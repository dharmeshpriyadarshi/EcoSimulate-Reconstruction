import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

import type {
  RegionalStatistics,
} from '../../features/analytics/types'

interface RegionalComparisonChartProps {
  statistics: RegionalStatistics
}

export default function RegionalComparisonChart({
  statistics,
}: RegionalComparisonChartProps) {
  const { baseline, intervention, unit } =
    statistics

  if (!baseline || !intervention) {
    return (
      <div className="analytics-empty">
        Apply an environmental scenario to enable
        regional comparison.
      </div>
    )
  }

  const data = [
    {
      name: 'Baseline',
      value: baseline.mean,
      color: '#a4a99b',
    },
    {
      name: 'Intervention',
      value: intervention.mean,
      color: '#626b4c',
    },
  ]

  return (
    <section className="analytics-chart-panel">
      <p className="eyebrow">
        01 / Regional comparison
      </p>

      <h3>Before and after.</h3>

      <p className="analytics-description">
        Mean calculated values across
        {' '}{statistics.configuredCells}
        {' '}configured geographical cells.
      </p>

      <div
        className="analytics-chart-frame"
        role="img"
        aria-label={`Mean baseline ${baseline.mean.toFixed(2)} and intervention ${intervention.mean.toFixed(2)} ${unit}.`}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 15,
              right: 15,
              bottom: 10,
              left: 0,
            }}
          >
            <CartesianGrid
              vertical={false}
              stroke="#d5d8cd"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="name"
              tick={{ fontSize: 11 }}
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
              formatter={(value) => [
                `${Number(value).toFixed(2)} ${unit}`,
                'Regional mean',
              ]}
              contentStyle={{
                background: '#f5f4ee',
                border: '1px solid #c7cbbd',
                fontSize: '12px',
              }}
              cursor={{
                fill: '#e6e8df',
              }}
            />

            <Bar
              dataKey="value"
              maxBarSize={105}
              isAnimationActive={false}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={entry.color}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="analytics-chart-footer">
        <span>Mean absolute reduction</span>

        <strong>
          {statistics.reduction?.mean.toFixed(2)}
          {' '}{unit}
        </strong>
      </div>
    </section>
  )
}
