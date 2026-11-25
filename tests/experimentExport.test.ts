import { describe, expect, it } from 'vitest'

import {
  createExperimentExport,
  createExportFilename,
  serializeExperimentCsv,
  serializeExperimentJson,
  escapeCsvValue,
} from '../src/features/export/experimentExport'

import {
  generateSpatialGrid,
  generateGridForArea,
} from '../src/features/spatial/grid'

import {
  DEFAULT_LOCATION,
} from '../src/features/spatial/cities'

import {
  saveCellScenario,
} from '../src/features/spatial/scenarios'

const cells =
  generateSpatialGrid(DEFAULT_LOCATION)

const selected = cells[24]!

const timestamp =
  '2026-11-25T15:30:00.000Z'

const scenarios = saveCellScenario(
  {},
  selected,
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

function createResearchExport() {
  return createExperimentExport(
    DEFAULT_LOCATION.name,
    'research',
    cells,
    scenarios,
    timestamp,
  )
}

describe('ECOSIMULATE experiment exports', () => {
  it('preserves model and schema metadata', () => {
    const result = createResearchExport()

    expect(result.schemaVersion).toBe('1.0.0')
    expect(result.model.mode).toBe('research')
    expect(result.model.outputUnit).toBe('PI points')
    expect(result.exportedAt).toBe(timestamp)
  })

  it('preserves the complete geographical grid', () => {
    const result = createResearchExport()

    expect(
      result.spatialFramework.cells,
    ).toHaveLength(49)

    expect(
      result.spatialFramework.totalNominalArea,
    ).toBe(1127000)
  })

  it('distinguishes configured and unconfigured cells', () => {
    const result = createResearchExport()

    const configured =
      result.spatialFramework.cells.filter(
        (cell) => cell.scenario !== null,
      )

    expect(configured).toHaveLength(1)

    expect(configured[0]?.id)
      .toBe(selected.id)

    expect(result.statistics.configuredCells)
      .toBe(1)
  })

  it('preserves calculated results during JSON serialization', () => {
    const result = createResearchExport()

    const parsed = JSON.parse(
      serializeExperimentJson(result),
    )

    expect(parsed).toEqual(result)
    expect(parsed.statistics.baseline.mean)
      .toBe(55)

    expect(parsed.statistics.intervention.mean)
      .toBe(35)
  })

  it('exports only configured cells in CSV', () => {
    const csv = serializeExperimentCsv(
      createResearchExport(),
    )

    const lines = csv.trim().split('\r\n')

    expect(lines).toHaveLength(2)

    expect(lines[0])
      .toContain('baseline_output')

    expect(lines[1])
      .toContain(selected.id)

    expect(lines[1])
      .toContain('PI points')
  })

  it('preserves adaptive inputs and output units', () => {
    const cell = generateGridForArea(
      DEFAULT_LOCATION,
      50000,
    )[0]!

    const store = saveCellScenario(
      {},
      cell,
      {
        mode: 'adaptive',
        inputs: {
          baselinePm25: 100,
          filtrationUnits: 25,
          interventionIntensity: 50,
        },
      },
    )

    const result = createExperimentExport(
      DEFAULT_LOCATION.name,
      'adaptive',
      [cell],
      store,
      timestamp,
    )

    expect(result.model.outputUnit)
      .toBe('µg/m³')

    expect(result.statistics.deploymentDensity)
      .toBe(5)

    expect(
      result.spatialFramework.cells[0]?.scenario,
    ).toEqual(store[cell.id])

    expect(serializeExperimentCsv(result))
      .toContain('µg/m³')
  })

  it('rejects experiments without configured cells', () => {
    expect(() =>
      createExperimentExport(
        DEFAULT_LOCATION.name,
        'research',
        cells,
        {},
        timestamp,
      ),
    ).toThrow()
  })

  it('escapes CSV special characters and formula strings', () => {
    expect(escapeCsvValue('Delhi, India'))
      .toBe('"Delhi, India"')

    expect(escapeCsvValue('a"b'))
      .toBe('"a""b"')

    expect(escapeCsvValue(null))
      .toBe('')

    expect(escapeCsvValue('=1+1'))
      .toBe("'=1+1")

    expect(escapeCsvValue(-20))
      .toBe('-20')
  })

  it('generates identifiable export filenames', () => {
    const result = createResearchExport()

    expect(
      createExportFilename(result, 'csv'),
    ).toBe(
      'ecosimulate-delhi-research-20261125153000000.csv',
    )

    expect(
      createExportFilename(result, 'json'),
    ).toBe(
      'ecosimulate-delhi-research-20261125153000000.json',
    )
  })

  it('includes scientific limitations and provenance', () => {
    const result = createResearchExport()

    expect(
      result.provenance.geographicalContext,
    ).toBe('OpenStreetMap')

    expect(
      result.provenance.limitations.length,
    ).toBeGreaterThan(0)

    expect(
      result.provenance.outputType,
    ).toBe('Deterministic simulation')
  })
})
