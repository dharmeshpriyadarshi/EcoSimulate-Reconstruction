import {
  calculateApproximateArea,
} from '../../features/spatial/grid'

import type {
  SpatialGridCell,
} from '../../features/spatial/types'

interface GridInspectorProps {
  cells: readonly SpatialGridCell[]
  selectedCell: SpatialGridCell
  onCellSelect: (cellId: string) => void
}

export default function GridInspector({
  cells,
  selectedCell,
  onCellSelect,
}: GridInspectorProps) {
  const geographicArea =
    calculateApproximateArea(selectedCell.bounds)

  const totalArea = cells.reduce(
    (sum, cell) => sum + cell.area,
    0,
  )

  const cellLabel =
    `G-${String(
      selectedCell.row * 7 +
      selectedCell.column + 1,
    ).padStart(3, '0')}`

  return (
    <section className="grid-inspector">
      <p className="eyebrow">
        Selected experimental cell
      </p>

      <h2>{cellLabel}</h2>

      <label
        className="grid-selector-label"
        htmlFor="grid-cell-selector"
      >
        Select spatial cell
      </label>

      <select
        className="grid-cell-selector"
        id="grid-cell-selector"
        value={selectedCell.id}
        onChange={(event) => {
          onCellSelect(event.target.value)
        }}
      >
        {cells.map((cell, index) => (
          <option key={cell.id} value={cell.id}>
            G-{String(index + 1).padStart(3, '0')}
            {' — Row '}
            {cell.row + 1}
            {', Column '}
            {cell.column + 1}
          </option>
        ))}
      </select>

      <p className="eyebrow">
        Nominal geographical area
      </p>

      <p className="inspector-area">
        {Math.round(selectedCell.area).toLocaleString()}
        {' '}
        <span>m²</span>
      </p>

      <dl className="inspector-data grid-inspector-data">
        <div>
          <dt>Cell side length</dt>
          <dd>
            {selectedCell.sideLength.toFixed(2)} m
          </dd>
        </div>

        <div>
          <dt>Total study area</dt>
          <dd>
            {(totalArea / 1000000).toFixed(3)} km²
          </dd>
        </div>

        <div>
          <dt>Spatial cells</dt>
          <dd>{cells.length}</dd>
        </div>
      </dl>

      <details className="spatial-metadata">
        <summary>Geographical metadata</summary>

        <dl className="inspector-data">
          <div>
            <dt>Grid row</dt>
            <dd>{selectedCell.row + 1}</dd>
          </div>

          <div>
            <dt>Grid column</dt>
            <dd>{selectedCell.column + 1}</dd>
          </div>

          <div>
            <dt>Latitude</dt>
            <dd>
              {selectedCell.center.latitude.toFixed(6)}
            </dd>
          </div>

          <div>
            <dt>Longitude</dt>
            <dd>
              {selectedCell.center.longitude.toFixed(6)}
            </dd>
          </div>

          <div>
            <dt>Estimated surface area</dt>
            <dd>
              {Math.round(geographicArea).toLocaleString()} m²
            </dd>
          </div>
        </dl>

        <p className="inspector-description">
          Generated geographical boundaries, not surveyed
          or historical research sampling locations.
        </p>
      </details>
    </section>
  )
}
