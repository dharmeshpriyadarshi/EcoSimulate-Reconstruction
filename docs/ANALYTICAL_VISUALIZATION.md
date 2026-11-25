# ECOSIMULATE Analytical Visualization Framework

## Analytical layers

Research grid mode supports:

- Baseline Pollution Index.
- Intervention Pollution Index.
- Absolute Pollution Index difference.
- Input PM2.5 concentration.
- Input temperature.
- Input carbon monoxide concentration.
- Artificial-tree deployment density.

Adaptive exploration mode supports:

- Baseline PM2.5 concentration.
- Illustrative intervention PM2.5 concentration.
- Absolute concentration difference.
- Input PM2.5 concentration.
- Artificial-tree deployment density.
- Hypothetical intervention intensity.

## Visualization

Analytical colors use five discrete numerical bands.

These colors do not represent official AQI classifications,
regulatory thresholds or validated health-risk categories.

Unconfigured cells remain visually neutral.

Threshold filtering affects visualization only and does
not modify stored scenarios or mathematical results.

## Deployment markers

Aggregate markers represent hypothetical artificial-tree
deployments within geographical cells.

Marker radius increases with deployment count.

These markers do not represent verified installation
coordinates.

## Scenario management

Applied scenarios are associated with stable geographical
cell identifiers and stored in application memory.

Unapplied changes are discarded when switching cells.
Refreshing or leaving the simulator may discard experiments.

## Scientific limitations

The geographical basemap is provided by OpenStreetMap.

Environmental inputs are hypothetical, study boundaries
are computationally generated, and model outputs are
deterministic calculations.

No live pollution measurements, atmospheric transport,
cross-cell dispersion or independently validated physical
predictions are represented.

## Verification

Automated tests verify analytical layer availability,
model-specific units, numerical value extraction,
deployment counts and color mapping.

Software correctness does not establish scientific validity.
