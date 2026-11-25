# ECOSIMULATE Performance Optimization

## Architecture

The application uses route-based code splitting through
React lazy loading and Suspense boundaries.

The home page and root application layout remain eagerly
loaded.

Research, methodology, continuity, simulator and not-found
pages are dynamically imported.

The scientific analytical workspace is conditionally loaded
after at least one environmental scenario has been applied
within a fixed or locked geographical region.

## Production build measurements

Measurements recorded on November 25, 2026.

Before optimization:

- Initial JavaScript: 957.16 kB.
- Initial JavaScript gzip: 279.27 kB.
- Initial CSS: 49.25 kB.

After optimization:

- Initial JavaScript: 278.26 kB.
- Initial JavaScript gzip: 88.58 kB.
- Initial CSS: 12.52 kB.
- Simulator JavaScript: 191.39 kB.
- Simulator CSS: 37.49 kB.
- Scientific analytics JavaScript: 488.62 kB.

The initial JavaScript bundle size decreased by approximately
70.93 percent.

The production build no longer reports chunks exceeding
the default 500 kB warning threshold.

## Accessibility

Loading states provide status messages and accessible
loading indicators.

Loading animations respect reduced-motion preferences.

## Interpretation

Code splitting reduces the initial loading burden rather
than eliminating the complete application download size.

Actual loading performance depends on browser caching,
network conditions, device capabilities and user navigation.

Bundle measurements are not equivalent to measured page
loading times or Core Web Vitals.

## Verification

All 146 automated tests pass.

TypeScript compilation, production bundling, ESLint and
Git whitespace validation complete successfully.

Browser network inspection is required to independently
confirm runtime chunk-loading behaviour.
