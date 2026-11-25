# ECOSIMULATE Experimental Exports

## Export schema

Current schema version: 1.0.0.

The application supports CSV and JSON exports of the
currently active fixed or locked geographical experiment.

Only applied scenarios are exported as experimental data.
Unapplied editor adjustments are excluded.

## CSV format

CSV contains one row per configured geographical cell.

Columns include experiment metadata, cell identifiers,
geographical coordinates, geographical bounds, nominal area,
model-specific inputs, deployment counts, calculated results
and scientific limitations.

Inapplicable or undefined values are represented by empty
fields rather than artificial zero values.

CSV row and column indices are one-based.

Files use UTF-8 encoding with a byte order mark for spreadsheet
compatibility.

## JSON format

JSON preserves:

- Export schema version.
- Export timestamp in UTC.
- Reference location.
- Scientific model identification.
- Complete active geographical grid.
- Applied scenario inputs and mathematical results.
- Regional descriptive statistics.
- Geographical and scientific provenance.
- Scientific limitations.

JSON row and column indices retain the internal zero-based
representation.

Unconfigured cells contain a null scenario.

## Numerical precision

Exports preserve the numerical values returned by the
mathematical and analytical engines without display rounding.

## Scientific interpretation

Exported data represents hypothetical deterministic
experiments, not observed environmental measurements.

The published custom Pollution Index and the illustrative
PM2.5 model have different scientific interpretations.

Neither export establishes measured filtration effectiveness,
causal attribution or independently validated forecasts.

## Privacy and storage

Exports are generated entirely within the browser.

No experimental data is transmitted to an export server.

The export functionality does not introduce a database or
persistent application storage.

## Current limitations

The JSON format records an experiment but does not currently
support importing or restoring experiments into the interface.

Exports are limited to the active geographical study region.
Experiments stored in other regions are not included.
