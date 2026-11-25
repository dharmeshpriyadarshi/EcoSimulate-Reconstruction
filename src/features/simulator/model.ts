import {
  DEMONSTRATION_COEFFICIENT,
  PARAMETER_BOUNDS,
  REFERENCE_AREA,
} from './constants'

import type {
  SimulationInputs,
  SimulationResult,
} from './types'

function validateInputs(inputs: SimulationInputs): void {
  const keys = Object.keys(PARAMETER_BOUNDS) as
    (keyof SimulationInputs)[]

  for (const key of keys) {
    const value = inputs[key]
    const bounds = PARAMETER_BOUNDS[key]

    if (!Number.isFinite(value)) {
      throw new RangeError(`${key} must be a finite number.`)
    }

    if (value < bounds.min || value > bounds.max) {
      throw new RangeError(
        `${key} must be between ${bounds.min} and ${bounds.max}.`,
      )
    }
  }

  if (!Number.isInteger(inputs.filtrationUnits)) {
    throw new RangeError(
      'filtrationUnits must be a whole number.',
    )
  }
}

export function simulateScenario(
  inputs: SimulationInputs,
): SimulationResult {
  validateInputs(inputs)

  const {
    baselinePm25,
    area,
    filtrationUnits,
    interventionIntensity,
  } = inputs

  const intensityFraction = interventionIntensity / 100

  const areaFactor = REFERENCE_AREA / area

  const interventionScore =
    DEMONSTRATION_COEFFICIENT *
    filtrationUnits *
    intensityFraction *
    areaFactor

  const interventionPm25 =
    baselinePm25 * Math.exp(-interventionScore)

  const absoluteReduction =
    baselinePm25 - interventionPm25

  const percentageReduction =
    baselinePm25 === 0
      ? null
      : (absoluteReduction / baselinePm25) * 100

  const unitsPerHectare =
    filtrationUnits / (area / 10000)

  return {
    baselinePm25,
    interventionPm25,
    absoluteReduction,
    percentageReduction,
    interventionScore,
    unitsPerHectare,
  }
}
