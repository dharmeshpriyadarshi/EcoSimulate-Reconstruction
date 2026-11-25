import {
  calculateCellScenario,
} from './scenarios'

import type {
  SpatialGridCell,
} from './types'

import type {
  ScenarioStore,
  CellScenarioParameters,
} from './scenarioTypes'

export type InterventionScope =
  | 'selected'
  | 'row'
  | 'column'
  | 'all'

export type OverwritePolicy =
  | 'preserve'
  | 'replace'

export function getTargetCells(
  cells: readonly SpatialGridCell[],
  selectedCellId: string,
  scope: InterventionScope,
): SpatialGridCell[] {
  const selected = cells.find(
    (cell) => cell.id === selectedCellId,
  )

  if (!selected) {
    throw new RangeError(
      'Selected cell does not belong to the active grid.',
    )
  }

  switch (scope) {
    case 'selected':
      return [selected]

    case 'row':
      return cells.filter(
        (cell) => cell.row === selected.row,
      )

    case 'column':
      return cells.filter(
        (cell) => cell.column === selected.column,
      )

    case 'all':
      return [...cells]
  }
}

export function getEligibleCells(
  store: ScenarioStore,
  targets: readonly SpatialGridCell[],
  policy: OverwritePolicy,
): SpatialGridCell[] {
  return targets.filter(
    (cell) =>
      policy === 'replace' ||
      store[cell.id] === undefined,
  )
}

export function applyRegionalScenario(
  store: ScenarioStore,
  cells: readonly SpatialGridCell[],
  selectedCellId: string,
  scope: InterventionScope,
  policy: OverwritePolicy,
  parameters: CellScenarioParameters,
): ScenarioStore {
  const targets = getTargetCells(
    cells,
    selectedCellId,
    scope,
  )

  const eligible = getEligibleCells(
    store,
    targets,
    policy,
  )

  // Calculate every scenario before updating the store.
  // Invalid inputs must not produce partial updates.

  const calculated = eligible.map(
    (cell) => calculateCellScenario(
      cell,
      parameters,
    ),
  )

  const nextStore = { ...store }

  for (const scenario of calculated) {
    nextStore[scenario.cellId] = scenario
  }

  return nextStore
}

export function resetRegionalScenarios(
  store: ScenarioStore,
  cells: readonly SpatialGridCell[],
): ScenarioStore {
  const nextStore = { ...store }

  for (const cell of cells) {
    delete nextStore[cell.id]
  }

  return nextStore
}
