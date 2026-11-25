import { describe, expect, it } from 'vitest'

import {
  DEFAULT_INPUTS,
  PARAMETER_BOUNDS,
} from '../src/features/simulator/constants'

import { simulateScenario } from '../src/features/simulator/model'

import type {
  SimulationInputs,
} from '../src/features/simulator/types'

describe('ECOSIMULATE demonstration model', () => {
  it('calculates the expected default scenario', () => {
    const result = simulateScenario(DEFAULT_INPUTS)

    expect(result.baselinePm25).toBe(100)

    expect(result.interventionScore).toBeCloseTo(
      0.0625,
      10,
    )

    expect(result.interventionPm25).toBeCloseTo(
      93.94130628,
      7,
    )

    expect(result.absoluteReduction).toBeCloseTo(
      6.05869372,
      7,
    )

    expect(result.percentageReduction).toBeCloseTo(
      6.05869372,
      7,
    )

    expect(result.unitsPerHectare).toBeCloseTo(
      25 / 2.3,
      7,
    )
  })

  it('produces identical results for identical inputs', () => {
    const first = simulateScenario(DEFAULT_INPUTS)
    const second = simulateScenario(DEFAULT_INPUTS)

    expect(first).toEqual(second)
  })

  it('does not mutate the supplied inputs', () => {
    const inputs = { ...DEFAULT_INPUTS }
    const original = { ...inputs }

    simulateScenario(inputs)

    expect(inputs).toEqual(original)
  })

  it('produces no reduction with zero filtration units', () => {
    const result = simulateScenario({
      ...DEFAULT_INPUTS,
      filtrationUnits: 0,
    })

    expect(result.interventionPm25).toBe(
      DEFAULT_INPUTS.baselinePm25,
    )

    expect(result.absoluteReduction).toBe(0)
    expect(result.percentageReduction).toBe(0)
  })

  it('produces no reduction with zero intervention intensity', () => {
    const result = simulateScenario({
      ...DEFAULT_INPUTS,
      interventionIntensity: 0,
    })

    expect(result.interventionPm25).toBe(
      DEFAULT_INPUTS.baselinePm25,
    )

    expect(result.absoluteReduction).toBe(0)
  })

  it('handles a zero baseline without division by zero', () => {
    const result = simulateScenario({
      ...DEFAULT_INPUTS,
      baselinePm25: 0,
    })

    expect(result.interventionPm25).toBe(0)
    expect(result.absoluteReduction).toBe(0)
    expect(result.percentageReduction).toBeNull()
  })

  it('models a greater reduction with additional units', () => {
    const low = simulateScenario({
      ...DEFAULT_INPUTS,
      filtrationUnits: 10,
    })

    const high = simulateScenario({
      ...DEFAULT_INPUTS,
      filtrationUnits: 60,
    })

    expect(high.interventionPm25).toBeLessThan(
      low.interventionPm25,
    )
  })

  it('models a greater reduction with higher intensity', () => {
    const low = simulateScenario({
      ...DEFAULT_INPUTS,
      interventionIntensity: 20,
    })

    const high = simulateScenario({
      ...DEFAULT_INPUTS,
      interventionIntensity: 80,
    })

    expect(high.interventionPm25).toBeLessThan(
      low.interventionPm25,
    )
  })

  it('models a weaker intervention over a larger area', () => {
    const smaller = simulateScenario({
      ...DEFAULT_INPUTS,
      area: 10000,
    })

    const larger = simulateScenario({
      ...DEFAULT_INPUTS,
      area: 100000,
    })

    expect(larger.interventionPm25).toBeGreaterThan(
      smaller.interventionPm25,
    )
  })

  it('exhibits diminishing marginal reductions', () => {
    const first = simulateScenario({
      ...DEFAULT_INPUTS,
      filtrationUnits: 0,
    })

    const second = simulateScenario({
      ...DEFAULT_INPUTS,
      filtrationUnits: 25,
    })

    const third = simulateScenario({
      ...DEFAULT_INPUTS,
      filtrationUnits: 50,
    })

    const initialReduction =
      first.interventionPm25 - second.interventionPm25

    const subsequentReduction =
      second.interventionPm25 - third.interventionPm25

    expect(subsequentReduction).toBeLessThan(
      initialReduction,
    )
  })

  it('keeps outputs within bounds at maximum intervention', () => {
    const result = simulateScenario({
      baselinePm25: 500,
      area: 10000,
      filtrationUnits: 125,
      interventionIntensity: 100,
    })

    expect(result.interventionPm25).toBeGreaterThanOrEqual(0)
    expect(result.interventionPm25).toBeLessThanOrEqual(500)

    expect(result.absoluteReduction).toBeGreaterThanOrEqual(0)
    expect(result.absoluteReduction).toBeLessThanOrEqual(500)

    expect(result.percentageReduction).toBeGreaterThanOrEqual(0)
    expect(result.percentageReduction).toBeLessThanOrEqual(100)
  })

  const parameterKeys = Object.keys(PARAMETER_BOUNDS) as
    (keyof SimulationInputs)[]

  for (const key of parameterKeys) {
    it(`rejects ${key} below its minimum`, () => {
      expect(() =>
        simulateScenario({
          ...DEFAULT_INPUTS,
          [key]: PARAMETER_BOUNDS[key].min - 1,
        }),
      ).toThrow(RangeError)
    })

    it(`rejects ${key} above its maximum`, () => {
      expect(() =>
        simulateScenario({
          ...DEFAULT_INPUTS,
          [key]: PARAMETER_BOUNDS[key].max + 1,
        }),
      ).toThrow(RangeError)
    })

    it(`rejects non-finite ${key} values`, () => {
      for (const value of [NaN, Infinity, -Infinity]) {
        expect(() =>
          simulateScenario({
            ...DEFAULT_INPUTS,
            [key]: value,
          }),
        ).toThrow(RangeError)
      }
    })
  }

  it('rejects fractional filtration unit counts', () => {
    expect(() =>
      simulateScenario({
        ...DEFAULT_INPUTS,
        filtrationUnits: 12.5,
      }),
    ).toThrow(RangeError)
  })
})
