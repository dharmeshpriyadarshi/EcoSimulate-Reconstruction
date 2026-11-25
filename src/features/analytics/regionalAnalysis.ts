import {
  calculateDescriptiveStatistics,
} from './statistics'

import type {
  SpatialMode,
} from '../spatial/adaptiveTypes'

import type {
  SpatialGridCell,
} from '../spatial/types'

import type {
  ScenarioStore,
} from '../spatial/scenarioTypes'

import type {
  CellAnalysisRecord,
  RegionalStatistics,
} from './types'

const COMPARISON_TOLERANCE = 1e-9

export function createCellAnalysisRecords(
  cells: readonly SpatialGridCell[],
  scenarios: ScenarioStore,
  mode: SpatialMode,
): CellAnalysisRecord[] {
  const records: CellAnalysisRecord[] = []

  for (const cell of cells) {
    const scenario = scenarios[cell.id]

    if (!scenario) {
      continue
    }

    if (scenario.mode !== mode) {
      throw new Error(
        `Scenario mode mismatch for cell ${cell.id}.`,
      )
    }

    if (
      !Number.isFinite(cell.area) ||
      cell.area <= 0
    ) {
      throw new RangeError(
        'Geographical cell area must be positive.',
      )
    }

    const common = {
      cellId: cell.id,
      row: cell.row,
      column: cell.column,
      area: cell.area,
      latitude: cell.center.latitude,
      longitude: cell.center.longitude,
    }

    if (scenario.mode === 'research') {
      const count =
        scenario.inputs.artificialTrees

      records.push({
        ...common,
        deploymentCount: count,
        deploymentDensity:
          count / (cell.area / 10000),
        baseline: scenario.result.baselineIndex,
        intervention:
          scenario.result.interventionIndex,
        absoluteReduction:
          scenario.result.indexReduction,
        percentageReduction:
          scenario.result.percentageReduction,
      })

      continue
    }

    records.push({
      ...common,
      deploymentCount:
        scenario.inputs.filtrationUnits,
      deploymentDensity:
        scenario.result.unitsPerHectare,
      baseline:
        scenario.result.baselinePm25,
      intervention:
        scenario.result.interventionPm25,
      absoluteReduction:
        scenario.result.absoluteReduction,
      percentageReduction:
        scenario.result.percentageReduction,
    })
  }

  return records
}

export function calculateRegionalStatistics(
  cells: readonly SpatialGridCell[],
  scenarios: ScenarioStore,
  mode: SpatialMode,
): RegionalStatistics {
  const records = createCellAnalysisRecords(
    cells,
    scenarios,
    mode,
  )

  const totalCells = cells.length
  const configuredCells = records.length

  const totalArea = cells.reduce(
    (sum, cell) => sum + cell.area,
    0,
  )

  const configuredArea = records.reduce(
    (sum, record) => sum + record.area,
    0,
  )

  const totalDeployment = records.reduce(
    (sum, record) =>
      sum + record.deploymentCount,
    0,
  )

  const baseline =
    calculateDescriptiveStatistics(
      records.map((record) => record.baseline),
    )

  const intervention =
    calculateDescriptiveStatistics(
      records.map(
        (record) => record.intervention,
      ),
    )

  const reduction =
    calculateDescriptiveStatistics(
      records.map(
        (record) => record.absoluteReduction,
      ),
    )

  const relativeReduction =
    baseline &&
    intervention &&
    baseline.mean > 0
      ? (
          (baseline.mean - intervention.mean) /
          baseline.mean
        ) * 100
      : null

  const improvedCells = records.filter(
    (record) =>
      record.absoluteReduction >
      COMPARISON_TOLERANCE,
  ).length

  const unchangedCells = records.filter(
    (record) =>
      Math.abs(record.absoluteReduction) <=
      COMPARISON_TOLERANCE,
  ).length

  const worsenedCells = records.filter(
    (record) =>
      record.absoluteReduction <
      -COMPARISON_TOLERANCE,
  ).length

  return {
    mode,
    unit:
      mode === 'research'
        ? 'PI points'
        : 'µg/m³',

    totalCells,
    configuredCells,
    unconfiguredCells:
      totalCells - configuredCells,

    coveragePercentage:
      totalCells > 0
        ? configuredCells / totalCells * 100
        : 0,

    totalArea,
    configuredArea,

    areaCoveragePercentage:
      totalArea > 0
        ? configuredArea / totalArea * 100
        : 0,

    totalDeployment,

    deploymentDensity:
      configuredArea > 0
        ? totalDeployment /
          (configuredArea / 10000)
        : null,

    baseline,
    intervention,
    reduction,
    relativeReduction,

    improvedCells,
    unchangedCells,
    worsenedCells,

    records,
  }
}
