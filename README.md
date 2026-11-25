# ECOSIMULATE

**Live website:** [ECOSIMULATE Research Demonstrator](https://ecosimulate-reconstruction.vercel.app/)

### Pollution Mitigation and Simulation using AI-Driven Environmental Modeling

An interactive environmental research demonstrator exploring
hypothetical pollution mitigation through mathematical modelling,
geographical experimentation and scientific visualization.

## Research foundation

ECOSIMULATE originates from research published at the 2025
5th International Conference on Soft Computing for Security
Applications (IEEE ICSCSA).

- [IEEE Publication](https://doi.org/10.1109/ICSCSA66339.2025.11170787)
- DOI: 10.1109/ICSCSA66339.2025.11170787
- [Original Research Repository](https://github.com/dharmeshpriyadarshi/EcoSimulate)

This repository represents a 2026 software reconstruction.
It preserves the original research direction while introducing
a modern experimental interface, additional analytical
capabilities and explicit scientific documentation.

It is not the original published software implementation.

## Scientific framework

The application provides two distinct mathematical models.

### Research Grid Mode

Reconstructs the custom Pollution Index formulation described
in the original publication:

PI_raw = 0.3T + 0.4PM + 1.2CO - 0.8AT

PI = max(0, min(100, PI_raw))

The geographical framework preserves the nominal reference
cell area of 23,000 square metres.

### Adaptive Exploration Mode

Introduces an independent illustrative PM2.5 response model:

S = 0.005 * N * (I / 100) * (23000 / A)

C1 = C0 * exp(-S)

This model is a reconstruction extension. It is not an
equation published in the original ECOSIMULATE study.

Its coefficients are illustrative rather than empirically
calibrated physical filtration parameters.

## Features

- Interactive geographical simulation across seven Indian locations.
- Fixed and adaptive spatial grid frameworks.
- Geographical region locking.
- Individual cell and regional intervention configuration.
- Selective intervention application and overwrite protection.
- Environmental parameter controls.
- Analytical map layers and deployment visualization.
- Regional descriptive statistics.
- Baseline and intervention comparison charts.
- Deployment sensitivity analysis.
- Mathematical equation breakdowns.
- CSV and JSON experimental data exports.
- Scientific methodology and research documentation.
- Responsive editorial website architecture.
- Route-based code splitting and deferred analytical loading.

## Study locations

Delhi, Mumbai, Hyderabad, Chennai, Pune, Munnar and Manali.

The geographical basemap provides spatial context.
Environmental inputs are hypothetical and user-configured.

## Website structure

| Route | Purpose |
| --- | --- |
| / | Environmental context and research motivation |
| /research | Published research overview |
| /simulator | Interactive experimental workspace |
| /methodology | Mathematical and scientific reference |
| /continuity | Research progression toward Veridian |

## Technology stack

| Component | Technology |
| --- | --- |
| Application | React |
| Programming language | TypeScript |
| Build system | Vite |
| Geospatial visualization | Leaflet and React Leaflet |
| Scientific charts | Recharts |
| Navigation | React Router |
| Icons | Lucide |
| Styling | CSS |
| Automated testing | Vitest |
| Static analysis | ESLint |
| Version control | Git |

The application is client-side and does not require a
backend service, database, authentication system or private
environmental API credentials.

An internet connection is required for external basemap tiles.

## Local development

Recommended development environment: Node.js 24.14.1 and npm 11.11.0.

Install dependencies:

    npm ci

Start the development server:

    npm run dev

Run automated tests:

    npm run test

Run static analysis:

    npm run lint

Create a production build:

    npm run build

Preview the production build:

    npm run preview

## Engineering architecture

    src/
      assets/
      components/
      config/
      features/
        analytics/
        export/
        simulator/
        spatial/
      pages/
      sections/
      styles/

    docs/
    tests/

Mathematical modelling, spatial calculations, statistical
analysis and experimental serialization are separated from
presentation components.

## Engineering verification

The local development baseline recorded on November 25, 2026:

- 146 automated tests across nine test suites.
- Successful TypeScript compilation.
- Successful ESLint verification.
- Successful production build.
- No production bundle-size warnings.

The route-based optimization reduced the initial JavaScript
bundle from approximately 957 kB to 278 kB.

Bundle size reduction does not independently establish
measured browser loading-time improvements.

## Technical documentation

- [Published Pollution Index model](docs/PUBLISHED_MODEL.md)
- [Illustrative simulation model](docs/SIMULATION_MODEL.md)
- [Spatial framework](docs/SPATIAL_FRAMEWORK.md)
- [Analytical visualization](docs/ANALYTICAL_VISUALIZATION.md)
- [Experimental analysis](docs/EXPERIMENT_ANALYSIS.md)
- [Experimental exports](docs/EXPERIMENT_EXPORTS.md)
- [Performance optimization](docs/PERFORMANCE_OPTIMIZATION.md)
- [Image credits](docs/IMAGE_CREDITS.md)

## Scientific limitations

ECOSIMULATE is intended for computational exploration
and conceptual environmental experimentation.

- Environmental inputs are hypothetical.
- The custom Pollution Index is not official AQI.
- Intervention coefficients are not physically calibrated.
- Atmospheric transport and cross-cell interactions are
  not explicitly modelled.
- Simulation results are not validated pollution forecasts.
- Descriptive statistics do not establish causal effects
  or measurement uncertainty.
- Deployment feasibility requires independent engineering
  investigation and field validation.

The application must not be used as a regulatory,
public-health or operational deployment decision system.

## Current software limitations

- Experimental configurations are stored in application memory.
- Exported experiments cannot currently be imported.
- No dedicated recovery interface exists for failed
  dynamically loaded application modules.
- External basemap availability depends on its provider.

## Research continuity

ECOSIMULATE forms part of a broader environmental research
direction that subsequently developed into Veridian, a
separate investigation of multi-city AQI forecasting,
machine learning evaluation and data-leakage safeguards.

Veridian's research manuscript is in preparation.

Its findings are not contributions of the original
ECOSIMULATE publication.

## Attribution

The original publication, historical implementation and
third-party assets retain their respective attribution
and rights.

External imagery is documented in the image credits file.

No redistribution of the published IEEE paper is intended
through this repository.
