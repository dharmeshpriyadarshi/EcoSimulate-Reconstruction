import type {
  CellScenario,
} from '../../features/spatial/scenarioTypes'

interface EquationBreakdownProps {
  scenario?: CellScenario
}

export default function EquationBreakdown({
  scenario,
}: EquationBreakdownProps) {
  if (!scenario) {
    return (
      <section className="advanced-analysis-panel">
        <p className="eyebrow">
          06 / Mathematical interpretation
        </p>

        <h3>Inside the calculation.</h3>

        <div className="analytics-empty">
          Select a configured cell to inspect
          its mathematical contributions.
        </div>
      </section>
    )
  }

  const cellLabel = scenario.cellId
    .split('-')
    .slice(-2)
    .join('-')
    .toUpperCase()

  const research = scenario.mode === 'research'

  const contributions =
    scenario.mode === 'research'
      ? [
          {
            label: 'Temperature contribution',
            expression: `0.3 × ${scenario.inputs.temperature}`,
            value: scenario.result.contributions.temperature,
          },
          {
            label: 'PM2.5 contribution',
            expression: `0.4 × ${scenario.inputs.pm25}`,
            value: scenario.result.contributions.pm25,
          },
          {
            label: 'CO contribution',
            expression: `1.2 × ${scenario.inputs.carbonMonoxide}`,
            value: scenario.result.contributions.carbonMonoxide,
          },
          {
            label: 'Artificial-tree contribution',
            expression: `-0.8 × ${scenario.inputs.artificialTrees}`,
            value: scenario.result.contributions.artificialTrees,
          },
        ]
      : [
          {
            label: 'Baseline concentration',
            expression: 'C₀',
            value: scenario.inputs.baselinePm25,
          },
          {
            label: 'Filtration units',
            expression: 'N',
            value: scenario.inputs.filtrationUnits,
          },
          {
            label: 'Normalized intensity',
            expression: 'I / 100',
            value: scenario.inputs.interventionIntensity / 100,
          },
          {
            label: 'Reference-area ratio',
            expression: '23000 / A',
            value: 23000 / scenario.inputs.area,
          },
          {
            label: 'Intervention score',
            expression: 'S',
            value: scenario.result.interventionScore,
          },
        ]

  return (
    <section className="advanced-analysis-panel">
      <p className="eyebrow">
        06 / Mathematical interpretation
      </p>

      <h3>Inside the calculation.</h3>

      <p className="analytics-description">
        {cellLabel} — intermediate mathematical
        values from the applied scenario.
      </p>

      <div className="equation-display">
        {research
          ? 'PI = clamp(0.3T + 0.4PM + 1.2CO − 0.8AT, 0, 100)'
          : 'S = 0.005 × N × (I / 100) × (23000 / A)'}
      </div>

      {!research && (
        <div className="equation-display">
          C₁ = C₀ × exp(−S)
        </div>
      )}

      <div className="analytics-table-scroll">
        <table className="analytics-table equation-table">
          <thead>
            <tr>
              <th scope="col">Component</th>
              <th scope="col">Expression</th>
              <th scope="col">Value</th>
            </tr>
          </thead>

          <tbody>
            {contributions.map((item) => (
              <tr key={item.label}>
                <th scope="row">{item.label}</th>
                <td>{item.expression}</td>
                <td>
                  {item.value.toFixed(research ? 2 : 4)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {scenario.mode === 'research' ? (
        <div className="equation-results">
          <div>
            <span>Raw baseline index</span>
            <strong>
              {scenario.result.rawBaselineIndex.toFixed(2)}
            </strong>
          </div>

          <div>
            <span>Raw intervention index</span>
            <strong>
              {scenario.result.rawInterventionIndex.toFixed(2)}
            </strong>
          </div>

          <div>
            <span>Bounded intervention index</span>
            <strong>
              {scenario.result.interventionIndex.toFixed(2)}
            </strong>
          </div>
        </div>
      ) : (
        <div className="equation-results">
          <div>
            <span>Nominal cell area</span>
            <strong>
              {scenario.inputs.area.toFixed(2)} m²
            </strong>
          </div>

          <div>
            <span>Intervention multiplier</span>
            <strong>
              {Math.exp(
                -scenario.result.interventionScore,
              ).toFixed(4)}
            </strong>
          </div>

          <div>
            <span>Intervention concentration</span>
            <strong>
              {scenario.result.interventionPm25.toFixed(2)}
              {' '}µg/m³
            </strong>
          </div>
        </div>
      )}

      <p className="analytics-description">
        {research
          ? 'The index is bounded between 0 and 100. These mathematical contributions are not independently measured physical effects.'
          : 'The demonstration coefficient and area-dependent exponential model are illustrative, not empirically calibrated.'}
      </p>
    </section>
  )
}
