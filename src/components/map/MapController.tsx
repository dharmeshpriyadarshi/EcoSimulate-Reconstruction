import { useEffect } from 'react'
import { useMap, useMapEvents } from 'react-leaflet'

import type {
  MapViewport,
  StudyLocation,
} from '../../features/spatial/types'

interface MapControllerProps {
  location: StudyLocation
  resetVersion: number
  onViewportChange: (viewport: MapViewport) => void
}

export default function MapController({
  location,
  resetVersion,
  onViewportChange,
}: MapControllerProps) {
  const map = useMap()

  useEffect(() => {
    map.setView(
      [
        location.center.latitude,
        location.center.longitude,
      ],
      location.defaultZoom,
      { animate: false },
    )

    const center = map.wrapLatLng(map.getCenter())

    onViewportChange({
      center: {
        latitude: center.lat,
        longitude: center.lng,
      },
      zoom: map.getZoom(),
    })
  }, [
    map,
    location,
    resetVersion,
    onViewportChange,
  ])

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      map.invalidateSize({
        animate: false,
        pan: false,
      })
    })

    observer.observe(map.getContainer())

    return () => observer.disconnect()
  }, [map])

  useMapEvents({
    moveend() {
      const center = map.wrapLatLng(map.getCenter())

      onViewportChange({
        center: {
          latitude: center.lat,
          longitude: center.lng,
        },
        zoom: map.getZoom(),
      })
    },
  })

  return null
}
