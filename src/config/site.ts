export const siteConfig = {
  name: 'ECOSIMULATE',
  title: 'Pollution Mitigation and Simulation using AI-Driven Environmental Modeling',
  publication: {
    conference: 'IEEE ICSCSA 2025',
    year: 2025,
    doi: '10.1109/ICSCSA66339.2025.11170787',
    url: 'https://doi.org/10.1109/ICSCSA66339.2025.11170787',
  },
  historicalRepository: 'https://github.com/dharmeshpriyadarshi/EcoSimulate',
  reconstructionYear: 2026,
} as const

export const navigation = [
  { label: 'Home', path: '/' },
  { label: 'Research', path: '/research' },
  { label: 'Simulator', path: '/simulator' },
  { label: 'Methodology', path: '/methodology' },
  { label: 'Continuity', path: '/continuity' },
] as const
