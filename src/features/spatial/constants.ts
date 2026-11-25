import {
  PUBLISHED_GRID_AREA,
} from '../simulator/publishedConstants'

export const EARTH_RADIUS_METRES = 6371008.8

export const GRID_ROWS = 7
export const GRID_COLUMNS = 7

export const GRID_CELL_AREA = PUBLISHED_GRID_AREA

export const GRID_CELL_SIDE_LENGTH =
  Math.sqrt(GRID_CELL_AREA)

export const GRID_CELL_COUNT =
  GRID_ROWS * GRID_COLUMNS

export const TOTAL_STUDY_AREA =
  GRID_CELL_COUNT * GRID_CELL_AREA

export const DEFAULT_GRID_INDEX =
  Math.floor(GRID_ROWS / 2) * GRID_COLUMNS +
  Math.floor(GRID_COLUMNS / 2)
