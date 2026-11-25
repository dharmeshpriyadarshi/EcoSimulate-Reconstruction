import { describe, expect, it } from 'vitest'

import {
  PUBLISHED_DEFAULT_INPUTS,
  PUBLISHED_PARAMETER_BOUNDS,
} from '../src/features/simulator/publishedConstants'

import {
  simulatePublishedModel,
} from '../src/features/simulator/publishedModel'

import type {
  PublishedModelInputs,
} from '../src/features/simulator/publishedTypes'

describe('ECOSIMULATE published Pollution Index model', () => {
  it('reproduces the expected default calculation', () => {
    const result = simulatePublishedModel(
      PUBLISHED_DEFAULT_INPUTS,
    )

    expect(result.rawBaselineIndex).toBeCloseTo(53)
    expect(result.rawInterventionIndex).toBeCloseTo(33)

    expect(result.baselineIndex).toBeCloseTo(53)
    expect(result.interventionIndex).toBeCloseTo(33)

    expect(result.indexReduction).toBeCloseTo(20)

    expect(result.percentageReduction).toBeCloseTo(
      (20 / 53) * 100,
    )

    expect(result.gridArea).toBe(23000)
  })

  it('produces no reduction without artificial trees', () => {
    const result = simulatePublishedModel({
      ...PUBLISHED_DEFAULT_INPUTS,
      artificialTrees: 0,
    })

    expect(result.interventionIndex).toBe(
      result.baselineIndex,
    )

    expect(result.indexReduction).toBe(0)
  })

  it('applies the original artificial-tree coefficient', () => {
    const result = simulatePublishedModel({
      ...PUBLISHED_DEFAULT_INPUTS,
      artificialTrees: 10,
    })

    expect(result.indexReduction).toBeCloseTo(8)
  })

  it('clamps the intervention index at zero', () => {
    const result = simulatePublishedModel({
      ...PUBLISHED_DEFAULT_INPUTS,
      artificialTrees: 125,
    })

    expect(result.rawInterventionIndex).toBeLessThan(0)
    expect(result.interventionIndex).toBe(0)
    expect(result.interventionClamped).toBe(true)
    expect(result.percentageReduction).toBe(100)
  })

  it('clamps both indexes at their upper boundary', () => {
    const result = simulatePublishedModel({
      temperature: 50,
      pm25: 500,
      carbonMonoxide: 50,
      artificialTrees: 0,
    })

    expect(result.rawBaselineIndex).toBe(275)
    expect(result.baselineIndex).toBe(100)
    expect(result.interventionIndex).toBe(100)

    expect(result.baselineClamped).toBe(true)
    expect(result.interventionClamped).toBe(true)
  })

  it('correctly represents upper-bound saturation', () => {
    const result = simulatePublishedModel({
      temperature: 50,
      pm25: 500,
      carbonMonoxide: 50,
      artificialTrees: 125,
    })

    expect(result.rawInterventionIndex).toBe(175)
    expect(result.interventionIndex).toBe(100)
    expect(result.indexReduction).toBe(0)
  })

  it('handles a zero baseline correctly', () => {
    const result = simulatePublishedModel({
      temperature: 0,
      pm25: 0,
      carbonMonoxide: 0,
      artificialTrees: 0,
    })

    expect(result.baselineIndex).toBe(0)
    expect(result.interventionIndex).toBe(0)
    expect(result.percentageReduction).toBeNull()
  })

  it('returns deterministic results', () => {
    expect(
      simulatePublishedModel(PUBLISHED_DEFAULT_INPUTS),
    ).toEqual(
      simulatePublishedModel(PUBLISHED_DEFAULT_INPUTS),
    )
  })

  it('does not mutate inputs', () => {
    const inputs = { ...PUBLISHED_DEFAULT_INPUTS }
    const original = { ...inputs }

    simulatePublishedModel(inputs)

    expect(inputs).toEqual(original)
  })

  it('exposes the individual equation contributions', () => {
    const result = simulatePublishedModel(
      PUBLISHED_DEFAULT_INPUTS,
    )

    expect(result.contributions.temperature).toBeCloseTo(9)
    expect(result.contributions.pm25).toBeCloseTo(38)
    expect(result.contributions.carbonMonoxide).toBeCloseTo(6)
    expect(result.contributions.artificialTrees).toBeCloseTo(-20)
  })

  const keys = Object.keys(
    PUBLISHED_PARAMETER_BOUNDS,
  ) as (keyof PublishedModelInputs)[]

  for (const key of keys) {
    it(`rejects ${key} below its minimum`, () => {
      expect(() =>
        simulatePublishedModel({
          ...PUBLISHED_DEFAULT_INPUTS,
          [key]: PUBLISHED_PARAMETER_BOUNDS[key].min - 1,
        }),
      ).toThrow(RangeError)
    })

    it(`rejects ${key} above its maximum`, () => {
      expect(() =>
        simulatePublishedModel({
          ...PUBLISHED_DEFAULT_INPUTS,
          [key]: PUBLISHED_PARAMETER_BOUNDS[key].max + 1,
        }),
      ).toThrow(RangeError)
    })

    it(`rejects non-finite ${key} values`, () => {
      for (const value of [NaN, Infinity, -Infinity]) {
        expect(() =>
          simulatePublishedModel({
            ...PUBLISHED_DEFAULT_INPUTS,
            [key]: value,
          }),
        ).toThrow(RangeError)
      }
    })
  }

  it('rejects fractional artificial-tree counts', () => {
    expect(() =>
      simulatePublishedModel({
        ...PUBLISHED_DEFAULT_INPUTS,
        artificialTrees: 12.5,
      }),
    ).toThrow(RangeError)
  })
})
