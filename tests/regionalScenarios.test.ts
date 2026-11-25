import { describe, expect, it } from 'vitest'

import {
  DEFAULT_LOCATION,
  STUDY_LOCATIONS,
} from '../src/features/spatial/cities'

import {
  generateSpatialGrid,
} from '../src/features/spatial/grid'

import {
  applyRegionalScenario,
  getTargetCells,
  getEligibleCells,
  resetRegionalScenarios,
} from '../src/features/spatial/regionalScenarios'

import {
  saveCellScenario,
  createDefaultParameters,
} from '../src/features/spatial/scenarios'

describe('ECOSIMULATE regional interventions', () => {
  const cells = generateSpatialGrid(
    DEFAULT_LOCATION,
  )

  const selected = cells[24]!

  const parameters = {
    mode: 'research',
    inputs: {
      temperature: 30,
      pm25: 100,
      carbonMonoxide: 5,
      artificialTrees: 25,
    },
  } as const

  it('targets one selected cell', () => {
    expect(
      getTargetCells(cells, selected.id, 'selected'),
    ).toEqual([selected])
  })

  it('targets exactly seven cells in a row', () => {
    const targets = getTargetCells(
      cells, selected.id, 'row',
    )

    expect(targets).toHaveLength(7)

    expect(
      targets.every(
        (cell) => cell.row === selected.row,
      ),
    ).toBe(true)
  })

  it('targets exactly seven cells in a column', () => {
    const targets = getTargetCells(
      cells, selected.id, 'column',
    )

    expect(targets).toHaveLength(7)

    expect(
      targets.every(
        (cell) => cell.column === selected.column,
      ),
    ).toBe(true)
  })

  it('targets the entire study region', () => {
    expect(
      getTargetCells(cells, selected.id, 'all'),
    ).toHaveLength(49)
  })

  it('rejects selections outside the active grid', () => {
    expect(() =>
      getTargetCells(cells, 'unknown-cell', 'all'),
    ).toThrow(RangeError)
  })

  it('applies an intervention to all cells', () => {
    const store = applyRegionalScenario(
      {},
      cells,
      selected.id,
      'all',
      'replace',
      parameters,
    )

    expect(Object.keys(store)).toHaveLength(49)

    for (const scenario of Object.values(store)) {
      if (scenario.mode !== 'research') {
        throw new Error('Unexpected scenario mode.')
      }

      expect(scenario.inputs.artificialTrees).toBe(25)
      expect(scenario.result.baselineIndex).toBe(55)
      expect(scenario.result.interventionIndex).toBe(35)
    }
  })

  it('preserves existing configured cells', () => {
    const original = saveCellScenario(
      {},
      selected,
      createDefaultParameters('research'),
    )

    const updated = applyRegionalScenario(
      original,
      cells,
      selected.id,
      'all',
      'preserve',
      parameters,
    )

    expect(Object.keys(updated)).toHaveLength(49)

    expect(updated[selected.id]).toEqual(
      original[selected.id],
    )

    expect(
      getEligibleCells(original, cells, 'preserve'),
    ).toHaveLength(48)
  })

  it('replaces configured cells when authorized', () => {
    const original = saveCellScenario(
      {},
      selected,
      createDefaultParameters('research'),
    )

    const updated = applyRegionalScenario(
      original,
      cells,
      selected.id,
      'all',
      'replace',
      parameters,
    )

    expect(updated[selected.id]?.inputs).toEqual(
      parameters.inputs,
    )
  })

  it('does not mutate the existing scenario store', () => {
    const original = {}

    applyRegionalScenario(
      original,
      cells,
      selected.id,
      'all',
      'replace',
      parameters,
    )

    expect(original).toEqual({})
  })

  it('rejects invalid regional inputs without partial updates', () => {
    const original = {}

    expect(() =>
      applyRegionalScenario(
        original,
        cells,
        selected.id,
        'all',
        'replace',
        {
          ...parameters,
          inputs: {
            ...parameters.inputs,
            artificialTrees: 126,
          },
        },
      ),
    ).toThrow(RangeError)

    expect(original).toEqual({})
  })

  it('resets only the active geographical region', () => {
    const otherCell = generateSpatialGrid(
      STUDY_LOCATIONS[1]!,
    )[0]!

    const original = saveCellScenario(
      {},
      otherCell,
      parameters,
    )

    const populated = applyRegionalScenario(
      original,
      cells,
      selected.id,
      'all',
      'replace',
      parameters,
    )

    const reset = resetRegionalScenarios(
      populated,
      cells,
    )

    expect(Object.keys(reset)).toHaveLength(1)
    expect(reset[otherCell.id]).toBeDefined()
    expect(Object.keys(populated)).toHaveLength(50)
  })
})
