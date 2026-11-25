import RegionalStatisticsPanel from './RegionalStatisticsPanel'
import SpatialCoveragePanel from './SpatialCoveragePanel'
import EquationBreakdown from './EquationBreakdown'
import CellAnalysisTable from './CellAnalysisTable'

import { useMemo } from 'react'

import RegionalComparisonChart from './RegionalComparisonChart'
import DeploymentSensitivityChart from './DeploymentSensitivityChart'
import CellComparisonChart from './CellComparisonChart'

import {
  calculateRegionalStatistics,
} from '../../features/analytics/regionalAnalysis'

import type {
  SpatialMode,
} from '../../features/spatial/adaptiveTypes'

import type {
  SpatialGridCell,
} from '../../features/spatial/types'

import type {
  ScenarioStore,
  CellScenario,
} from '../../features/spatial/scenarioTypes'

interface ExperimentAnalyticsProps {
  mode: SpatialMode
  cells: readonly SpatialGridCell[]
  scenarios: ScenarioStore
  selectedScenario?: CellScenario
  locationName: string
  isRegionLocked: boolean
}

export default function ExperimentAnalytics({
  mode,
  cells,
  scenarios,
  selectedScenario,
  locationName,
  isRegionLocked,
}: ExperimentAnalyticsProps) {
  const statistics = useMemo(
    () =>
      calculateRegionalStatistics(
        cells,
        isRegionLocked ? scenarios : {},
        mode,
      ),
    [
      cells,
      scenarios,
      mode,
      isRegionLocked,
    ],
  )

  const research = mode === 'research'

  return (
    <section className="experiment-analytics">
      <header className="analytics-heading">
        <div>
          <p className="eyebrow">
            Experimental analysis / ECOSIMULATE
          </p>

          <h2>Understanding the intervention.</h2>
        </div>

        <p className="analytics-description">
          {locationName}
          {' / '}
          {research
            ? 'Published Pollution Index'
            : 'Illustrative PM2.5 model'}
        </p>
      </header>

      {!isRegionLocked ? (
        <div className="analytics-empty">
          Lock an adaptive study region before
          configuring and analysing environmental
          scenarios.
        </div>
      ) : statistics.configuredCells === 0 ? (
        <div className="analytics-empty">
          Apply an intervention to at least one
          geographical cell to begin experimental
          analysis.
        </div>
      ) : (
        <>
          <div className="analytics-metric-grid">
            <div className="analytics-metric">
              <span>Configured cells</span>

              <strong>
                {statistics.configuredCells}
                {' / '}
                {statistics.totalCells}
              </strong>

              <small>
                {statistics.coveragePercentage.toFixed(1)}%
                {' '}coverage
              </small>
            </div>

            <div className="analytics-metric">
              <span>Hypothetical deployment</span>

              <strong>
                {statistics.totalDeployment.toLocaleString()}
              </strong>

              <small>Artificial trees</small>
            </div>

            <div className="analytics-metric">
              <span>Mean baseline</span>

              <strong>
                {statistics.baseline?.mean.toFixed(2)}
              </strong>

              <small>{statistics.unit}</small>
            </div>

            <div className="analytics-metric">
              <span>Mean intervention</span>

              <strong>
                {statistics.intervention?.mean.toFixed(2)}
              </strong>

              <small>{statistics.unit}</small>
            </div>
          </div>

          <div className="analytics-chart-grid">
            <RegionalComparisonChart
              statistics={statistics}
            />

            <DeploymentSensitivityChart
              scenario={selectedScenario}
            />

            <CellComparisonChart
              statistics={statistics}
            />
          </div>

          <div className="advanced-analysis-grid">
            <RegionalStatisticsPanel
              statistics={statistics}
            />

            <SpatialCoveragePanel
              statistics={statistics}
            />
          </div>

          <EquationBreakdown
            scenario={selectedScenario}
          />

          <CellAnalysisTable
            statistics={statistics}
          />

          <div className="analytics-interpretation">
            <p className="eyebrow">
              Model interpretation
            </p>

            <h3>
              {statistics.relativeReduction === null
                ? 'Relative reduction is undefined.'
                : `${statistics.relativeReduction.toFixed(2)}% relative reduction in the configured-cell mean.`}
            </h3>

            <p className="analytics-description">
              These results describe deterministic
              hypothetical scenarios, not measured
              environmental improvements.
              {research
                ? ' The custom Pollution Index is not official AQI.'
                : ' The PM2.5 model is illustrative and has not been calibrated against field measurements.'}
            </p>
          </div>
        </>
      )}
    </section>
  )
}
