import type {
  CellScenario,
} from '../../features/spatial/scenarioTypes'

interface CellScenarioResultsProps {
  scenario: CellScenario
}

function formatPercentage(
  value: number | null,
): string {
  return value === null
    ? 'N/A'
    : `${value.toFixed(2)}%`
}

export default function CellScenarioResults({
  scenario,
}: CellScenarioResultsProps) {
  const research =
    scenario.mode === 'research'

  const baseline =
    scenario.mode === 'research'
      ? scenario.result.baselineIndex
      : scenario.result.baselinePm25

  const intervention =
    scenario.mode === 'research'
      ? scenario.result.interventionIndex
      : scenario.result.interventionPm25

  const difference =
    scenario.mode === 'research'
      ? scenario.result.indexReduction
      : scenario.result.absoluteReduction

  const percentage =
    scenario.result.percentageReduction

  const unit =
    research ? 'PI points' : 'µg/m³'

  return (
    <section
      className="cell-scenario-results"
      aria-label="Applied scenario results"
    >
      <p className="eyebrow">
        Applied scenario results
      </p>

      <div className="scenario-result-grid">
        <div className="scenario-result">
          <span>Baseline</span>
          <strong>{baseline.toFixed(2)}</strong>
          <small>{unit}</small>
        </div>

        <div className="scenario-result">
          <span>Intervention</span>
          <strong>{intervention.toFixed(2)}</strong>
          <small>{unit}</small>
        </div>

        <div className="scenario-result">
          <span>Absolute difference</span>
          <strong>{difference.toFixed(2)}</strong>
          <small>{unit}</small>
        </div>

        <div className="scenario-result">
          <span>Relative reduction</span>
          <strong>
            {formatPercentage(percentage)}
          </strong>
        </div>
      </div>

      {scenario.mode === 'research' &&
        (
          scenario.result.baselineClamped ||
          scenario.result.interventionClamped
        ) && (
          <p className="scenario-boundary-notice">
            The published index boundaries have
            been applied. Raw values may exceed
            the displayed 0-100 range.
          </p>
        )}

      {scenario.mode === 'adaptive' && (
        <div className="scenario-area-reference">
          <span>Deployment density</span>

          <strong>
            {scenario.result.unitsPerHectare.toFixed(2)}
            {' '}units/ha
          </strong>
        </div>
      )}

      <p className="scenario-editor-description">
        {research
          ? 'Custom Pollution Index, not official AQI.'
          : 'Illustrative concentration estimates, not calibrated physical predictions.'}
      </p>
    </section>
  )
}
