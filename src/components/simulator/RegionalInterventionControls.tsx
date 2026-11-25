import {
  getTargetCells,
  getEligibleCells,
} from '../../features/spatial/regionalScenarios'

import type {
  InterventionScope,
  OverwritePolicy,
} from '../../features/spatial/regionalScenarios'

import type {
  SpatialGridCell,
} from '../../features/spatial/types'

import type {
  ScenarioStore,
} from '../../features/spatial/scenarioTypes'

interface RegionalInterventionControlsProps {
  cells: readonly SpatialGridCell[]
  selectedCellId: string
  scenarios: ScenarioStore
  scope: InterventionScope
  policy: OverwritePolicy
  deploymentCount: number
  onScopeChange: (scope: InterventionScope) => void
  onPolicyChange: (policy: OverwritePolicy) => void
}

export default function RegionalInterventionControls({
  cells,
  selectedCellId,
  scenarios,
  scope,
  policy,
  deploymentCount,
  onScopeChange,
  onPolicyChange,
}: RegionalInterventionControlsProps) {
  const targets = getTargetCells(
    cells,
    selectedCellId,
    scope,
  )

  const eligible = getEligibleCells(
    scenarios,
    targets,
    policy,
  )

  const replaced = eligible.filter(
    (cell) => scenarios[cell.id] !== undefined,
  ).length

  return (
    <section className="regional-controls">
      <p className="eyebrow">
        Intervention scope
      </p>

      <label htmlFor="intervention-scope">
        Apply configuration to
      </label>

      <select
        id="intervention-scope"
        value={scope}
        onChange={(event) =>
          onScopeChange(
            event.target.value as InterventionScope,
          )
        }
      >
        <option value="selected">
          Selected cell only
        </option>

        <option value="row">
          Entire selected row
        </option>

        <option value="column">
          Entire selected column
        </option>

        <option value="all">
          Entire study region
        </option>
      </select>

      <label htmlFor="overwrite-policy">
        Existing configurations
      </label>

      <select
        id="overwrite-policy"
        disabled={scope === 'selected'}
        value={policy}
        onChange={(event) =>
          onPolicyChange(
            event.target.value as OverwritePolicy,
          )
        }
      >
        <option value="preserve">
          Preserve configured cells
        </option>

        <option value="replace">
          Replace existing configurations
        </option>
      </select>

      <dl className="regional-preview">
        <div>
          <dt>Target cells</dt>
          <dd>{targets.length}</dd>
        </div>

        <div>
          <dt>Cells to update</dt>
          <dd>{eligible.length}</dd>
        </div>

        <div>
          <dt>Existing cells replaced</dt>
          <dd>{replaced}</dd>
        </div>

        <div>
          <dt>Proposed units</dt>
          <dd>
            {(eligible.length * deploymentCount)
              .toLocaleString()}
          </dd>
        </div>
      </dl>

      {replaced > 0 && (
        <p className="scenario-boundary-notice">
          Applying this configuration will replace
          {replaced === 1
            ? ' one existing scenario.'
            : ` ${replaced} existing scenarios.`}
        </p>
      )}

      {eligible.length === 0 && (
        <p className="scenario-editor-description">
          No eligible cells. Select another scope
          or authorize replacement.
        </p>
      )}
    </section>
  )
}
