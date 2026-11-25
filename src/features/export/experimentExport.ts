import {
  calculateRegionalStatistics,
} from '../analytics/regionalAnalysis'

import type {
  SpatialMode,
} from '../spatial/adaptiveTypes'

import type {
  SpatialGridCell,
} from '../spatial/types'

import type {
  ScenarioStore,
} from '../spatial/scenarioTypes'

export const EXPORT_SCHEMA_VERSION = '1.0.0'

export const SCIENTIFIC_LIMITATIONS = [
  'Environmental inputs are hypothetical.',
  'Results are deterministic mathematical calculations.',
  'The custom Pollution Index is not official AQI.',
  'The illustrative PM2.5 model is not empirically calibrated.',
  'No atmospheric transport or cross-cell dispersion is represented.',
  'Deployment counts do not represent verified installations.',
]

export function createExperimentExport(
  locationName: string,
  mode: SpatialMode,
  cells: readonly SpatialGridCell[],
  scenarios: ScenarioStore,
  exportedAt: string,
) {
  const statistics = calculateRegionalStatistics(
    cells,
    scenarios,
    mode,
  )

  if (statistics.configuredCells === 0) {
    throw new Error(
      'At least one configured cell is required for export.',
    )
  }

  return {
    schemaVersion: EXPORT_SCHEMA_VERSION,
    application: 'ECOSIMULATE',
    exportedAt,

    referenceLocation: locationName,

    model: {
      mode,
      name: mode === 'research'
        ? 'Published Pollution Index'
        : 'Illustrative PM2.5 model',

      outputUnit: statistics.unit,

      publicationDoi:
        '10.1109/ICSCSA66339.2025.11170787',

      relationshipToPublication:
        mode === 'research'
          ? 'Reconstructed published model'
          : 'Illustrative reconstruction extension',
    },

    spatialFramework: {
      totalCells: statistics.totalCells,
      totalNominalArea: statistics.totalArea,

      cells: cells.map((cell) => ({
        id: cell.id,
        row: cell.row,
        column: cell.column,
        center: { ...cell.center },
        bounds: { ...cell.bounds },
        nominalArea: cell.area,
        sideLength: cell.sideLength,
        scenario: scenarios[cell.id] ?? null,
      })),
    },

    statistics,

    provenance: {
      geographicalContext: 'OpenStreetMap',
      environmentalInputs: 'Hypothetical user configuration',
      outputType: 'Deterministic simulation',
      limitations: [...SCIENTIFIC_LIMITATIONS],
    },
  }
}

export type ExperimentExport =
  ReturnType<typeof createExperimentExport>

export function serializeExperimentJson(
  experiment: ExperimentExport,
): string {
  return JSON.stringify(experiment, null, 2) + '\n'
}

export function escapeCsvValue(
  value: string | number | null | undefined,
): string {
  if (value === null || value === undefined) {
    return ''
  }

  let text = String(value)

  // Protect spreadsheet applications from interpreting
  // externally supplied strings as spreadsheet formulas.
  if (
    typeof value === 'string' &&
    /^[\s]*[=+\-@]/.test(text)
  ) {
    text = "'" + text
  }

  if (/[",\r\n]/.test(text)) {
    return '"' + text.replace(/"/g, '""') + '"'
  }

  return text
}

export function serializeExperimentCsv(
  experiment: ExperimentExport,
): string {
  const headers = [
    'schema_version',
    'exported_at',
    'reference_location',
    'model_mode',
    'model_name',
    'output_unit',
    'cell_id',
    'row',
    'column',
    'latitude',
    'longitude',
    'south',
    'west',
    'north',
    'east',
    'nominal_area_m2',
    'temperature_c',
    'baseline_pm25_ug_m3',
    'carbon_monoxide_ppm',
    'artificial_trees',
    'intervention_intensity_percent',
    'deployment_density_units_ha',
    'baseline_output',
    'intervention_output',
    'absolute_reduction',
    'relative_reduction_percent',
    'scientific_limitations',
  ]

  const rows = experiment.spatialFramework.cells.flatMap(
    (cell) => {
      const scenario = cell.scenario

      if (!scenario) {
        return []
      }

      const common = [
        experiment.schemaVersion,
        experiment.exportedAt,
        experiment.referenceLocation,
        experiment.model.mode,
        experiment.model.name,
        experiment.model.outputUnit,
        cell.id,
        cell.row + 1,
        cell.column + 1,
        cell.center.latitude,
        cell.center.longitude,
        cell.bounds.south,
        cell.bounds.west,
        cell.bounds.north,
        cell.bounds.east,
        cell.nominalArea,
      ]

      const limitations =
        experiment.provenance.limitations.join(' ')

      if (scenario.mode === 'research') {
        return [[
          ...common,
          scenario.inputs.temperature,
          scenario.inputs.pm25,
          scenario.inputs.carbonMonoxide,
          scenario.inputs.artificialTrees,
          null,
          scenario.inputs.artificialTrees /
            (cell.nominalArea / 10000),
          scenario.result.baselineIndex,
          scenario.result.interventionIndex,
          scenario.result.indexReduction,
          scenario.result.percentageReduction,
          limitations,
        ]]
      }

      return [[
        ...common,
        null,
        scenario.inputs.baselinePm25,
        null,
        scenario.inputs.filtrationUnits,
        scenario.inputs.interventionIntensity,
        scenario.result.unitsPerHectare,
        scenario.result.baselinePm25,
        scenario.result.interventionPm25,
        scenario.result.absoluteReduction,
        scenario.result.percentageReduction,
        limitations,
      ]]
    },
  )

  return [
    headers.map(escapeCsvValue).join(','),
    ...rows.map(
      (row) => row.map(escapeCsvValue).join(','),
    ),
  ].join('\r\n') + '\r\n'
}

export function createExportFilename(
  experiment: ExperimentExport,
  extension: 'csv' | 'json',
): string {
  const location = experiment.referenceLocation
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'study-region'

  const timestamp = experiment.exportedAt
    .replace(/[^0-9]/g, '')
    .slice(0, 17)

  return [
    'ecosimulate',
    location,
    experiment.model.mode,
    timestamp,
  ].join('-') + '.' + extension
}
