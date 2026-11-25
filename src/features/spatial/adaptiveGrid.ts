import {
  ADAPTIVE_AREA_BOUNDS,
  ADAPTIVE_CELL_PIXELS,
  MAX_MERCATOR_LATITUDE,
  TILE_SIZE,
  WEB_MERCATOR_RADIUS,
} from './adaptiveConstants'

import {
  GRID_CELL_COUNT,
} from './constants'

import {
  degreesToRadians,
  generateGridForArea,
} from './grid'

import type {
  AdaptiveGridConfiguration,
  AdaptiveGridMetrics,
  LockedStudyRegion,
} from './adaptiveTypes'

import type {
  SpatialGridCell,
  StudyLocation,
} from './types'

export function calculateGroundResolution(
  latitude: number,
  zoom: number,
): number {
  if (
    !Number.isFinite(latitude) ||
    Math.abs(latitude) > MAX_MERCATOR_LATITUDE
  ) {
    throw new RangeError(
      'Latitude is outside supported Web Mercator bounds.',
    )
  }

  if (
    !Number.isFinite(zoom) ||
    zoom < 0 ||
    zoom > 24
  ) {
    throw new RangeError(
      'Zoom must be between 0 and 24.',
    )
  }

  return (
    2 *
    Math.PI *
    WEB_MERCATOR_RADIUS *
    Math.cos(degreesToRadians(latitude))
  ) / (
    TILE_SIZE * 2 ** zoom
  )
}

export function calculateAdaptiveMetrics(
  configuration: AdaptiveGridConfiguration,
): AdaptiveGridMetrics {
  const {
    center,
    zoom,
    cellPixels,
  } = configuration

  if (
    !Number.isFinite(center.longitude) ||
    center.longitude < -180 ||
    center.longitude > 180
  ) {
    throw new RangeError(
      'Longitude must be between -180 and 180.',
    )
  }

  if (
    !Number.isFinite(cellPixels) ||
    cellPixels <= 0
  ) {
    throw new RangeError(
      'Cell pixel width must be positive.',
    )
  }

  const metresPerPixel =
    calculateGroundResolution(
      center.latitude,
      zoom,
    )

  const sideLength =
    metresPerPixel * cellPixels

  const cellArea =
    sideLength ** 2

  const isSupported =
    cellArea >= ADAPTIVE_AREA_BOUNDS.min &&
    cellArea <= ADAPTIVE_AREA_BOUNDS.max

  return {
    metresPerPixel,
    sideLength,
    cellArea,
    totalArea: cellArea * GRID_CELL_COUNT,
    isSupported,
  }
}

export function createAdaptiveConfiguration(
  location: StudyLocation,
): AdaptiveGridConfiguration {
  return {
    center: { ...location.center },
    zoom: location.defaultZoom,
    cellPixels: ADAPTIVE_CELL_PIXELS,
  }
}

export function generateAdaptiveGrid(
  location: StudyLocation,
  configuration: AdaptiveGridConfiguration,
): SpatialGridCell[] {
  const metrics =
    calculateAdaptiveMetrics(configuration)

  const adaptiveLocation: StudyLocation = {
    ...location,
    center: { ...configuration.center },
    defaultZoom: configuration.zoom,
  }

  return generateGridForArea(
    adaptiveLocation,
    metrics.cellArea,
  )
}

export function lockAdaptiveRegion(
  locationId: string,
  configuration: AdaptiveGridConfiguration,
): LockedStudyRegion {
  const metrics =
    calculateAdaptiveMetrics(configuration)

  if (!metrics.isSupported) {
    throw new RangeError(
      'The selected area is outside the supported simulation range.',
    )
  }

  const { latitude, longitude } =
    configuration.center

  const id = [
    locationId,
    'adaptive',
    latitude.toString(),
    longitude.toString(),
    configuration.zoom.toString(),
    configuration.cellPixels.toString(),
  ].join('-')

  return {
    id,
    locationId,
    center: { ...configuration.center },
    zoom: configuration.zoom,
    cellArea: metrics.cellArea,
    cellSideLength: metrics.sideLength,
    mode: 'adaptive',
  }
}

export function generateLockedGrid(
  location: StudyLocation,
  region: LockedStudyRegion,
): SpatialGridCell[] {
  if (location.id !== region.locationId) {
    throw new RangeError(
      'The region does not belong to the selected location.',
    )
  }

  const lockedLocation: StudyLocation = {
    ...location,
    center: { ...region.center },
    defaultZoom: region.zoom,
  }

  return generateGridForArea(
    lockedLocation,
    region.cellArea,
  ).map((cell) => ({
    ...cell,
    id: `${region.id}-G-${String(
      cell.row * 7 + cell.column + 1,
    ).padStart(3, '0')}`,
  }))
}
