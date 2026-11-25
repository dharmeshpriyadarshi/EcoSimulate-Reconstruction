import type {
  RegionalStatistics,
} from '../../features/analytics/types'

interface RegionalStatisticsPanelProps {
  statistics: RegionalStatistics
}

export default function RegionalStatisticsPanel({
  statistics,
}: RegionalStatisticsPanelProps) {
  const rows = [
    {
      label: 'Baseline',
      values: statistics.baseline,
    },
    {
      label: 'Intervention',
      values: statistics.intervention,
    },
    {
      label: 'Absolute reduction',
      values: statistics.reduction,
    },
  ]

  return (
    <section className="advanced-analysis-panel">
      <p className="eyebrow">
        04 / Descriptive statistics
      </p>

      <h3>Quantifying spatial variation.</h3>

      <p className="analytics-description">
        Population descriptive statistics across
        configured experimental cells, reported
        in {statistics.unit}.
      </p>

      <div className="analytics-table-scroll">
        <table className="analytics-table">
          <thead>
            <tr>
              <th scope="col">Variable</th>
              <th scope="col">Mean</th>
              <th scope="col">Minimum</th>
              <th scope="col">Maximum</th>
              <th scope="col">Std. deviation</th>
            </tr>
          </thead>

          <tbody>
            {rows.map(({ label, values }) => (
              <tr key={label}>
                <th scope="row">{label}</th>
                <td>{values?.mean.toFixed(2) ?? 'N/A'}</td>
                <td>{values?.minimum.toFixed(2) ?? 'N/A'}</td>
                <td>{values?.maximum.toFixed(2) ?? 'N/A'}</td>
                <td>
                  {values?.standardDeviation.toFixed(2) ?? 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="analytics-description">
        Standard deviation describes variation among
        configured cells. It does not represent
        measurement uncertainty or a confidence interval.
      </p>
    </section>
  )
}
