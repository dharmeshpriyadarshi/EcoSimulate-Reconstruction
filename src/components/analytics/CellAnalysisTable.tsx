import { useMemo, useState } from 'react'

import type {
  RegionalStatistics,
} from '../../features/analytics/types'

interface CellAnalysisTableProps {
  statistics: RegionalStatistics
}

type SortField =
  | 'cell'
  | 'baseline'
  | 'intervention'
  | 'absoluteReduction'
  | 'deploymentCount'

export default function CellAnalysisTable({
  statistics,
}: CellAnalysisTableProps) {
  const [sortField, setSortField] =
    useState<SortField>('cell')

  const [ascending, setAscending] =
    useState(true)

  const records = useMemo(() => {
    const direction = ascending ? 1 : -1

    return [...statistics.records].sort(
      (first, second) => {
        if (sortField === 'cell') {
          return direction * (
            first.row - second.row ||
            first.column - second.column
          )
        }

        return direction * (
          first[sortField] - second[sortField]
        )
      },
    )
  }, [
    statistics.records,
    sortField,
    ascending,
  ])

  return (
    <section className="advanced-analysis-panel">
      <p className="eyebrow">
        07 / Experimental data
      </p>

      <h3>Cell-level observations.</h3>

      <p className="analytics-description">
        Applied hypothetical scenarios only.
        Numerical outputs are reported in
        {' '}{statistics.unit}.
      </p>

      <div className="analysis-table-controls">
        <label htmlFor="cell-analysis-sort">
          Sort by
        </label>

        <select
          id="cell-analysis-sort"
          value={sortField}
          onChange={(event) =>
            setSortField(
              event.target.value as SortField,
            )
          }
        >
          <option value="cell">
            Geographical cell
          </option>

          <option value="baseline">
            Baseline value
          </option>

          <option value="intervention">
            Intervention value
          </option>

          <option value="absoluteReduction">
            Absolute reduction
          </option>

          <option value="deploymentCount">
            Artificial-tree count
          </option>
        </select>

        <button
          type="button"
          className="workspace-button"
          onClick={() =>
            setAscending((previous) => !previous)
          }
        >
          {ascending ? 'Ascending' : 'Descending'}
        </button>
      </div>

      <div
        className="analytics-table-scroll cell-data-scroll"
        tabIndex={0}
        role="region"
        aria-label="Scrollable experimental data table"
      >
        <table className="analytics-table cell-data-table">
          <thead>
            <tr>
              <th scope="col">Cell</th>
              <th scope="col">Area (m²)</th>
              <th scope="col">Trees</th>
              <th scope="col">Units/ha</th>
              <th scope="col">Baseline</th>
              <th scope="col">Intervention</th>
              <th scope="col">Reduction</th>
              <th scope="col">Relative (%)</th>
            </tr>
          </thead>

          <tbody>
            {records.map((record) => (
              <tr key={record.cellId}>
                <th scope="row">
                  {record.cellId
                    .split('-')
                    .slice(-2)
                    .join('-')
                    .toUpperCase()}
                </th>

                <td>
                  {Math.round(record.area).toLocaleString()}
                </td>

                <td>{record.deploymentCount}</td>

                <td>
                  {record.deploymentDensity.toFixed(2)}
                </td>

                <td>{record.baseline.toFixed(2)}</td>

                <td>{record.intervention.toFixed(2)}</td>

                <td>{record.absoluteReduction.toFixed(2)}</td>

                <td>
                  {record.percentageReduction === null
                    ? 'N/A'
                    : record.percentageReduction.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="analytics-description">
        Showing {records.length} configured cells.
        Displayed values are rounded for readability.
        Underlying calculations retain numerical precision.
      </p>
    </section>
  )
}
