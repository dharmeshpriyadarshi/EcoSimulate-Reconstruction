import {
  LAYER_PALETTES,
} from '../../features/spatial/analysisLayers'

import type {
  LayerDefinition,
  AnalysisLayer,
} from '../../features/spatial/analysisLayers'

interface AnalysisControlsProps {
  layers: LayerDefinition[]
  activeLayer: LayerDefinition
  onLayerChange: (layer: AnalysisLayer) => void
  showMarkers: boolean
  onMarkersChange: (visible: boolean) => void
  showLabels: boolean
  onLabelsChange: (visible: boolean) => void
  threshold: number
  onThresholdChange: (value: number) => void
}

export default function AnalysisControls({
  layers,
  activeLayer,
  onLayerChange,
  showMarkers,
  onMarkersChange,
  showLabels,
  onLabelsChange,
  threshold,
  onThresholdChange,
}: AnalysisControlsProps) {
  return (
    <div className="analysis-toolbar">
      <div className="analysis-layer-field">
        <label htmlFor="analysis-layer">
          Analytical map layer
        </label>

        <select
          id="analysis-layer"
          value={activeLayer.id}
          onChange={(event) =>
            onLayerChange(
              event.target.value as AnalysisLayer,
            )
          }
        >
          {layers.map((layer) => (
            <option key={layer.id} value={layer.id}>
              {layer.label}
            </option>
          ))}
        </select>
      </div>

      <div className="analysis-toggles">
        <label className="workspace-layer-toggle">
          <input
            type="checkbox"
            checked={showMarkers}
            onChange={(event) =>
              onMarkersChange(event.target.checked)
            }
          />
          Tree markers
        </label>

        <label className="workspace-layer-toggle">
          <input
            type="checkbox"
            checked={showLabels}
            onChange={(event) =>
              onLabelsChange(event.target.checked)
            }
          />
          Cell labels
        </label>
      </div>

      <div className="analysis-threshold">
        <label htmlFor="analysis-threshold">
          Highlight threshold: {threshold.toFixed(1)}
          {' '}{activeLayer.unit}
        </label>

        <input
          id="analysis-threshold"
          type="range"
          min={0}
          max={activeLayer.max}
          step={0.1}
          value={threshold}
          onChange={(event) =>
            onThresholdChange(
              Number(event.target.value),
            )
          }
        />
      </div>

      <div className="analysis-legend">
        <span>{activeLayer.label}</span>

        <div className="analysis-legend-colors">
          {LAYER_PALETTES[activeLayer.palette].map(
            (color) => (
              <span
                key={color}
                style={{ backgroundColor: color }}
              />
            ),
          )}
        </div>

        <div className="analysis-legend-bounds">
          <span>0</span>
          <span>
            {activeLayer.max.toFixed(0)}
            {' '}{activeLayer.unit}
          </span>
        </div>

        <small>Neutral cells: unconfigured or filtered</small>
      </div>
    </div>
  )
}
