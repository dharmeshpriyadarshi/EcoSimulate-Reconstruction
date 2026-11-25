import {
  PUBLISHED_COEFFICIENTS,
  PUBLISHED_GRID_AREA,
  PUBLISHED_INDEX_BOUNDS,
  PUBLISHED_PARAMETER_BOUNDS,
} from './publishedConstants'

import type {
  PublishedModelInputs,
  PublishedModelResult,
} from './publishedTypes'

function validateInputs(
  inputs: PublishedModelInputs,
): void {
  const keys = Object.keys(
    PUBLISHED_PARAMETER_BOUNDS,
  ) as (keyof PublishedModelInputs)[]

  for (const key of keys) {
    const value = inputs[key]
    const bounds = PUBLISHED_PARAMETER_BOUNDS[key]

    if (!Number.isFinite(value)) {
      throw new RangeError(`${key} must be a finite number.`)
    }

    if (value < bounds.min || value > bounds.max) {
      throw new RangeError(
        `${key} must be between ${bounds.min} and ${bounds.max}.`,
      )
    }
  }

  if (!Number.isInteger(inputs.artificialTrees)) {
    throw new RangeError(
      'artificialTrees must be a whole number.',
    )
  }
}

function clampIndex(value: number): number {
  return Math.max(
    PUBLISHED_INDEX_BOUNDS.min,
    Math.min(PUBLISHED_INDEX_BOUNDS.max, value),
  )
}

export function simulatePublishedModel(
  inputs: PublishedModelInputs,
): PublishedModelResult {
  validateInputs(inputs)

  const contributions = {
    temperature:
      inputs.temperature *
      PUBLISHED_COEFFICIENTS.temperature,

    pm25:
      inputs.pm25 *
      PUBLISHED_COEFFICIENTS.pm25,

    carbonMonoxide:
      inputs.carbonMonoxide *
      PUBLISHED_COEFFICIENTS.carbonMonoxide,

    artificialTrees:
      -inputs.artificialTrees *
      PUBLISHED_COEFFICIENTS.artificialTrees,
  }

  const rawBaselineIndex =
    contributions.temperature +
    contributions.pm25 +
    contributions.carbonMonoxide

  const rawInterventionIndex =
    rawBaselineIndex +
    contributions.artificialTrees

  const baselineIndex =
    clampIndex(rawBaselineIndex)

  const interventionIndex =
    clampIndex(rawInterventionIndex)

  const indexReduction =
    baselineIndex - interventionIndex

  const percentageReduction =
    baselineIndex === 0
      ? null
      : (indexReduction / baselineIndex) * 100

  return {
    rawBaselineIndex,
    rawInterventionIndex,

    baselineIndex,
    interventionIndex,

    indexReduction,
    percentageReduction,

    baselineClamped:
      rawBaselineIndex !== baselineIndex,

    interventionClamped:
      rawInterventionIndex !== interventionIndex,

    gridArea: PUBLISHED_GRID_AREA,

    contributions,
  }
}
