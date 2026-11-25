import type {
  ParameterBounds,
  SimulationInputs,
} from './types'

export const MODEL_VERSION = '1.0.0'

export const REFERENCE_AREA = 23000

// Arbitrary demonstration coefficient.
// Not a measured or scientifically calibrated filtration coefficient.
export const DEMONSTRATION_COEFFICIENT = 0.005

export const AREA_OPTIONS = [
  10000,
  23000,
  50000,
  75000,
  100000,
] as const

export const PARAMETER_BOUNDS = {
  baselinePm25: {
    min: 0,
    max: 500,
    step: 1,
  },
  area: {
    min: 10000,
    max: 100000,
    step: 1,
  },
  filtrationUnits: {
    min: 0,
    max: 125,
    step: 1,
  },
  interventionIntensity: {
    min: 0,
    max: 100,
    step: 1,
  },
} as const satisfies Record<
  keyof SimulationInputs,
  ParameterBounds
>

export const DEFAULT_INPUTS: Readonly<SimulationInputs> =
  Object.freeze({
    baselinePm25: 100,
    area: 23000,
    filtrationUnits: 25,
    interventionIntensity: 50,
  })
