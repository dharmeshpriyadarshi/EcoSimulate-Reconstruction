import type { ParameterBounds } from './types'
import type { PublishedModelInputs } from './publishedTypes'

export const PUBLISHED_GRID_AREA = 23000

export const PUBLISHED_INDEX_BOUNDS = {
  min: 0,
  max: 100,
} as const

export const PUBLISHED_COEFFICIENTS = {
  temperature: 0.3,
  pm25: 0.4,
  carbonMonoxide: 1.2,
  artificialTrees: 0.8,
} as const

export const PUBLISHED_PARAMETER_BOUNDS = {
  temperature: {
    min: 0,
    max: 50,
    step: 1,
  },
  pm25: {
    min: 0,
    max: 500,
    step: 1,
  },
  carbonMonoxide: {
    min: 0,
    max: 50,
    step: 0.5,
  },
  artificialTrees: {
    min: 0,
    max: 125,
    step: 1,
  },
} as const satisfies Record<
  keyof PublishedModelInputs,
  ParameterBounds
>

// Hypothetical defaults for the reconstructed interface.
// Not a recorded environmental observation.

export const PUBLISHED_DEFAULT_INPUTS:
  Readonly<PublishedModelInputs> = Object.freeze({
    temperature: 30,
    pm25: 95,
    carbonMonoxide: 5,
    artificialTrees: 25,
  })
