import type {
  SpatialMode,
} from '../spatial/adaptiveTypes'

export interface DescriptiveStatistics {
  count: number
  mean: number
  minimum: number
  maximum: number
  standardDeviation: number
}

export interface CellAnalysisRecord {
  cellId: string
  row: number
  column: number
  area: number
  latitude: number
  longitude: number
  deploymentCount: number
  deploymentDensity: number
  baseline: number
  intervention: number
  absoluteReduction: number
  percentageReduction: number | null
}

export interface RegionalStatistics {
  mode: SpatialMode
  unit: string

  totalCells: number
  configuredCells: number
  unconfiguredCells: number
  coveragePercentage: number

  totalArea: number
  configuredArea: number
  areaCoveragePercentage: number

  totalDeployment: number
  deploymentDensity: number | null

  baseline: DescriptiveStatistics | null
  intervention: DescriptiveStatistics | null
  reduction: DescriptiveStatistics | null

  relativeReduction: number | null

  improvedCells: number
  unchangedCells: number
  worsenedCells: number

  records: CellAnalysisRecord[]
}

export interface SensitivityPoint {
  deploymentCount: number
  baseline: number
  intervention: number
  absoluteReduction: number
  percentageReduction: number | null
}
