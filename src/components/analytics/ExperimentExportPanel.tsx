import { useState } from 'react'

import {
  Download,
  FileSpreadsheet,
  FileJson,
} from 'lucide-react'

import {
  createExperimentExport,
  createExportFilename,
  serializeExperimentCsv,
  serializeExperimentJson,
} from '../../features/export/experimentExport'

import {
  downloadTextFile,
} from '../../features/export/download'

import type {
  SpatialMode,
} from '../../features/spatial/adaptiveTypes'

import type {
  SpatialGridCell,
} from '../../features/spatial/types'

import type {
  ScenarioStore,
} from '../../features/spatial/scenarioTypes'

interface ExperimentExportPanelProps {
  locationName: string
  mode: SpatialMode
  cells: readonly SpatialGridCell[]
  scenarios: ScenarioStore
  configuredCells: number
}

export default function ExperimentExportPanel({
  locationName,
  mode,
  cells,
  scenarios,
  configuredCells,
}: ExperimentExportPanelProps) {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  function handleExport(
    format: 'csv' | 'json',
  ) {
    setError('')
    setMessage('')

    try {
      const experiment = createExperimentExport(
        locationName,
        mode,
        cells,
        scenarios,
        new Date().toISOString(),
      )

      const filename = createExportFilename(
        experiment,
        format,
      )

      const content = format === 'csv'
        ? serializeExperimentCsv(experiment)
        : serializeExperimentJson(experiment)

      const mimeType = format === 'csv'
        ? 'text/csv;charset=utf-8'
        : 'application/json;charset=utf-8'

      // UTF-8 BOM improves compatibility with Excel.
      const downloadableContent =
        format === 'csv'
          ? '\uFEFF' + content
          : content

      downloadTextFile(
        filename,
        downloadableContent,
        mimeType,
      )

      setMessage(
        `Download requested: ${filename}`,
      )
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : 'Unable to export the experiment.',
      )
    }
  }

  return (
    <section className="advanced-analysis-panel experiment-export">
      <p className="eyebrow">
        08 / Experimental reproducibility
      </p>

      <h3>Take the experiment further.</h3>

      <p className="analytics-description">
        Export the current applied geographical
        experiment for independent computational
        analysis and documentation.
      </p>

      <div className="experiment-export-summary">
        <span>{locationName}</span>

        <span>
          {mode === 'research'
            ? 'Published Pollution Index'
            : 'Illustrative PM2.5 model'}
        </span>

        <strong>
          {configuredCells} configured cells
        </strong>
      </div>

      <div className="experiment-export-grid">
        <article className="experiment-export-option">
          <FileSpreadsheet
            size={30}
            strokeWidth={1.3}
            aria-hidden="true"
          />

          <h4>Experimental dataset</h4>

          <p className="analytics-description">
            Cell-level environmental parameters,
            geographical coordinates, intervention
            configurations and calculated results.
            Compatible with spreadsheet and
            statistical analysis software.
          </p>

          <button
            type="button"
            className="workspace-button"
            disabled={configuredCells === 0}
            onClick={() => handleExport('csv')}
          >
            <Download size={15} />
            Download CSV
          </button>
        </article>

        <article className="experiment-export-option">
          <FileJson
            size={30}
            strokeWidth={1.3}
            aria-hidden="true"
          />

          <h4>Structured experiment</h4>

          <p className="analytics-description">
            Complete geographical configuration,
            applied scenarios, mathematical results,
            regional statistics and scientific
            provenance in machine-readable form.
          </p>

          <button
            type="button"
            className="workspace-button"
            disabled={configuredCells === 0}
            onClick={() => handleExport('json')}
          >
            <Download size={15} />
            Download JSON
          </button>
        </article>
      </div>

      {message && (
        <p
          className="export-success-message"
          role="status"
        >
          {message}
        </p>
      )}

      {error && (
        <p className="workspace-error" role="alert">
          {error}
        </p>
      )}

      <p className="analytics-description">
        Exports preserve numerical precision.
        Only applied configurations are included.
        No live environmental measurements or
        validated physical predictions are represented.
        Files are generated locally in your browser.
      </p>
    </section>
  )
}
