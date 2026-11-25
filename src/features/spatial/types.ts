export interface Coordinates {
  latitude: number
  longitude: number
}

export interface StudyLocation {
  id: string
  name: string
  region: string
  center: Coordinates
  defaultZoom: number
}

export interface MapViewport {
  center: Coordinates
  zoom: number
}

export interface SpatialBounds {
  south: number
  west: number
  north: number
  east: number
}

export interface SpatialGridCell {
  id: string
  locationId: string
  row: number
  column: number
  center: Coordinates
  bounds: SpatialBounds
  area: number
  sideLength: number
}
