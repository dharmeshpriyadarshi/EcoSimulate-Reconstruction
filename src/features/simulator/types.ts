export interface SimulationInputs {
  baselinePm25: number
  area: number
  filtrationUnits: number
  interventionIntensity: number
}

export interface SimulationResult {
  baselinePm25: number
  interventionPm25: number
  absoluteReduction: number
  percentageReduction: number | null
  interventionScore: number
  unitsPerHectare: number
}

export interface ParameterBounds {
  min: number
  max: number
  step: number
}
