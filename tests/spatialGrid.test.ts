import { describe, expect, it } from 'vitest'

import {
  DEFAULT_LOCATION,
  STUDY_LOCATIONS,
} from '../src/features/spatial/cities'

import {
  DEFAULT_GRID_INDEX,
  GRID_CELL_AREA,
  GRID_CELL_COUNT,
  GRID_CELL_SIDE_LENGTH,
  GRID_COLUMNS,
  GRID_ROWS,
  TOTAL_STUDY_AREA,
} from '../src/features/spatial/constants'

import {
  calculateApproximateArea,
  generateSpatialGrid,
  offsetCoordinates,
} from '../src/features/spatial/grid'

describe('ECOSIMULATE spatial grid engine', () => {
  it('generates exactly 49 cells', () => {
    const cells = generateSpatialGrid(
      DEFAULT_LOCATION,
    )

    expect(cells).toHaveLength(GRID_CELL_COUNT)
    expect(cells).toHaveLength(49)
  })

  it('assigns unique identifiers across all locations', () => {
    const cells = STUDY_LOCATIONS.flatMap(
      generateSpatialGrid,
    )

    const identifiers = new Set(
      cells.map((cell) => cell.id),
    )

    expect(identifiers.size).toBe(cells.length)
  })

  it('preserves the reference cell dimensions', () => {
    const cells = generateSpatialGrid(
      DEFAULT_LOCATION,
    )

    for (const cell of cells) {
      expect(cell.area).toBe(GRID_CELL_AREA)

      expect(
        cell.sideLength ** 2,
      ).toBeCloseTo(GRID_CELL_AREA, 8)
    }

    expect(GRID_CELL_SIDE_LENGTH).toBeCloseTo(
      Math.sqrt(23000),
      8,
    )
  })

  it('preserves the total nominal study area', () => {
    const cells = generateSpatialGrid(
      DEFAULT_LOCATION,
    )

    const total = cells.reduce(
      (sum, cell) => sum + cell.area,
      0,
    )

    expect(total).toBe(TOTAL_STUDY_AREA)
    expect(total).toBe(1127000)
  })

  it('centers the middle cell at the reference location', () => {
    const cells = generateSpatialGrid(
      DEFAULT_LOCATION,
    )

    const center = cells[DEFAULT_GRID_INDEX]!.center

    expect(center.latitude).toBeCloseTo(
      DEFAULT_LOCATION.center.latitude,
      10,
    )

    expect(center.longitude).toBeCloseTo(
      DEFAULT_LOCATION.center.longitude,
      10,
    )
  })

  it('generates valid geographical boundaries', () => {
    const cells = STUDY_LOCATIONS.flatMap(
      generateSpatialGrid,
    )

    for (const cell of cells) {
      expect(cell.bounds.north).toBeGreaterThan(
        cell.bounds.south,
      )

      expect(cell.bounds.east).toBeGreaterThan(
        cell.bounds.west,
      )

      expect(cell.center.latitude).toBeGreaterThan(
        cell.bounds.south,
      )

      expect(cell.center.latitude).toBeLessThan(
        cell.bounds.north,
      )

      expect(cell.center.longitude).toBeGreaterThan(
        cell.bounds.west,
      )

      expect(cell.center.longitude).toBeLessThan(
        cell.bounds.east,
      )
    }
  })

  it('generates contiguous horizontal cells', () => {
    const cells = generateSpatialGrid(
      DEFAULT_LOCATION,
    )

    for (let row = 0; row < GRID_ROWS; row++) {
      for (
        let column = 0;
        column < GRID_COLUMNS - 1;
        column++
      ) {
        const left =
          cells[row * GRID_COLUMNS + column]!

        const right =
          cells[row * GRID_COLUMNS + column + 1]!

        expect(left.bounds.east).toBeCloseTo(
          right.bounds.west,
          10,
        )
      }
    }
  })

  it('generates contiguous vertical cells', () => {
    const cells = generateSpatialGrid(
      DEFAULT_LOCATION,
    )

    for (let row = 0; row < GRID_ROWS - 1; row++) {
      for (
        let column = 0;
        column < GRID_COLUMNS;
        column++
      ) {
        const upper =
          cells[row * GRID_COLUMNS + column]!

        const lower =
          cells[(row + 1) * GRID_COLUMNS + column]!

        expect(upper.bounds.south).toBeCloseTo(
          lower.bounds.north,
          10,
        )
      }
    }
  })

  it('preserves approximately equal physical areas', () => {
    const cells = STUDY_LOCATIONS.flatMap(
      generateSpatialGrid,
    )

    for (const cell of cells) {
      const calculatedArea =
        calculateApproximateArea(cell.bounds)

      const relativeError =
        Math.abs(calculatedArea - GRID_CELL_AREA) /
        GRID_CELL_AREA

      expect(relativeError).toBeLessThan(0.001)
    }
  })

  it('produces deterministic spatial grids', () => {
    expect(
      generateSpatialGrid(DEFAULT_LOCATION),
    ).toEqual(
      generateSpatialGrid(DEFAULT_LOCATION),
    )
  })

  it('adjusts longitude distances by latitude', () => {
    const equator = offsetCoordinates(
      { latitude: 0, longitude: 0 },
      0,
      1000,
    )

    const higherLatitude = offsetCoordinates(
      { latitude: 60, longitude: 0 },
      0,
      1000,
    )

    expect(
      higherLatitude.longitude,
    ).toBeGreaterThan(equator.longitude)
  })
})
