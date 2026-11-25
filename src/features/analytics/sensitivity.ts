import {
  simulatePublishedModel,
} from '../simulator/publishedModel'

import {
  simulateScenario,
} from '../simulator/model'

import {
  PUBLISHED_PARAMETER_BOUNDS,
} from '../simulator/publishedConstants'

import {
  PARAMETER_BOUNDS,
} from '../simulator/constants'

import type {
  CellScenario,
} from '../spatial/scenarioTypes'

import type {
  SensitivityPoint,
} from './types'

export function generateDeploymentSensitivity(
  scenario: CellScenario,
  step = 1,
): SensitivityPoint[] {
  if (
    !Number.isInteger(step) ||
    step <= 0
  ) {
    throw new RangeError(
      'Sensitivity step must be a positive integer.',
    )
  }

  const maximum =
    scenario.mode === 'research'
      ? PUBLISHED_PARAMETER_BOUNDS.artificialTrees.max
      : PARAMETER_BOUNDS.filtrationUnits.max

  const currentDeployment =
    scenario.mode === 'research'
      ? scenario.inputs.artificialTrees
      : scenario.inputs.filtrationUnits

  const counts = new Set<number>([
    0,
    maximum,
    currentDeployment,
  ])

  for (
    let count = 0;
    count <= maximum;
    count += step
  ) {
    counts.add(count)
  }

  const orderedCounts =
    [...counts].sort((a, b) => a - b)

  return orderedCounts.map(
    (deploymentCount): SensitivityPoint => {
      if (scenario.mode === 'research') {
        const result = simulatePublishedModel({
          ...scenario.inputs,
          artificialTrees: deploymentCount,
        })

        return {
          deploymentCount,
          baseline: result.baselineIndex,
          intervention: result.interventionIndex,
          absoluteReduction: result.indexReduction,
          percentageReduction:
            result.percentageReduction,
        }
      }

      const result = simulateScenario({
        ...scenario.inputs,
        filtrationUnits: deploymentCount,
      })

      return {
        deploymentCount,
        baseline: result.baselinePm25,
        intervention: result.interventionPm25,
        absoluteReduction:
          result.absoluteReduction,
        percentageReduction:
          result.percentageReduction,
      }
    },
  )
}
