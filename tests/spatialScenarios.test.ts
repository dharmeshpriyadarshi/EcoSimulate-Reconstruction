import { describe, expect, it } from 'vitest'

import {
  DEFAULT_LOCATION,
} from '../src/features/spatial/cities'

import {
  generateSpatialGrid,
  generateGridForArea,
} from '../src/features/spatial/grid'

import {
  createAdaptiveConfiguration,
  generateLockedGrid,
  lockAdaptiveRegion,
} from '../src/features/spatial/adaptiveGrid'

import {
  calculateCellScenario,
  createDefaultParameters,
  saveCellScenario,
  removeCellScenario,
  countConfiguredCells,
} from '../src/features/spatial/scenarios'

describe('ECOSIMULATE cell scenario engine', () => {
  const cells =
    generateSpatialGrid(DEFAULT_LOCATION)

  const first = cells[0]!
  const second = cells[1]!

  it('starts research scenarios without deployments', () => {
    const parameters =
      createDefaultParameters('research')

    const scenario = calculateCellScenario(
      first,
      parameters,
    )

    expect(scenario.mode).toBe('research')

    if (scenario.mode === 'research') {
      expect(scenario.inputs.artificialTrees).toBe(0)
      expect(scenario.result.indexReduction).toBe(0)
    }
  })

  it('starts adaptive scenarios without deployments', () => {
    const parameters =
      createDefaultParameters('adaptive')

    const scenario = calculateCellScenario(
      first,
      parameters,
    )

    expect(scenario.mode).toBe('adaptive')

    if (scenario.mode === 'adaptive') {
      expect(scenario.inputs.filtrationUnits).toBe(0)
      expect(scenario.result.absoluteReduction).toBe(0)
    }
  })

  it('keeps independently configured cells separate', () => {
    const store = saveCellScenario(
      {},
      first,
      {
        mode: 'research',
        inputs: {
          temperature: 30,
          pm25: 100,
          carbonMonoxide: 5,
          artificialTrees: 25,
        },
      },
    )

    expect(store[first.id]).toBeDefined()
    expect(store[second.id]).toBeUndefined()
  })

  it('does not mutate existing scenario storage', () => {
    const original = {}

    const updated = saveCellScenario(
      original,
      first,
      createDefaultParameters('research'),
    )

    expect(original).toEqual({})
    expect(updated).not.toBe(original)
  })

  it('uses geographical cell area in adaptive calculations', () => {
    const smaller = generateGridForArea(
      DEFAULT_LOCATION,
      10000,
    )[0]!

    const larger = generateGridForArea(
      DEFAULT_LOCATION,
      100000,
    )[0]!

    const parameters = {
      mode: 'adaptive',
      inputs: {
        baselinePm25: 100,
        filtrationUnits: 25,
        interventionIntensity: 50,
      },
    } as const

    const smallResult = calculateCellScenario(
      smaller,
      parameters,
    )

    const largeResult = calculateCellScenario(
      larger,
      parameters,
    )

    if (
      smallResult.mode !== 'adaptive' ||
      largeResult.mode !== 'adaptive'
    ) {
      throw new Error('Unexpected simulation mode.')
    }

    expect(smallResult.inputs.area).toBe(10000)
    expect(largeResult.inputs.area).toBe(100000)

    expect(
      smallResult.result.interventionPm25,
    ).toBeLessThan(
      largeResult.result.interventionPm25,
    )
  })

  it('rejects non-reference areas in the published model', () => {
    const cell = generateGridForArea(
      DEFAULT_LOCATION,
      50000,
    )[0]!

    expect(() =>
      calculateCellScenario(
        cell,
        createDefaultParameters('research'),
      ),
    ).toThrow(RangeError)
  })

  it('resets one cell without removing neighbouring scenarios', () => {
    const parameters =
      createDefaultParameters('research')

    const firstStore = saveCellScenario(
      {},
      first,
      parameters,
    )

    const secondStore = saveCellScenario(
      firstStore,
      second,
      parameters,
    )

    const updated = removeCellScenario(
      secondStore,
      first.id,
    )

    expect(updated[first.id]).toBeUndefined()
    expect(updated[second.id]).toBeDefined()
    expect(secondStore[first.id]).toBeDefined()
  })

  it('counts only configured cells in the active grid', () => {
    const store = saveCellScenario(
      {},
      first,
      createDefaultParameters('research'),
    )

    expect(
      countConfiguredCells(store, cells),
    ).toBe(1)

    expect(
      countConfiguredCells(store, [second]),
    ).toBe(0)
  })

  it('preserves adaptive scenarios through map navigation', () => {
    const configuration =
      createAdaptiveConfiguration(DEFAULT_LOCATION)

    const region = lockAdaptiveRegion(
      DEFAULT_LOCATION.id,
      configuration,
    )

    const lockedCells = generateLockedGrid(
      DEFAULT_LOCATION,
      region,
    )

    const cell = lockedCells[0]!

    const store = saveCellScenario(
      {},
      cell,
      createDefaultParameters('adaptive'),
    )

    const regenerated = generateLockedGrid(
      DEFAULT_LOCATION,
      region,
    )

    expect(
      store[regenerated[0]!.id],
    ).toBeDefined()
  })
})
