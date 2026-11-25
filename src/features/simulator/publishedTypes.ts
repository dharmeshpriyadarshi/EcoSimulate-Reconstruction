export interface PublishedModelInputs {
  temperature: number
  pm25: number
  carbonMonoxide: number
  artificialTrees: number
}

export interface PublishedModelResult {
  rawBaselineIndex: number
  rawInterventionIndex: number

  baselineIndex: number
  interventionIndex: number

  indexReduction: number
  percentageReduction: number | null

  baselineClamped: boolean
  interventionClamped: boolean

  gridArea: number

  contributions: {
    temperature: number
    pm25: number
    carbonMonoxide: number
    artificialTrees: number
  }
}
