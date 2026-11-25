import { describe, expect, it } from 'vitest'

import {
  calculateDescriptiveStatistics,
} from '../src/features/analytics/statistics'

import {
  calculateRegionalStatistics,
} from '../src/features/analytics/regionalAnalysis'

import {
  generateDeploymentSensitivity,
} from '../src/features/analytics/sensitivity'

import {
  DEFAULT_LOCATION,
} from '../src/features/spatial/cities'

import {
  generateSpatialGrid,
  generateGridForArea,
} from '../src/features/spatial/grid'

import {
  calculateCellScenario,
  saveCellScenario,
} from '../src/features/spatial/scenarios'

import {
  applyRegionalScenario,
} from '../src/features/spatial/regionalScenarios'

const cells =
  generateSpatialGrid(DEFAULT_LOCATION)

const selected = cells[24]!

const researchParameters = {
  mode: 'research',
  inputs: {
    temperature: 30,
    pm25: 100,
    carbonMonoxide: 5,
    artificialTrees: 25,
  },
} as const

const researchScenario =
  calculateCellScenario(
    selected,
    researchParameters,
  )

const adaptiveCell =
  generateGridForArea(
    DEFAULT_LOCATION,
    50000,
  )[0]!

const adaptiveScenario =
  calculateCellScenario(
    adaptiveCell,
    {
      mode: 'adaptive',
      inputs: {
        baselinePm25: 100,
        filtrationUnits: 25,
        interventionIntensity: 50,
      },
    },
  )

describe('Descriptive statistics', () => {
  it('returns null for an empty sample', () => {
    expect(
      calculateDescriptiveStatistics([]),
    ).toBeNull()
  })

  it('calculates arithmetic mean and extrema', () => {
    const result =
      calculateDescriptiveStatistics(
        [10, 20, 30],
      )!

    expect(result.count).toBe(3)
    expect(result.mean).toBe(20)
    expect(result.minimum).toBe(10)
    expect(result.maximum).toBe(30)
  })

  it('calculates population standard deviation', () => {
    const result =
      calculateDescriptiveStatistics(
        [10, 20, 30],
      )!

    expect(
      result.standardDeviation,
    ).toBeCloseTo(Math.sqrt(200 / 3))
  })

  it('returns zero variation for uniform inputs', () => {
    expect(
      calculateDescriptiveStatistics(
        [55, 55, 55],
      )?.standardDeviation,
    ).toBe(0)
  })

  it('rejects non-finite inputs', () => {
    expect(() =>
      calculateDescriptiveStatistics(
        [10, Number.NaN],
      ),
    ).toThrow(RangeError)
  })
})

describe('Regional experimental statistics', () => {
  it('represents an unconfigured region correctly', () => {
    const result =
      calculateRegionalStatistics(
        cells,
        {},
        'research',
      )

    expect(result.totalCells).toBe(49)
    expect(result.configuredCells).toBe(0)
    expect(result.unconfiguredCells).toBe(49)
    expect(result.baseline).toBeNull()
    expect(result.intervention).toBeNull()
    expect(result.relativeReduction).toBeNull()
    expect(result.deploymentDensity).toBeNull()
  })

  it('excludes unconfigured cells from averages', () => {
    const store = saveCellScenario(
      {},
      selected,
      researchParameters,
    )

    const result =
      calculateRegionalStatistics(
        cells,
        store,
        'research',
      )

    expect(result.configuredCells).toBe(1)
    expect(result.baseline?.mean).toBe(55)
    expect(result.intervention?.mean).toBe(35)
    expect(result.coveragePercentage)
      .toBeCloseTo(100 / 49)
  })

  it('calculates full regional coverage', () => {
    const store = applyRegionalScenario(
      {},
      cells,
      selected.id,
      'all',
      'replace',
      researchParameters,
    )

    const result =
      calculateRegionalStatistics(
        cells,
        store,
        'research',
      )

    expect(result.configuredCells).toBe(49)
    expect(result.coveragePercentage).toBe(100)
    expect(result.areaCoveragePercentage).toBe(100)
    expect(result.totalArea).toBe(1127000)
    expect(result.configuredArea).toBe(1127000)
  })

  it('calculates regional deployment totals', () => {
    const store = applyRegionalScenario(
      {},
      cells,
      selected.id,
      'all',
      'replace',
      researchParameters,
    )

    const result =
      calculateRegionalStatistics(
        cells,
        store,
        'research',
      )

    expect(result.totalDeployment).toBe(1225)

    expect(result.deploymentDensity)
      .toBeCloseTo(25 / 2.3)
  })

  it('calculates relative reduction in regional mean', () => {
    const store = saveCellScenario(
      {},
      selected,
      researchParameters,
    )

    const result =
      calculateRegionalStatistics(
        cells,
        store,
        'research',
      )

    expect(result.reduction?.mean).toBe(20)

    expect(result.relativeReduction)
      .toBeCloseTo(20 / 55 * 100)
  })

  it('does not average individual reduction percentages', () => {
    let store = saveCellScenario(
      {},
      cells[0]!,
      {
        mode: 'research',
        inputs: {
          temperature: 0,
          pm25: 50,
          carbonMonoxide: 0,
          artificialTrees: 10,
        },
      },
    )

    store = saveCellScenario(
      store,
      cells[1]!,
      {
        mode: 'research',
        inputs: {
          temperature: 0,
          pm25: 200,
          carbonMonoxide: 0,
          artificialTrees: 25,
        },
      },
    )

    const result =
      calculateRegionalStatistics(
        cells,
        store,
        'research',
      )

    expect(result.baseline?.mean).toBe(50)
    expect(result.intervention?.mean).toBe(36)
    expect(result.relativeReduction).toBeCloseTo(28)
  })

  it('handles a zero baseline without division by zero', () => {
    const store = saveCellScenario(
      {},
      selected,
      {
        mode: 'research',
        inputs: {
          temperature: 0,
          pm25: 0,
          carbonMonoxide: 0,
          artificialTrees: 0,
        },
      },
    )

    const result =
      calculateRegionalStatistics(
        cells,
        store,
        'research',
      )

    expect(result.relativeReduction).toBeNull()
    expect(result.unchangedCells).toBe(1)
    expect(result.improvedCells).toBe(0)
  })

  it('counts cells with positive reductions', () => {
    const store = applyRegionalScenario(
      {},
      cells,
      selected.id,
      'all',
      'replace',
      researchParameters,
    )

    const result =
      calculateRegionalStatistics(
        cells,
        store,
        'research',
      )

    expect(result.improvedCells).toBe(49)
    expect(result.unchangedCells).toBe(0)
    expect(result.worsenedCells).toBe(0)
  })

  it('preserves adaptive concentration units', () => {
    const result =
      calculateRegionalStatistics(
        [adaptiveCell],
        {
          [adaptiveCell.id]: adaptiveScenario,
        },
        'adaptive',
      )

    expect(result.unit).toBe('µg/m³')
    expect(result.baseline?.mean).toBe(100)
    expect(result.deploymentDensity).toBe(5)
  })

  it('rejects mixed scientific model outputs', () => {
    expect(() =>
      calculateRegionalStatistics(
        [selected],
        {
          [selected.id]: researchScenario,
        },
        'adaptive',
      ),
    ).toThrow()
  })
})

describe('Deployment sensitivity analysis', () => {
  it('generates 126 integer deployment points', () => {
    const points =
      generateDeploymentSensitivity(
        researchScenario,
      )

    expect(points).toHaveLength(126)
    expect(points[0]?.deploymentCount).toBe(0)
    expect(points.at(-1)?.deploymentCount).toBe(125)
  })

  it('preserves the baseline across deployments', () => {
    const points =
      generateDeploymentSensitivity(
        researchScenario,
      )

    expect(
      points.every(
        (point) => point.baseline === 55,
      ),
    ).toBe(true)
  })

  it('reproduces the applied research scenario', () => {
    const point =
      generateDeploymentSensitivity(
        researchScenario,
      ).find(
        (item) => item.deploymentCount === 25,
      )

    expect(point?.intervention).toBe(35)
  })

  it('includes the applied count with coarser sampling', () => {
    const points =
      generateDeploymentSensitivity(
        researchScenario,
        10,
      )

    expect(
      points.some(
        (point) => point.deploymentCount === 25,
      ),
    ).toBe(true)

    expect(
      points.at(-1)?.deploymentCount,
    ).toBe(125)
  })

  it('respects the published lower index boundary', () => {
    const points =
      generateDeploymentSensitivity(
        researchScenario,
      )

    expect(points.at(-1)?.intervention).toBe(0)

    expect(
      points.every(
        (point) => point.intervention >= 0,
      ),
    ).toBe(true)
  })

  it('reproduces the applied adaptive scenario', () => {
    const point =
      generateDeploymentSensitivity(
        adaptiveScenario,
      ).find(
        (item) => item.deploymentCount === 25,
      )

    if (adaptiveScenario.mode !== 'adaptive') {
      throw new Error('Unexpected model mode.')
    }

    expect(point?.intervention).toBeCloseTo(
      adaptiveScenario.result.interventionPm25,
    )
  })

  it('produces non-increasing adaptive outputs', () => {
    const points =
      generateDeploymentSensitivity(
        adaptiveScenario,
      )

    for (let index = 1; index < points.length; index++) {
      expect(
        points[index]!.intervention,
      ).toBeLessThanOrEqual(
        points[index - 1]!.intervention,
      )
    }
  })

  it('rejects invalid sensitivity increments', () => {
    expect(() =>
      generateDeploymentSensitivity(
        researchScenario,
        0,
      ),
    ).toThrow(RangeError)

    expect(() =>
      generateDeploymentSensitivity(
        researchScenario,
        0.5,
      ),
    ).toThrow(RangeError)
  })
})
