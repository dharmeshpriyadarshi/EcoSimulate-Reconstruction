import { describe, expect, it } from 'vitest'

import {
  DEFAULT_LOCATION,
  STUDY_LOCATIONS,
} from '../src/features/spatial/cities'

import {
  ADAPTIVE_CELL_PIXELS,
} from '../src/features/spatial/adaptiveConstants'

import {
  calculateGroundResolution,
  calculateAdaptiveMetrics,
  createAdaptiveConfiguration,
  generateAdaptiveGrid,
  generateLockedGrid,
  lockAdaptiveRegion,
} from '../src/features/spatial/adaptiveGrid'

import {
  calculateApproximateArea,
  generateSpatialGrid,
} from '../src/features/spatial/grid'

import {
  DEFAULT_GRID_INDEX,
} from '../src/features/spatial/constants'

describe('ECOSIMULATE adaptive spatial engine', () => {
  const configuration =
    createAdaptiveConfiguration(DEFAULT_LOCATION)

  it('uses the configured visual cell width', () => {
    expect(configuration.cellPixels).toBe(
      ADAPTIVE_CELL_PIXELS,
    )
  })

  it('halves ground resolution for each additional zoom level', () => {
    const first = calculateGroundResolution(
      28.6139,
      15,
    )

    const second = calculateGroundResolution(
      28.6139,
      16,
    )

    expect(second).toBeCloseTo(first / 2, 10)
  })

  it('reduces cell area by a factor of four when zooming in', () => {
    const first =
      calculateAdaptiveMetrics(configuration)

    const second =
      calculateAdaptiveMetrics({
        ...configuration,
        zoom: configuration.zoom + 1,
      })

    expect(second.cellArea).toBeCloseTo(
      first.cellArea / 4,
      8,
    )
  })

  it('accounts for latitude in ground resolution', () => {
    const equator =
      calculateGroundResolution(0, 15)

    const higherLatitude =
      calculateGroundResolution(60, 15)

    expect(higherLatitude).toBeCloseTo(
      equator / 2,
      10,
    )
  })

  it('generates exactly 49 adaptive cells', () => {
    const cells = generateAdaptiveGrid(
      DEFAULT_LOCATION,
      configuration,
    )

    expect(cells).toHaveLength(49)
  })

  it('preserves adaptive cell areas across study locations', () => {
    for (const location of STUDY_LOCATIONS) {
      const config =
        createAdaptiveConfiguration(location)

      const metrics =
        calculateAdaptiveMetrics(config)

      const cells =
        generateAdaptiveGrid(location, config)

      for (const cell of cells) {
        expect(cell.area).toBeCloseTo(
          metrics.cellArea,
          8,
        )

        const calculated =
          calculateApproximateArea(cell.bounds)

        const relativeError =
          Math.abs(calculated - cell.area) /
          cell.area

        expect(relativeError).toBeLessThan(
          0.001,
        )
      }
    }
  })

  it('centers adaptive grids at the configured viewport', () => {
    const movedConfiguration = {
      ...configuration,
      center: {
        latitude: 28.65,
        longitude: 77.25,
      },
    }

    const cells = generateAdaptiveGrid(
      DEFAULT_LOCATION,
      movedConfiguration,
    )

    const center =
      cells[DEFAULT_GRID_INDEX]!.center

    expect(center.latitude).toBeCloseTo(
      28.65,
      10,
    )

    expect(center.longitude).toBeCloseTo(
      77.25,
      10,
    )
  })

  it('recognizes unsupported simulation areas', () => {
    const distant =
      calculateAdaptiveMetrics({
        ...configuration,
        zoom: 10,
      })

    const close =
      calculateAdaptiveMetrics({
        ...configuration,
        zoom: 19,
      })

    expect(distant.isSupported).toBe(false)
    expect(close.isSupported).toBe(false)
  })

  it('accepts the default adaptive study configuration', () => {
    expect(
      calculateAdaptiveMetrics(configuration)
        .isSupported,
    ).toBe(true)
  })

  it('locks a supported geographical region', () => {
    const region = lockAdaptiveRegion(
      DEFAULT_LOCATION.id,
      configuration,
    )

    expect(region.mode).toBe('adaptive')

    expect(region.center).toEqual(
      configuration.center,
    )

    expect(region.cellArea).toBeCloseTo(
      calculateAdaptiveMetrics(configuration)
        .cellArea,
      8,
    )
  })

  it('rejects locking an unsupported region', () => {
    expect(() =>
      lockAdaptiveRegion(DEFAULT_LOCATION.id, {
        ...configuration,
        zoom: 10,
      }),
    ).toThrow(RangeError)
  })

  it('preserves locked geometry after viewport changes', () => {
    const mutableConfiguration = {
      ...configuration,
      center: { ...configuration.center },
    }

    const region = lockAdaptiveRegion(
      DEFAULT_LOCATION.id,
      mutableConfiguration,
    )

    const original = generateLockedGrid(
      DEFAULT_LOCATION,
      region,
    )

    mutableConfiguration.zoom += 2

    mutableConfiguration.center.latitude += 0.01
    mutableConfiguration.center.longitude += 0.01

    const regenerated = generateLockedGrid(
      DEFAULT_LOCATION,
      region,
    )

    expect(regenerated).toEqual(original)
  })

  it('assigns distinct identifiers to different locked regions', () => {
    const first = lockAdaptiveRegion(
      DEFAULT_LOCATION.id,
      configuration,
    )

    const second = lockAdaptiveRegion(
      DEFAULT_LOCATION.id,
      {
        ...configuration,
        center: {
          latitude:
            configuration.center.latitude + 0.01,

          longitude:
            configuration.center.longitude,
        },
      },
    )

    expect(first.id).not.toBe(second.id)

    const firstCells = generateLockedGrid(
      DEFAULT_LOCATION,
      first,
    )

    const secondCells = generateLockedGrid(
      DEFAULT_LOCATION,
      second,
    )

    const ids = new Set(
      [...firstCells, ...secondCells].map(
        (cell) => cell.id,
      ),
    )

    expect(ids.size).toBe(98)
  })

  it('preserves the original fixed research grid', () => {
    const cells =
      generateSpatialGrid(DEFAULT_LOCATION)

    for (const cell of cells) {
      expect(cell.area).toBe(23000)
    }
  })

  it('rejects invalid spatial inputs', () => {
    expect(() =>
      calculateGroundResolution(90, 15),
    ).toThrow(RangeError)

    expect(() =>
      calculateGroundResolution(0, -1),
    ).toThrow(RangeError)

    expect(() =>
      calculateGroundResolution(0, NaN),
    ).toThrow(RangeError)

    expect(() =>
      calculateAdaptiveMetrics({
        ...configuration,
        cellPixels: 0,
      }),
    ).toThrow(RangeError)

    expect(() =>
      calculateAdaptiveMetrics({
        ...configuration,
        center: {
          latitude: 28.6139,
          longitude: 190,
        },
      }),
    ).toThrow(RangeError)
  })
})
