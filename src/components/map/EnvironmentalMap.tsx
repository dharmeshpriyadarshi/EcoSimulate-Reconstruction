import { useState } from 'react'

import {
  MapContainer,
  ScaleControl,
  TileLayer,
  ZoomControl,
} from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

import MapController from './MapController'
import SpatialGridLayer from './SpatialGridLayer'

import type {
  MapViewport,
  SpatialGridCell,
  StudyLocation,
} from '../../features/spatial/types'

import type {
  ScenarioStore,
} from '../../features/spatial/scenarioTypes'

import type {
  LayerDefinition,
} from '../../features/spatial/analysisLayers'

interface EnvironmentalMapProps {
  location: StudyLocation
  resetVersion: number
  onViewportChange: (viewport: MapViewport) => void
  cells: readonly SpatialGridCell[]
  selectedCellId: string
  onCellSelect: (cellId: string) => void
  showGrid: boolean
  scenarios: ScenarioStore
  activeLayer: LayerDefinition
  showMarkers: boolean
  showLabels: boolean
  threshold: number
}

const TILE_URL =
  'https://tile.openstreetmap.org/{z}/{x}/{y}.png'

const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

export default function EnvironmentalMap({
  location,
  resetVersion,
  onViewportChange,
  cells,
  selectedCellId,
  onCellSelect,
  showGrid,
  scenarios,
  activeLayer,
  showMarkers,
  showLabels,
  threshold,
}: EnvironmentalMapProps) {
  const [tileError, setTileError] =
    useState(false)

  const center: [number, number] = [
    location.center.latitude,
    location.center.longitude,
  ]

  return (
    <div className="environmental-map">
      <MapContainer
        center={center}
        zoom={location.defaultZoom}
        minZoom={5}
        maxZoom={19}
        zoomSnap={0.25}
        zoomDelta={0.25}
        zoomControl={false}
        scrollWheelZoom={false}
        preferCanvas={true}
        className="environmental-map__canvas"
      >
        <TileLayer
          url={TILE_URL}
          attribution={TILE_ATTRIBUTION}
          maxZoom={19}
          eventHandlers={{
            tileerror: () => setTileError(true),
            load: () => setTileError(false),
          }}
        />

        <ZoomControl position="topleft" />

        <ScaleControl
          position="bottomleft"
          imperial={false}
          metric={true}
        />

        {showGrid && (
          <SpatialGridLayer
            cells={cells}
            selectedCellId={selectedCellId}
            onCellSelect={onCellSelect}
            scenarios={scenarios}
            activeLayer={activeLayer}
            showMarkers={showMarkers}
            showLabels={showLabels}
            threshold={threshold}
          />
        )}

        <MapController
          location={location}
          resetVersion={resetVersion}
          onViewportChange={onViewportChange}
        />
      </MapContainer>

      {tileError && (
        <div
          className="map-service-notice"
          role="status"
        >
          Some geographical tiles could not be loaded.
          Check your internet connection.
        </div>
      )}
    </div>
  )
}
