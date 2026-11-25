import type {
  RegionalStatistics,
} from '../../features/analytics/types'

interface SpatialCoveragePanelProps {
  statistics: RegionalStatistics
}

export default function SpatialCoveragePanel({
  statistics,
}: SpatialCoveragePanelProps) {
  const metrics = [
    {
      label: 'Total study area',
      value: (statistics.totalArea / 1000000)
        .toFixed(3),
      unit: 'km²',
    },
    {
      label: 'Configured study area',
      value: (statistics.configuredArea / 1000000)
        .toFixed(3),
      unit: 'km²',
    },
    {
      label: 'Deployment density',
      value:
        statistics.deploymentDensity?.toFixed(2)
        ?? 'N/A',
      unit: 'units/ha of configured area',
    },
    {
      label: 'Unconfigured cells',
      value: statistics.unconfiguredCells
        .toLocaleString(),
      unit: 'geographical cells',
    },
  ]

  const outcomes = [
    {
      label: 'Positive calculated reduction',
      count: statistics.improvedCells,
      color: '#626b4c',
    },
    {
      label: 'No calculated change',
      count: statistics.unchangedCells,
      color: '#a4a99b',
    },
    {
      label: 'Negative calculated reduction',
      count: statistics.worsenedCells,
      color: '#a95549',
    },
  ]

  return (
    <section className="advanced-analysis-panel">
      <p className="eyebrow">
        05 / Geographical coverage
      </p>

      <h3>Scale of experimentation.</h3>

      <div className="advanced-metric-grid">
        {metrics.map((metric) => (
          <div
            className="advanced-metric"
            key={metric.label}
          >
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <small>{metric.unit}</small>
          </div>
        ))}
      </div>

      <div className="coverage-summary">
        <div className="coverage-heading">
          <span>Configured geographical area</span>

          <strong>
            {statistics.areaCoveragePercentage.toFixed(2)}%
          </strong>
        </div>

        <progress
          className="coverage-progress"
          max={100}
          value={Math.min(
            100,
            statistics.areaCoveragePercentage,
          )}
          aria-label="Configured geographical area"
        />

        <p className="analytics-description">
          Coverage describes configured experimental
          area, not verified filtration coverage.
        </p>
      </div>

      <div className="regional-outcomes">
        {outcomes.map((outcome) => (
          <div
            className="regional-outcome"
            key={outcome.label}
          >
            <span
              className="outcome-indicator"
              style={{
                backgroundColor: outcome.color,
              }}
              aria-hidden="true"
            />

            <span>{outcome.label}</span>

            <strong>{outcome.count}</strong>
          </div>
        ))}
      </div>
    </section>
  )
}
