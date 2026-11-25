import type { Coordinates } from './types'

export type SpatialMode =
  | 'research'
  | 'adaptive'

export interface AdaptiveGridConfiguration {
  center: Coordinates
  zoom: number
  cellPixels: number
}

export interface AdaptiveGridMetrics {
  metresPerPixel: number
  sideLength: number
  cellArea: number
  totalArea: number
  isSupported: boolean
}

export interface LockedStudyRegion {
  id: string
  locationId: string
  center: Coordinates
  zoom: number
  cellArea: number
  cellSideLength: number
  mode: SpatialMode
}
