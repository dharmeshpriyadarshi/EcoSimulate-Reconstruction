# ECOSIMULATE â€” Demonstration Simulation Model

## Model status

Version: 1.0.0

Classification: Illustrative deterministic scenario model.

This model was introduced for the 2026 website reconstruction.
It does not reproduce or independently validate the experiments
reported in the original IEEE ICSCSA 2025 publication.

## Historical implementation audit

The historical public simulator contains a custom pollution
index using temperature, PM2.5 concentration, carbon monoxide
concentration and the number of artificial trees.

Its equation is:

P = clamp(0.3*T + 0.4*M + 1.2*C - 0.8*N, 0, 100)

The inspected frontend implementation does not establish
the scientific calibration of these coefficients.

The custom index must not be interpreted as an official AQI.

Historical source:

https://github.com/dharmeshpriyadarshi/EcoSimulate/blob/main/simulator.html

The supplied five-page research paper has subsequently been
reviewed and confirms the original Pollution Index equation
and reference grid area.

The original backend implementation and underlying
experimental datasets have not been independently verified.

A separate reconstruction of the published equation is
documented in PUBLISHED_MODEL.md.

## Reconstruction objectives

The reconstructed model aims to:

- Provide transparent scenario comparisons.
- Preserve PM2.5 concentration units.
- Represent diminishing marginal intervention effects.
- Prevent negative concentrations.
- Support reproducible and independently testable calculations.

## Inputs

| Parameter | Units | Minimum | Maximum | Default |
|-----------|-------|---------|---------|---------|
| Baseline PM2.5 | micrograms/m3 | 0 | 500 | 100 |
| Scenario area | m2 | 10000 | 100000 | 23000 |
| Filtration units | count | 0 | 125 | 25 |
| Intervention intensity | percent | 0 | 100 | 50 |

All inputs are hypothetical.

## Calculation logic

Let:

- C0 = baseline PM2.5 concentration
- C1 = illustrative intervention concentration
- N = number of filtration units
- I = intervention intensity percentage
- A = scenario area
- Aref = reference area of 23000 m2
- k = demonstration coefficient of 0.005

The dimensionless intervention score is:

S = k * N * (I / 100) * (Aref / A)

The illustrative intervention concentration is:

C1 = C0 * exp(-S)

Absolute concentration reduction:

D = C0 - C1

Percentage reduction for a positive baseline:

R = (D / C0) * 100

When C0 is zero, percentage reduction is undefined and
represented as null.

Filtration unit density:

Density = N / (A / 10000)

Density is expressed in units per hectare.

## Coefficient selection

The coefficient k = 0.005 is an arbitrary demonstration
scaling parameter selected to produce interpretable variations
within the configured input ranges.

It is not a measured filtration efficiency, calibrated removal
rate or experimentally estimated physical coefficient.

The reference area preserves a scenario size present in the
historical implementation.

## Model assumptions

1. The baseline concentration is spatially uniform.
2. Filtration units are treated as identical hypothetical units.
3. Intervention intensity is a dimensionless scaling control.
4. Intervention strength scales with relative unit density.
5. Diminishing marginal reductions are imposed by the chosen
   mathematical formulation.
6. No specific intervention duration is represented.
7. Environmental conditions remain unspecified.

These assumptions are mathematical simplifications rather
than verified descriptions of atmospheric processes.

## Limitations

The model does not incorporate:

- Measured environmental observations.
- Atmospheric dispersion or transport.
- Wind speed or direction.
- Mixing height or atmospheric volume.
- Continuous pollutant emissions.
- Filtration airflow or clean-air delivery rates.
- Real device performance measurements.
- Meteorological variation.
- Chemical transformations.
- Parameter calibration or uncertainty estimation.

Area alone does not describe the atmospheric volume required
for physically realistic concentration modelling.

The output is not a forecast, measured pollution reduction,
validated device performance estimate or health-impact estimate.

No AQI conversion is performed.

## Reproducibility

The simulation engine is implemented as a pure TypeScript
function without randomness or external dependencies.

Automated tests cover calculation correctness, reproducibility,
input validation, boundary behaviour and mathematical
properties of the chosen model.

Passing these tests establishes software correctness against
the specified mathematical model, not scientific validity.

## Original publication

ECOSIMULATE â€” Pollution Mitigation and Simulation using
AI-Driven Environmental Modeling.

IEEE ICSCSA 2025.

DOI: 10.1109/ICSCSA66339.2025.11170787

https://doi.org/10.1109/ICSCSA66339.2025.11170787
