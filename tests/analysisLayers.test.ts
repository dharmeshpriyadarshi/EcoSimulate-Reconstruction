import { describe, expect, it } from 'vitest'

import {
  getAnalysisLayers,
  getDeploymentCount,
  getLayerValue,
  getLayerColor,
  LAYER_PALETTES,
} from '../src/features/spatial/analysisLayers'

import {
  calculateCellScenario,
} from '../src/features/spatial/scenarios'

import {
  generateSpatialGrid,
  generateGridForArea,
} from '../src/features/spatial/grid'

import {
  DEFAULT_LOCATION,
} from '../src/features/spatial/cities'

describe('ECOSIMULATE analytical map layers', () => {
  const researchCell =
    generateSpatialGrid(DEFAULT_LOCATION)[0]!

  const adaptiveCell =
    generateGridForArea(DEFAULT_LOCATION, 50000)[0]!

  const researchScenario = calculateCellScenario(
    researchCell,
    {
      mode: 'research',
      inputs: {
        temperature: 30,
        pm25: 100,
        carbonMonoxide: 5,
        artificialTrees: 25,
      },
    },
  )

  const adaptiveScenario = calculateCellScenario(
    adaptiveCell,
    {
      mode: 'adaptive',
      inputs: {
        baselinePm25: 100,
        filtrationUnits: 25,
        interventionIntensity: 50,
      },
    },
  )

  it('exposes the correct research layers', () => {
    const layers = getAnalysisLayers('research')

    expect(layers.map((layer) => layer.id)).toEqual([
      'baseline',
      'intervention',
      'difference',
      'pm25',
      'density',
      'temperature',
      'carbonMonoxide',
    ])
  })

  it('exposes the correct adaptive layers', () => {
    const layers = getAnalysisLayers('adaptive')

    expect(layers.map((layer) => layer.id)).toEqual([
      'baseline',
      'intervention',
      'difference',
      'pm25',
      'density',
      'intensity',
    ])
  })

  it('uses correct model-specific output units', () => {
    const research = getAnalysisLayers('research')
    const adaptive = getAnalysisLayers('adaptive')

    expect(research[0]!.unit).toBe('PI points')
    expect(adaptive[0]!.unit).toBe('µg/m³')
  })

  it('returns the published baseline index', () => {
    expect(
      getLayerValue(researchScenario, 'baseline'),
    ).toBeCloseTo(55)
  })

  it('returns the published intervention index', () => {
    expect(
      getLayerValue(researchScenario, 'intervention'),
    ).toBeCloseTo(35)
  })

  it('returns the published index difference', () => {
    expect(
      getLayerValue(researchScenario, 'difference'),
    ).toBeCloseTo(20)
  })

  it('returns the configured temperature', () => {
    expect(
      getLayerValue(researchScenario, 'temperature'),
    ).toBe(30)
  })

  it('returns the configured PM2.5 concentration', () => {
    expect(
      getLayerValue(researchScenario, 'pm25'),
    ).toBe(100)
  })

  it('returns the configured carbon monoxide level', () => {
    expect(
      getLayerValue(researchScenario, 'carbonMonoxide'),
    ).toBe(5)
  })

  it('calculates published deployment density', () => {
    expect(
      getLayerValue(researchScenario, 'density'),
    ).toBeCloseTo(25 / 2.3)
  })

  it('returns adaptive baseline concentration', () => {
    expect(
      getLayerValue(adaptiveScenario, 'baseline'),
    ).toBe(100)
  })

  it('returns adaptive intervention concentration', () => {
    const expected =
      100 * Math.exp(-0.005 * 25 * 0.5 * 23000 / 50000)

    expect(
      getLayerValue(adaptiveScenario, 'intervention'),
    ).toBeCloseTo(expected)
  })

  it('returns adaptive deployment density', () => {
    expect(
      getLayerValue(adaptiveScenario, 'density'),
    ).toBe(5)
  })

  it('returns adaptive intervention intensity', () => {
    expect(
      getLayerValue(adaptiveScenario, 'intensity'),
    ).toBe(50)
  })

  it('rejects incompatible model layers', () => {
    expect(
      getLayerValue(adaptiveScenario, 'temperature'),
    ).toBeNull()

    expect(
      getLayerValue(adaptiveScenario, 'carbonMonoxide'),
    ).toBeNull()

    expect(
      getLayerValue(researchScenario, 'intensity'),
    ).toBeNull()
  })

  it('returns deployment counts for both models', () => {
    expect(getDeploymentCount(researchScenario)).toBe(25)
    expect(getDeploymentCount(adaptiveScenario)).toBe(25)
  })

  it('assigns the lowest color at zero', () => {
    const layer = getAnalysisLayers('research')[0]!

    expect(getLayerColor(0, layer)).toBe(
      LAYER_PALETTES.severity[0],
    )
  })

  it('assigns the highest color at maximum', () => {
    const layer = getAnalysisLayers('research')[0]!

    expect(getLayerColor(100, layer)).toBe(
      LAYER_PALETTES.severity[4],
    )
  })

  it('handles values outside visualization bounds', () => {
    const layer = getAnalysisLayers('research')[0]!

    expect(getLayerColor(-10, layer)).toBe(
      LAYER_PALETTES.severity[0],
    )

    expect(getLayerColor(150, layer)).toBe(
      LAYER_PALETTES.severity[4],
    )
  })

  it('uses the correct palette for each layer', () => {
    for (const mode of ['research', 'adaptive'] as const) {
      const layers = getAnalysisLayers(mode)

      for (const layer of layers) {
        const color = getLayerColor(
          layer.max / 2,
          layer,
        )

        expect(
          LAYER_PALETTES[layer.palette],
        ).toContain(color)
      }
    }
  })
})
