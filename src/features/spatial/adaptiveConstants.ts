import {
  PARAMETER_BOUNDS,
} from '../simulator/constants'

export const WEB_MERCATOR_RADIUS = 6378137

export const TILE_SIZE = 256

export const ADAPTIVE_CELL_PIXELS = 48

export const MAX_MERCATOR_LATITUDE = 85.05112878

export const ADAPTIVE_AREA_BOUNDS = {
  min: PARAMETER_BOUNDS.area.min,
  max: PARAMETER_BOUNDS.area.max,
} as const
