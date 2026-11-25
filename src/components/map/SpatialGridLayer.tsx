import {
  CircleMarker,
  Rectangle,
  Tooltip,
} from 'react-leaflet'

import {
  getLayerValue,
  getLayerColor,
  getDeploymentCount,
} from '../../features/spatial/analysisLayers'

import type {
  LayerDefinition,
} from '../../features/spatial/analysisLayers'

import type {
  SpatialGridCell,
} from '../../features/spatial/types'

import type {
  ScenarioStore,
} from '../../features/spatial/scenarioTypes'

interface SpatialGridLayerProps {
  cells: readonly SpatialGridCell[]
  selectedCellId: string
  onCellSelect: (cellId: string) => void
  scenarios: ScenarioStore
  activeLayer: LayerDefinition
  showMarkers: boolean
  showLabels: boolean
  threshold: number
}

export default function SpatialGridLayer({
  cells,
  selectedCellId,
  onCellSelect,
  scenarios,
  activeLayer,
  showMarkers,
  showLabels,
  threshold,
}: SpatialGridLayerProps) {
  return (
    <>
      {cells.map((cell) => {
        const selected =
          cell.id === selectedCellId

        const scenario = scenarios[cell.id]

        const value = scenario
          ? getLayerValue(
              scenario,
              activeLayer.id,
            )
          : null

        const highlighted =
          value !== null &&
          value >= threshold

        const fillColor =
          highlighted
            ? getLayerColor(value, activeLayer)
            : '#a8b298'

        const deploymentCount = scenario
          ? getDeploymentCount(scenario)
          : 0

        const label =
          `G-${String(
            cell.row * 7 + cell.column + 1,
          ).padStart(3, '0')}`

        return (
          <Rectangle
            key={cell.id}
            bounds={[
              [
                cell.bounds.south,
                cell.bounds.west,
              ],
              [
                cell.bounds.north,
                cell.bounds.east,
              ],
            ]}
            pathOptions={{
              color: selected
                ? '#26351e'
                : '#68735b',

              weight: selected ? 3 : 1,

              opacity: 0.9,

              fillColor,

              fillOpacity: highlighted
                ? 0.65
                : selected
                  ? 0.25
                  : 0.10,
            }}
            eventHandlers={{
              click: () => onCellSelect(cell.id),
            }}
          >
            <Tooltip
              key={showLabels ? 'permanent' : 'hover'}
              direction="center"
              permanent={showLabels && value !== null}
              sticky={!showLabels}
              className="analytical-cell-tooltip"
            >
              <strong>{label}</strong>

              <br />

              {value !== null
                ? `${value.toFixed(2)} ${activeLayer.unit}`
                : 'Not configured'}

              {value !== null && !highlighted && (
                <>
                  <br />
                  Below filter threshold
                </>
              )}

              {deploymentCount > 0 && (
                <>
                  <br />
                  {deploymentCount} artificial trees
                </>
              )}
            </Tooltip>
          </Rectangle>
        )
      })}

      {showMarkers && cells.map((cell) => {
        const scenario = scenarios[cell.id]

        if (!scenario) {
          return null
        }

        const count =
          getDeploymentCount(scenario)

        if (count === 0) {
          return null
        }

        // Aggregate marker at the hypothetical cell center.
        // Its size represents deployment count.
        // It is not an actual installation coordinate.

        return (
          <CircleMarker
            key={`${cell.id}-deployment`}
            center={[
              cell.center.latitude,
              cell.center.longitude,
            ]}
            radius={4 + Math.sqrt(count)}
            pathOptions={{
              color: '#ffffff',
              weight: 2,
              fillColor: '#304c29',
              fillOpacity: 0.95,
            }}
            eventHandlers={{
              click: () => onCellSelect(cell.id),
            }}
          >
            <Tooltip direction="top">
              <strong>
                {count} artificial trees
              </strong>

              <br />

              Hypothetical cell deployment
            </Tooltip>
          </CircleMarker>
        )
      })}
    </>
  )
}
