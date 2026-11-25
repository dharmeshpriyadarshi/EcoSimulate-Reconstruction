import type { SpatialMode } from './adaptiveTypes'
import type { CellScenario } from './scenarioTypes'

export type AnalysisLayer =
  | 'baseline'
  | 'intervention'
  | 'difference'
  | 'temperature'
  | 'pm25'
  | 'carbonMonoxide'
  | 'density'
  | 'intensity'

export interface LayerDefinition {
  id: AnalysisLayer
  label: string
  unit: string
  max: number
  palette: 'severity' | 'reduction' | 'temperature' | 'density'
}

export function getAnalysisLayers(
  mode: SpatialMode,
): LayerDefinition[] {
  const research = mode === 'research'
  const unit = research ? 'PI points' : 'µg/m³'
  const max = research ? 100 : 500

  const layers: LayerDefinition[] = [
    {
      id: 'baseline',
      label: 'Baseline pollution',
      unit,
      max,
      palette: 'severity',
    },
    {
      id: 'intervention',
      label: 'Intervention pollution',
      unit,
      max,
      palette: 'severity',
    },
    {
      id: 'difference',
      label: 'Pollution reduction',
      unit,
      max,
      palette: 'reduction',
    },
    {
      id: 'pm25',
      label: 'Input PM2.5 concentration',
      unit: 'µg/m³',
      max: 500,
      palette: 'severity',
    },
    {
      id: 'density',
      label: 'Deployment density',
      unit: 'units/ha',
      max: research ? 125 / 2.3 : 125,
      palette: 'density',
    },
  ]

  if (research) {
    layers.push(
      {
        id: 'temperature',
        label: 'Temperature',
        unit: '°C',
        max: 50,
        palette: 'temperature',
      },
      {
        id: 'carbonMonoxide',
        label: 'Carbon monoxide',
        unit: 'ppm',
        max: 50,
        palette: 'severity',
      },
    )
  } else {
    layers.push({
      id: 'intensity',
      label: 'Intervention intensity',
      unit: '%',
      max: 100,
      palette: 'density',
    })
  }

  return layers
}

export function getDeploymentCount(
  scenario: CellScenario,
): number {
  return scenario.mode === 'research'
    ? scenario.inputs.artificialTrees
    : scenario.inputs.filtrationUnits
}

export function getLayerValue(
  scenario: CellScenario,
  layer: AnalysisLayer,
): number | null {
  if (scenario.mode === 'research') {
    switch (layer) {
      case 'baseline':
        return scenario.result.baselineIndex

      case 'intervention':
        return scenario.result.interventionIndex

      case 'difference':
        return scenario.result.indexReduction

      case 'temperature':
        return scenario.inputs.temperature

      case 'pm25':
        return scenario.inputs.pm25

      case 'carbonMonoxide':
        return scenario.inputs.carbonMonoxide

      case 'density':
        return scenario.inputs.artificialTrees /
          (scenario.result.gridArea / 10000)

      default:
        return null
    }
  }

  switch (layer) {
    case 'baseline':
      return scenario.result.baselinePm25

    case 'intervention':
      return scenario.result.interventionPm25

    case 'difference':
      return scenario.result.absoluteReduction

    case 'pm25':
      return scenario.inputs.baselinePm25

    case 'density':
      return scenario.result.unitsPerHectare

    case 'intensity':
      return scenario.inputs.interventionIntensity

    default:
      return null
  }
}

export const LAYER_PALETTES = {
  severity: [
    '#d4e2c5',
    '#9daf80',
    '#d6b56c',
    '#cc865d',
    '#a95549',
  ],
  reduction: [
    '#e7ebdf',
    '#c4d1b4',
    '#9eb58a',
    '#718f60',
    '#435e37',
  ],
  temperature: [
    '#b2cadb',
    '#a8c7bc',
    '#e0d5a2',
    '#d6a16a',
    '#b76550',
  ],
  density: [
    '#e4e9d9',
    '#c2d0b1',
    '#9eb38b',
    '#758e61',
    '#425c36',
  ],
} as const

export function getLayerColor(
  value: number,
  definition: LayerDefinition,
): string {
  const ratio = Math.max(
    0,
    Math.min(1, value / definition.max),
  )

  const palette =
    LAYER_PALETTES[definition.palette]

  const index = Math.min(
    palette.length - 1,
    Math.floor(ratio * palette.length),
  )

  return palette[index]!
}
