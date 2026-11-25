import {
  EARTH_RADIUS_METRES,
  GRID_ROWS,
  GRID_COLUMNS,
  GRID_CELL_AREA,
} from './constants'

import type {
  Coordinates,
  SpatialBounds,
  SpatialGridCell,
  StudyLocation,
} from './types'

export function degreesToRadians(
  degrees: number,
): number {
  return degrees * Math.PI / 180
}

export function radiansToDegrees(
  radians: number,
): number {
  return radians * 180 / Math.PI
}

export function offsetCoordinates(
  origin: Coordinates,
  northMetres: number,
  eastMetres: number,
): Coordinates {
  const latitudeRadians =
    degreesToRadians(origin.latitude)

  const latitudeOffset =
    northMetres / EARTH_RADIUS_METRES

  const longitudeOffset =
    eastMetres /
    (
      EARTH_RADIUS_METRES *
      Math.cos(latitudeRadians)
    )

  return {
    latitude:
      origin.latitude +
      radiansToDegrees(latitudeOffset),

    longitude:
      origin.longitude +
      radiansToDegrees(longitudeOffset),
  }
}

export function generateGridForArea(
  location: StudyLocation,
  cellArea: number,
): SpatialGridCell[] {
  if (
    !Number.isFinite(cellArea) ||
    cellArea <= 0
  ) {
    throw new RangeError(
      'Cell area must be a positive finite number.',
    )
  }

  const cells: SpatialGridCell[] = []

  const side = Math.sqrt(cellArea)

  const totalHeight = GRID_ROWS * side
  const totalWidth = GRID_COLUMNS * side

  for (let row = 0; row < GRID_ROWS; row++) {
    for (
      let column = 0;
      column < GRID_COLUMNS;
      column++
    ) {
      const northOffset =
        totalHeight / 2 - row * side

      const southOffset =
        northOffset - side

      const westOffset =
        -totalWidth / 2 + column * side

      const eastOffset =
        westOffset + side

      const northWest = offsetCoordinates(
        location.center,
        northOffset,
        westOffset,
      )

      const southEast = offsetCoordinates(
        location.center,
        southOffset,
        eastOffset,
      )

      const center = offsetCoordinates(
        location.center,
        (northOffset + southOffset) / 2,
        (westOffset + eastOffset) / 2,
      )

      const index =
        row * GRID_COLUMNS + column + 1

      cells.push({
        id:
          `${location.id}-G-${String(index).padStart(3, '0')}`,

        locationId: location.id,
        row,
        column,
        center,

        bounds: {
          south: southEast.latitude,
          west: northWest.longitude,
          north: northWest.latitude,
          east: southEast.longitude,
        },

        area: cellArea,
        sideLength: side,
      })
    }
  }

  return cells
}

export function generateSpatialGrid(
  location: StudyLocation,
): SpatialGridCell[] {
  return generateGridForArea(
    location,
    GRID_CELL_AREA,
  )
}

export function calculateApproximateArea(
  bounds: SpatialBounds,
): number {
  const south = degreesToRadians(bounds.south)
  const north = degreesToRadians(bounds.north)

  const longitudeDifference = degreesToRadians(
    bounds.east - bounds.west,
  )

  return (
    EARTH_RADIUS_METRES ** 2 *
    Math.abs(longitudeDifference) *
    Math.abs(Math.sin(north) - Math.sin(south))
  )
}
