# ECOSIMULATE Spatial Framework

## Purpose

The spatial framework provides a geographical environment
for hypothetical pollution mitigation experiments.

It is inspired by the approximately 23,000 square metre
reference grids described in the original ECOSIMULATE paper.

## Study locations

- Delhi
- Mumbai
- Hyderabad
- Chennai
- Pune
- Munnar
- Manali

Reference coordinates are approximate location centers
selected for geographical navigation.

They are not verified original research sampling locations.

## Grid specification

- Rows: 7
- Columns: 7
- Cells per location: 49
- Nominal cell area: 23,000 square metres
- Approximate cell side: 151.66 metres
- Total nominal study area: 1.127 square kilometres

Each cell has a stable identifier, geographical center,
bounding coordinates and nominal metric dimensions.

## Coordinate calculation

Metric offsets are converted into latitude and longitude
using a local spherical-Earth approximation.

Longitude offsets account for the cosine of the reference
latitude.

Approximate cell areas are independently evaluated using
the spherical surface area formula for latitude-longitude
rectangles.

Automated tests verify cell continuity, identifier uniqueness,
determinism and approximate area preservation.

## Basemap

OpenStreetMap provides geographical context.

https://www.openstreetmap.org/copyright

The basemap requires internet access and is subject to
the tile provider's usage policy.

https://operations.osmfoundation.org/policies/tiles/

## Scientific limitations

Grid boundaries are synthetically generated.

They are not surveyed parcels, observed pollution hotspots,
verified artificial-tree installations or historical
research grid coordinates.

The spatial model does not account for terrain elevation,
atmospheric volume, land ownership, physical installation
constraints or atmospheric transport.

Geographical context must be distinguished from hypothetical
environmental inputs and deterministic simulation outputs.

## Adaptive spatial exploration

The reconstruction supports a secondary spatial mode in
which the nominal cell area depends on map zoom and
viewport latitude.

Approximate ground resolution:

r = (2 * pi * R * cos(latitude)) / (256 * 2^zoom)

R is the Web Mercator reference radius of 6,378,137 metres.

Each cell has a target visual side length of 48 pixels.

Nominal cell side:

L = 48 * r

Nominal cell area:

A = L^2

The adaptive configuration is restricted to nominal cell
areas between 10,000 and 100,000 square metres, matching
the supported illustrative PM2.5 simulation inputs.

Unsupported configurations do not display study cells.

The application supports fractional zoom increments to
allow more flexible spatial resolution.

## Study region locking

Before locking, adaptive cell geometry follows changes
in the map viewport.

Locking captures the geographical center, zoom and
nominal cell area. Subsequent map navigation does not
modify the locked geographical boundaries.

Unlocking returns the application to viewport-dependent
configuration.

Research grid mode retains fixed geographical cells
of approximately 23,000 square metres.

The adaptive framework is an extension introduced for
the reconstruction and is not part of the published
2025 mathematical model.

The approximation is intended for small study regions.
Polar and antimeridian-adjacent configurations are
excluded by conservative geographical guards.
