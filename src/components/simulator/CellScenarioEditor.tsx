import { useState } from 'react'

import {
  Check,
  RotateCcw,
} from 'lucide-react'

import ParameterControl from './ParameterControl'

import {
  PUBLISHED_PARAMETER_BOUNDS,
} from '../../features/simulator/publishedConstants'

import {
  PARAMETER_BOUNDS,
} from '../../features/simulator/constants'

import {
  createDefaultParameters,
} from '../../features/spatial/scenarios'

import type {
  SpatialMode,
} from '../../features/spatial/adaptiveTypes'

import type {
  SpatialGridCell,
} from '../../features/spatial/types'

import type {
  CellScenario,
  CellScenarioParameters,
} from '../../features/spatial/scenarioTypes'

interface CellScenarioEditorProps {
  mode: SpatialMode
  cell: SpatialGridCell
  scenario?: CellScenario
  onApply: (
    parameters: CellScenarioParameters,
  ) => void
  onReset: () => void
}

function getInitialParameters(
  mode: SpatialMode,
  scenario?: CellScenario,
): CellScenarioParameters {
  if (scenario?.mode === 'research') {
    return {
      mode: 'research',
      inputs: { ...scenario.inputs },
    }
  }

  if (scenario?.mode === 'adaptive') {
    return {
      mode: 'adaptive',
      inputs: {
        baselinePm25:
          scenario.inputs.baselinePm25,

        filtrationUnits:
          scenario.inputs.filtrationUnits,

        interventionIntensity:
          scenario.inputs.interventionIntensity,
      },
    }
  }

  return createDefaultParameters(mode)
}

export default function CellScenarioEditor({
  mode,
  cell,
  scenario,
  onApply,
  onReset,
}: CellScenarioEditorProps) {
  const [parameters, setParameters] = useState(
    () => getInitialParameters(mode, scenario),
  )

  const [hasChanges, setHasChanges] =
    useState(false)

  const [error, setError] = useState('')

  function updateParameters(
    next: CellScenarioParameters,
  ) {
    setParameters(next)
    setHasChanges(true)
    setError('')
  }

  function applyScenario() {
    try {
      onApply(parameters)
      setHasChanges(false)
      setError('')
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : 'Unable to calculate the scenario.',
      )
    }
  }

  function resetScenario() {
    setParameters(createDefaultParameters(mode))
    setHasChanges(false)
    setError('')
    onReset()
  }

  return (
    <section className="cell-scenario-editor">
      <div className="scenario-editor-heading">
        <p className="eyebrow">
          Environmental configuration
        </p>

        <span className="scenario-state">
          {hasChanges
            ? 'Unapplied changes'
            : scenario
              ? 'Scenario applied'
              : 'Not configured'}
        </span>
      </div>

      <p className="scenario-editor-description">
        Hypothetical inputs for the selected
        geographical cell.
      </p>

      {parameters.mode === 'research' ? (
        <>
          <ParameterControl
            label="Temperature"
            unit="°C"
            value={parameters.inputs.temperature}
            {...PUBLISHED_PARAMETER_BOUNDS.temperature}
            onChange={(temperature) =>
              updateParameters({
                ...parameters,
                inputs: {
                  ...parameters.inputs,
                  temperature,
                },
              })
            }
          />

          <ParameterControl
            label="Baseline PM2.5"
            unit="µg/m³"
            value={parameters.inputs.pm25}
            {...PUBLISHED_PARAMETER_BOUNDS.pm25}
            onChange={(pm25) =>
              updateParameters({
                ...parameters,
                inputs: {
                  ...parameters.inputs,
                  pm25,
                },
              })
            }
          />

          <ParameterControl
            label="Carbon monoxide"
            unit="ppm"
            value={parameters.inputs.carbonMonoxide}
            {...PUBLISHED_PARAMETER_BOUNDS.carbonMonoxide}
            onChange={(carbonMonoxide) =>
              updateParameters({
                ...parameters,
                inputs: {
                  ...parameters.inputs,
                  carbonMonoxide,
                },
              })
            }
          />

          <ParameterControl
            label="Artificial trees"
            unit="units"
            value={parameters.inputs.artificialTrees}
            {...PUBLISHED_PARAMETER_BOUNDS.artificialTrees}
            onChange={(artificialTrees) =>
              updateParameters({
                ...parameters,
                inputs: {
                  ...parameters.inputs,
                  artificialTrees,
                },
              })
            }
          />
        </>
      ) : (
        <>
          <ParameterControl
            label="Baseline PM2.5"
            unit="µg/m³"
            value={parameters.inputs.baselinePm25}
            {...PARAMETER_BOUNDS.baselinePm25}
            onChange={(baselinePm25) =>
              updateParameters({
                ...parameters,
                inputs: {
                  ...parameters.inputs,
                  baselinePm25,
                },
              })
            }
          />

          <ParameterControl
            label="Artificial trees"
            unit="units"
            value={parameters.inputs.filtrationUnits}
            {...PARAMETER_BOUNDS.filtrationUnits}
            onChange={(filtrationUnits) =>
              updateParameters({
                ...parameters,
                inputs: {
                  ...parameters.inputs,
                  filtrationUnits,
                },
              })
            }
          />

          <ParameterControl
            label="Intervention intensity"
            unit="%"
            value={
              parameters.inputs.interventionIntensity
            }
            {...PARAMETER_BOUNDS.interventionIntensity}
            onChange={(interventionIntensity) =>
              updateParameters({
                ...parameters,
                inputs: {
                  ...parameters.inputs,
                  interventionIntensity,
                },
              })
            }
          />
        </>
      )}

      <div className="scenario-area-reference">
        <span>Fixed experimental area</span>

        <strong>
          {Math.round(cell.area).toLocaleString()} m²
        </strong>
      </div>

      <button
        type="button"
        className="workspace-button workspace-button-primary scenario-apply"
        onClick={applyScenario}
      >
        <Check size={16} />
        Apply intervention
      </button>

      <button
        type="button"
        className="workspace-button scenario-reset"
        onClick={resetScenario}
      >
        <RotateCcw size={14} />
        Reset selected cell
      </button>

      {error && (
        <p className="workspace-error" role="alert">
          {error}
        </p>
      )}

      <p className="scenario-editor-description">
        Apply changes before selecting another cell.
        Unapplied adjustments are not saved.
      </p>
    </section>
  )
}
