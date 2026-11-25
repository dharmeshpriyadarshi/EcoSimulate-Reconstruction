import type {
  PublishedModelInputs,
  PublishedModelResult,
} from '../simulator/publishedTypes'

import type {
  SimulationInputs,
  SimulationResult,
} from '../simulator/types'

export interface ResearchCellScenario {
  mode: 'research'
  cellId: string
  inputs: PublishedModelInputs
  result: PublishedModelResult
}

export interface AdaptiveCellScenario {
  mode: 'adaptive'
  cellId: string
  inputs: SimulationInputs
  result: SimulationResult
}

export type CellScenario =
  | ResearchCellScenario
  | AdaptiveCellScenario

export type ScenarioStore = Record<
  string,
  CellScenario
>

export type CellScenarioParameters =
  | {
      mode: 'research'
      inputs: PublishedModelInputs
    }
  | {
      mode: 'adaptive'
      inputs: Omit<SimulationInputs, 'area'>
    }
