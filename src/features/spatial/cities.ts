import type { StudyLocation } from './types'

export const STUDY_LOCATIONS: readonly StudyLocation[] = [
  {
    id: 'delhi',
    name: 'Delhi',
    region: 'National Capital Territory',
    center: {
      latitude: 28.6139,
      longitude: 77.2090,
    },
    defaultZoom: 15,
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    region: 'Maharashtra',
    center: {
      latitude: 19.0760,
      longitude: 72.8777,
    },
    defaultZoom: 15,
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    region: 'Telangana',
    center: {
      latitude: 17.3850,
      longitude: 78.4867,
    },
    defaultZoom: 15,
  },
  {
    id: 'chennai',
    name: 'Chennai',
    region: 'Tamil Nadu',
    center: {
      latitude: 13.0827,
      longitude: 80.2707,
    },
    defaultZoom: 15,
  },
  {
    id: 'pune',
    name: 'Pune',
    region: 'Maharashtra',
    center: {
      latitude: 18.5204,
      longitude: 73.8567,
    },
    defaultZoom: 15,
  },
  {
    id: 'munnar',
    name: 'Munnar',
    region: 'Kerala',
    center: {
      latitude: 10.0889,
      longitude: 77.0595,
    },
    defaultZoom: 15,
  },
  {
    id: 'manali',
    name: 'Manali',
    region: 'Himachal Pradesh',
    center: {
      latitude: 32.2396,
      longitude: 77.1887,
    },
    defaultZoom: 15,
  },
]

export const DEFAULT_LOCATION = STUDY_LOCATIONS[0]!
