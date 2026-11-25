import {
  PUBLISHED_DEFAULT_INPUTS,
  PUBLISHED_GRID_AREA,
} from '../simulator/publishedConstants'

import {
  DEFAULT_INPUTS,
} from '../simulator/constants'

import {
  simulatePublishedModel,
} from '../simulator/publishedModel'

import {
  simulateScenario,
} from '../simulator/model'

import type {
  SpatialGridCell,
} from './types'

import type {
  SpatialMode,
} from './adaptiveTypes'

import type {
  CellScenario,
  CellScenarioParameters,
  ScenarioStore,
} from './scenarioTypes'

export function createDefaultParameters(
  mode: SpatialMode,
): CellScenarioParameters {
  if (mode === 'research') {
    return {
      mode: 'research',
      inputs: {
        ...PUBLISHED_DEFAULT_INPUTS,
        artificialTrees: 0,
      },
    }
  }

  return {
    mode: 'adaptive',
    inputs: {
      baselinePm25: DEFAULT_INPUTS.baselinePm25,
      filtrationUnits: 0,
      interventionIntensity:
        DEFAULT_INPUTS.interventionIntensity,
    },
  }
}

export function calculateCellScenario(
  cell: SpatialGridCell,
  parameters: CellScenarioParameters,
): CellScenario {
  if (parameters.mode === 'research') {
    if (
      Math.abs(cell.area - PUBLISHED_GRID_AREA) > 0.001
    ) {
      throw new RangeError(
        'Published model requires the reference grid area.',
      )
    }

    const inputs = { ...parameters.inputs }

    return {
      mode: 'research',
      cellId: cell.id,
      inputs,
      result: simulatePublishedModel(inputs),
    }
  }

  const inputs = {
    ...parameters.inputs,
    area: cell.area,
  }

  return {
    mode: 'adaptive',
    cellId: cell.id,
    inputs,
    result: simulateScenario(inputs),
  }
}

export function saveCellScenario(
  store: ScenarioStore,
  cell: SpatialGridCell,
  parameters: CellScenarioParameters,
): ScenarioStore {
  const scenario = calculateCellScenario(
    cell,
    parameters,
  )

  return {
    ...store,
    [cell.id]: scenario,
  }
}

export function removeCellScenario(
  store: ScenarioStore,
  cellId: string,
): ScenarioStore {
  const nextStore = { ...store }

  delete nextStore[cellId]

  return nextStore
}

export function countConfiguredCells(
  store: ScenarioStore,
  cells: readonly SpatialGridCell[],
): number {
  return cells.filter(
    (cell) => store[cell.id] !== undefined,
  ).length
}
