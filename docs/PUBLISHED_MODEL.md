# ECOSIMULATE - Published Pollution Index Model

## Provenance

This implementation reproduces the custom Pollution Index
equation described in the original ECOSIMULATE research,
published at IEEE ICSCSA 2025.

DOI: 10.1109/ICSCSA66339.2025.11170787

https://doi.org/10.1109/ICSCSA66339.2025.11170787

Primary reference: Section III (Methodology),
Section IV (Implementation), and Section V
(Results and Discussion) of the supplied research paper.

The model is reconstructed as a pure TypeScript function
for the 2026 static demonstration website.

## Mathematical equation

Raw Pollution Index:

PIraw = 0.3*T + 0.4*PM + 1.2*CO - 0.8*AT

The paper specifies an index constrained between 0 and 100.
The reconstruction implements these stated boundaries:

PI = max(0, min(100, PIraw))

Where:

- T: Temperature in degrees Celsius.
- PM: PM2.5 concentration in micrograms per cubic meter.
- CO: Carbon monoxide concentration in parts per million.
- AT: Number of artificial trees per reference grid.

The reference grid area is 23,000 square meters.

## Baseline and intervention

The baseline index is calculated using zero artificial trees.

The intervention index is calculated using the selected
artificial-tree count while retaining identical environmental
inputs.

Index reduction:

D = PIbaseline - PIintervention

Relative index reduction:

R = (D / PIbaseline) * 100

Relative reduction is undefined when the baseline index
equals zero.

The reduction represents a change in custom index points.
It is not a measured reduction in pollutant concentration.

## Boundary behaviour

Both raw and bounded index values are retained.

When the raw index exceeds 100, the bounded index saturates.
When the raw index falls below zero, the bounded index is zero.

Saturation can cause changes in artificial-tree deployment
to produce no change in the displayed bounded index.

## Scientific interpretation

The equation combines different environmental quantities
through assigned weighting coefficients.

The supplied research paper describes comparison against
recorded AQI data, but does not provide sufficient detailed
calibration evidence, error metrics, or field-validation
results to independently establish predictive accuracy.

This reconstruction therefore treats the equation as a
published custom index model rather than a calibrated
physical atmospheric model.

The Pollution Index must not be interpreted as official AQI.

No official AQI conversion is performed.

## Historical findings

Section V reports simulation findings for Delhi grids,
including baseline index values of 75 to 90, approximate
index reductions associated with artificial-tree deployment,
and a separate mitigation impact analysis table.

These are attributed historical research findings.

The reconstructed implementation does not independently
reproduce or validate the original experiments.

The custom PI equation alone cannot calculate individual
PM2.5 or NO2 concentration changes reported in Figure 5.

## Limitations

- No live environmental data acquisition.
- Hypothetical inputs rather than measured observations.
- No atmospheric transport or chemical modelling.
- No wind or humidity effects.
- No calibrated filtration performance measurements.
- Uniform artificial-tree contribution.
- Fixed spatial reference grid.
- No physical intervention timescale.
- No independently established predictive accuracy.

## Relationship to the secondary model

The exponential PM2.5 demonstration model introduced in
the 2026 reconstruction is mathematically independent.

It is not part of the original publication and is not
calibrated using the original reported findings.

Both models are presented separately.

## Testing

Automated unit tests verify formula implementation,
boundary handling, determinism, input validation and
calculation behaviour.

Passing software tests does not establish scientific
or real-world environmental validity.
