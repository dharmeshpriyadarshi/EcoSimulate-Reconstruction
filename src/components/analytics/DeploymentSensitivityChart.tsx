import { useMemo } from 'react'

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ReferenceLine,
  ReferenceDot,
  ResponsiveContainer,
} from 'recharts'

import {
  generateDeploymentSensitivity,
} from '../../features/analytics/sensitivity'

import {
  getDeploymentCount,
} from '../../features/spatial/analysisLayers'

import type {
  CellScenario,
} from '../../features/spatial/scenarioTypes'

interface DeploymentSensitivityChartProps {
  scenario?: CellScenario
}

export default function DeploymentSensitivityChart({
  scenario,
}: DeploymentSensitivityChartProps) {
  const data = useMemo(
    () =>
      scenario
        ? generateDeploymentSensitivity(scenario)
        : [],
    [scenario],
  )

  if (!scenario) {
    return (
      <section className="analytics-chart-panel">
        <p className="eyebrow">
          02 / Deployment sensitivity
        </p>

        <h3>Response to deployment.</h3>

        <div className="analytics-empty">
          Select a configured geographical cell
          to inspect its sensitivity curve.
        </div>
      </section>
    )
  }

  const research =
    scenario.mode === 'research'

  const unit =
    research ? 'PI points' : 'µg/m³'

  const currentDeployment =
    getDeploymentCount(scenario)

  const appliedPoint = data.find(
    (point) =>
      point.deploymentCount === currentDeployment,
  )

  const cellLabel =
    scenario.cellId
      .split('-')
      .slice(-2)
      .join('-')

  return (
    <section className="analytics-chart-panel">
      <p className="eyebrow">
        02 / Deployment sensitivity
      </p>

      <h3>Response to deployment.</h3>

      <p className="analytics-description">
        {cellLabel.toUpperCase()} — all other applied
        environmental parameters held constant.
      </p>

      <div
        className="analytics-chart-frame"
        role="img"
        aria-label={`Deployment sensitivity curve for ${cellLabel}, with ${currentDeployment} applied artificial trees.`}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 15,
              right: 18,
              bottom: 15,
              left: 0,
            }}
          >
            <CartesianGrid
              stroke="#d5d8cd"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="deploymentCount"
              type="number"
              domain={[0, 125]}
              ticks={[0, 25, 50, 75, 100, 125]}
              tick={{ fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={[0, research ? 100 : 500]}
              tick={{ fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              width={42}
            />

            <Tooltip
              labelFormatter={(value) =>
                `${value} artificial trees`
              }
              formatter={(value) =>
                `${Number(value).toFixed(2)} ${unit}`
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

            <ReferenceLine
              x={currentDeployment}
              stroke="#626b4c"
              strokeDasharray="4 4"
            />

            <Line
              type="linear"
              dataKey="baseline"
              name="Baseline"
              stroke="#a4a99b"
              strokeWidth={2}
              strokeDasharray="5 4"
              dot={false}
              isAnimationActive={false}
            />

            <Line
              type="linear"
              dataKey="intervention"
              name="Intervention"
              stroke="#626b4c"
              strokeWidth={2.5}
              dot={false}
              isAnimationActive={false}
            />

            {appliedPoint && (
              <ReferenceDot
                x={currentDeployment}
                y={appliedPoint.intervention}
                r={5}
                fill="#626b4c"
                stroke="#f5f4ee"
                strokeWidth={2}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="analytics-chart-footer">
        <span>Applied deployment</span>

        <strong>
          {currentDeployment} artificial trees
        </strong>
      </div>

      <p className="analytics-description">
        {research
          ? 'The bounded index responds linearly between its clipping limits.'
          : 'The illustrative exponential model exhibits diminishing marginal reductions.'}
      </p>
    </section>
  )
}
