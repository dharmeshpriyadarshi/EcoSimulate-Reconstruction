import type {
  DescriptiveStatistics,
} from './types'

export function calculateDescriptiveStatistics(
  values: readonly number[],
): DescriptiveStatistics | null {
  if (values.length === 0) {
    return null
  }

  if (values.some((value) => !Number.isFinite(value))) {
    throw new RangeError(
      'Statistical inputs must be finite numbers.',
    )
  }

  const count = values.length

  const mean =
    values.reduce(
      (sum, value) => sum + value,
      0,
    ) / count

  const variance =
    values.reduce(
      (sum, value) =>
        sum + (value - mean) ** 2,
      0,
    ) / count

  return {
    count,
    mean,
    minimum: Math.min(...values),
    maximum: Math.max(...values),
    standardDeviation: Math.sqrt(variance),
  }
}
