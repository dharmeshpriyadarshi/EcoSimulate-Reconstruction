import AnalysisControls from '../components/map/AnalysisControls'

import {
  getAnalysisLayers,
} from '../features/spatial/analysisLayers'

import type {
  AnalysisLayer,
} from '../features/spatial/analysisLayers'

import CellScenarioEditor from '../components/simulator/CellScenarioEditor'
import CellScenarioResults from '../components/simulator/CellScenarioResults'

import {
  calculateCellScenario,
  saveCellScenario,
  removeCellScenario,
  countConfiguredCells,
} from '../features/spatial/scenarios'

import type {
  ScenarioStore,
  CellScenarioParameters,
} from '../features/spatial/scenarioTypes'

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import {
  ArrowUpRight,
  LocateFixed,
  Maximize,
  Minimize,
  MapPin,
  Lock,
  LockOpen,
} from 'lucide-react'

import { Link } from 'react-router-dom'

import EnvironmentalMap from '../components/map/EnvironmentalMap'
import GridInspector from '../components/map/GridInspector'
import SpatialModeControls from '../components/map/SpatialModeControls'

import {
  DEFAULT_LOCATION,
  STUDY_LOCATIONS,
} from '../features/spatial/cities'

import {
  DEFAULT_GRID_INDEX,
} from '../features/spatial/constants'

import {
  ADAPTIVE_CELL_PIXELS,
} from '../features/spatial/adaptiveConstants'

import {
  calculateAdaptiveMetrics,
  generateAdaptiveGrid,
  generateLockedGrid,
  lockAdaptiveRegion,
} from '../features/spatial/adaptiveGrid'

import {
  generateSpatialGrid,
} from '../features/spatial/grid'

import type {
  MapViewport,
} from '../features/spatial/types'

import type {
  SpatialMode,
  LockedStudyRegion,
  AdaptiveGridConfiguration,
} from '../features/spatial/adaptiveTypes'

import '../styles/simulator.css'

export default function SimulatorPage() {
  const [locationId, setLocationId] = useState(
    DEFAULT_LOCATION.id,
  )

  const [spatialMode, setSpatialMode] =
    useState<SpatialMode>('research')

  const [lockedRegion, setLockedRegion] =
    useState<LockedStudyRegion | null>(null)

  const [resetVersion, setResetVersion] =
    useState(0)

  const [selectedGridIndex, setSelectedGridIndex] =
    useState(DEFAULT_GRID_INDEX)

  const [showGrid, setShowGrid] = useState(true)

  const [layerId, setLayerId] =
    useState<AnalysisLayer>('intervention')

  const [showMarkers, setShowMarkers] =
    useState(true)

  const [showLabels, setShowLabels] =
    useState(false)

  const [threshold, setThreshold] =
    useState(0)

  const analysisLayers =
    getAnalysisLayers(spatialMode)

  const activeLayer =
    analysisLayers.find(
      (layer) => layer.id === layerId,
    ) ?? analysisLayers[0]!

  function handleLayerChange(layer: AnalysisLayer) {
    setLayerId(layer)
    setThreshold(0)
  }

  const [scenarios, setScenarios] =
    useState<ScenarioStore>({})

  const [viewport, setViewport] =
    useState<MapViewport>({
      center: DEFAULT_LOCATION.center,
      zoom: DEFAULT_LOCATION.defaultZoom,
    })

  const [isFullscreen, setIsFullscreen] =
    useState(false)

  const [fullscreenError, setFullscreenError] =
    useState('')

  const workspaceRef =
    useRef<HTMLDivElement>(null)

  const location =
    STUDY_LOCATIONS.find(
      (item) => item.id === locationId,
    ) ?? DEFAULT_LOCATION

  const adaptiveConfiguration =
    useMemo<AdaptiveGridConfiguration>(
      () => ({
        center: viewport.center,
        zoom: viewport.zoom,
        cellPixels: ADAPTIVE_CELL_PIXELS,
      }),
      [viewport],
    )

  const adaptiveMetrics = useMemo(() => {
    const { latitude, longitude } =
      adaptiveConfiguration.center

    // Conservative geographical guard.
    // Avoid polar and antimeridian-spanning study regions.
    if (
      Math.abs(latitude) > 80 ||
      Math.abs(longitude) > 179
    ) {
      return null
    }

    return calculateAdaptiveMetrics(
      adaptiveConfiguration,
    )
  }, [adaptiveConfiguration])

  const cells = useMemo(() => {
    if (spatialMode === 'research') {
      return generateSpatialGrid(location)
    }

    if (lockedRegion) {
      return generateLockedGrid(
        location,
        lockedRegion,
      )
    }

    if (!adaptiveMetrics?.isSupported) {
      return []
    }

    return generateAdaptiveGrid(
      location,
      adaptiveConfiguration,
    )
  }, [
    spatialMode,
    location,
    lockedRegion,
    adaptiveConfiguration,
    adaptiveMetrics,
  ])

  const selectedCell =
    cells[selectedGridIndex] ??
    cells[DEFAULT_GRID_INDEX]

  const isRegionLocked =
    spatialMode === 'research' ||
    lockedRegion !== null

  const selectedScenario =
    selectedCell && isRegionLocked
      ? scenarios[selectedCell.id]
      : undefined

  const configuredCellCount =
    isRegionLocked
      ? countConfiguredCells(scenarios, cells)
      : 0

  function handleApplyScenario(
    parameters: CellScenarioParameters,
  ) {
    if (!selectedCell || !isRegionLocked) {
      throw new Error(
        'Lock the study region before applying interventions.',
      )
    }

    if (parameters.mode !== spatialMode) {
      throw new Error('Scenario mode mismatch.')
    }

    // Validate synchronously before scheduling the state update.
    calculateCellScenario(selectedCell, parameters)

    setScenarios((previous) =>
      saveCellScenario(
        previous,
        selectedCell,
        parameters,
      ),
    )
  }

  function handleResetScenario() {
    if (!selectedCell || !isRegionLocked) {
      return
    }

    setScenarios((previous) =>
      removeCellScenario(previous, selectedCell.id),
    )
  }

  const handleViewportChange = useCallback(
    (nextViewport: MapViewport) => {
      setViewport(nextViewport)
    },
    [],
  )

  function handleCellSelect(cellId: string) {
    const index = cells.findIndex(
      (cell) => cell.id === cellId,
    )

    if (index >= 0) {
      setSelectedGridIndex(index)
    }
  }

  function handleModeChange(mode: SpatialMode) {
    if (mode === spatialMode) {
      return
    }

    setSpatialMode(mode)
    setLayerId('intervention')
    setThreshold(0)
    setLockedRegion(null)
    setSelectedGridIndex(DEFAULT_GRID_INDEX)
    setShowGrid(true)

    if (mode === 'research') {
      setResetVersion(
        (previous) => previous + 1,
      )
    }
  }

  function handleLocationChange(nextId: string) {
    const nextLocation =
      STUDY_LOCATIONS.find(
        (item) => item.id === nextId,
      )

    if (!nextLocation) {
      return
    }

    setLocationId(nextId)
    setLockedRegion(null)
    setSelectedGridIndex(DEFAULT_GRID_INDEX)

    setViewport({
      center: nextLocation.center,
      zoom: nextLocation.defaultZoom,
    })
  }

  function handleLock() {
    if (
      spatialMode !== 'adaptive' ||
      lockedRegion ||
      !adaptiveMetrics?.isSupported
    ) {
      return
    }

    const region = lockAdaptiveRegion(
      location.id,
      adaptiveConfiguration,
    )

    setLockedRegion(region)
  }

  function handleUnlock() {
    setLockedRegion(null)
    setSelectedGridIndex(DEFAULT_GRID_INDEX)
  }

  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(
        document.fullscreenElement ===
        workspaceRef.current,
      )
    }

    document.addEventListener(
      'fullscreenchange',
      handleFullscreenChange,
    )

    return () => {
      document.removeEventListener(
        'fullscreenchange',
        handleFullscreenChange,
      )
    }
  }, [])

  async function toggleFullscreen() {
    setFullscreenError('')

    try {
      if (
        document.fullscreenElement ===
        workspaceRef.current
      ) {
        await document.exitFullscreen()
        return
      }

      if (workspaceRef.current?.requestFullscreen) {
        await workspaceRef.current.requestFullscreen()
      } else {
        setFullscreenError(
          'Fullscreen is unavailable in this browser.',
        )
      }
    } catch {
      setFullscreenError(
        'The browser could not change fullscreen mode.',
      )
    }
  }

  return (
    <div className="container page simulator-page">
      <header className="simulator-heading">
        <div>
          <span className="eyebrow">
            Spatial environmental modelling / ECOSIMULATE
          </span>

          <h1>Intervention laboratory.</h1>

          <p className="page-description">
            Configure geographical study regions and
            investigate hypothetical artificial-tree
            deployment through transparent computational
            models.
          </p>
        </div>

        <Link
          className="simulator-methodology-link"
          to="/methodology"
        >
          Model methodology
          <ArrowUpRight size={16} />
        </Link>
      </header>

      <div
        className="simulation-workspace"
        ref={workspaceRef}
      >
        <div className="workspace-toolbar">
          <div className="workspace-location">
            <MapPin size={17} aria-hidden="true" />

            <div className="workspace-field">
              <label htmlFor="study-location">
                Study location
              </label>

              <select
                id="study-location"
                value={locationId}
                onChange={(event) =>
                  handleLocationChange(
                    event.target.value,
                  )
                }
              >
                {STUDY_LOCATIONS.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="workspace-context">
            <span>Reference location</span>
            <strong>India / {location.region}</strong>
          </div>

          <label className="workspace-layer-toggle">
            <input
              type="checkbox"
              checked={showGrid}
              onChange={(event) => {
                setShowGrid(event.target.checked)
              }}
            />
            Spatial grid
          </label>

          <div className="workspace-actions">
            <button
              type="button"
              className="workspace-button"
              onClick={() => {
                setResetVersion(
                  (previous) => previous + 1,
                )
              }}
            >
              <LocateFixed size={16} />
              <span>Reset view</span>
            </button>

            {document.fullscreenEnabled && (
              <button
                type="button"
                className="workspace-button"
                onClick={toggleFullscreen}
              >
                {isFullscreen
                  ? <Minimize size={16} />
                  : <Maximize size={16} />
                }

                <span>
                  {isFullscreen
                    ? 'Exit fullscreen'
                    : 'Fullscreen'}
                </span>
              </button>
            )}
          </div>
        </div>

        <SpatialModeControls
          mode={spatialMode}
          onModeChange={handleModeChange}
          metrics={adaptiveMetrics}
          lockedRegion={lockedRegion}
          onLock={handleLock}
          onUnlock={handleUnlock}
        />

        <AnalysisControls
          layers={analysisLayers}
          activeLayer={activeLayer}
          onLayerChange={handleLayerChange}
          showMarkers={showMarkers}
          onMarkersChange={setShowMarkers}
          showLabels={showLabels}
          onLabelsChange={setShowLabels}
          threshold={threshold}
          onThresholdChange={setThreshold}
        />

        <div className="workspace-body">
          <div className="workspace-map-region">
            <EnvironmentalMap
              location={location}
              resetVersion={resetVersion}
              onViewportChange={handleViewportChange}
              cells={cells}
              selectedCellId={selectedCell?.id ?? ''}
              onCellSelect={handleCellSelect}
              showGrid={showGrid}
              scenarios={isRegionLocked ? scenarios : {}}
              activeLayer={activeLayer}
              showMarkers={showMarkers}
              showLabels={showLabels}
              threshold={threshold}
            />

            <div className="map-experiment-indicator">
              {isRegionLocked
                ? <Lock size={14} />
                : <LockOpen size={14} />
              }

              <span>
                {isRegionLocked
                  ? 'Fixed geographical boundaries'
                  : 'Adaptive configuration'}
              </span>
            </div>
          </div>

          <aside
            className="workspace-inspector"
            aria-label="Experimental cell information"
          >
            <p className="eyebrow">
              Experimental workspace
            </p>

            <p className="inspector-location-name">
              {location.name}
              {' / '}
              {spatialMode === 'research'
                ? 'Research'
                : 'Adaptive'}
            </p>

            {selectedCell && isRegionLocked && (
              <>
                <CellScenarioEditor
                  key={`${spatialMode}-${selectedCell.id}`}
                  mode={spatialMode}
                  cell={selectedCell}
                  scenario={selectedScenario}
                  onApply={handleApplyScenario}
                  onReset={handleResetScenario}
                />

                {selectedScenario && (
                  <CellScenarioResults
                    scenario={selectedScenario}
                  />
                )}
              </>
            )}

            {selectedCell && !isRegionLocked && (
              <div className="scenario-locked-notice">
                <Lock size={16} />
                Lock the study region to enable
                environmental configuration.
              </div>
            )}

            {selectedCell ? (
              <GridInspector
                cells={cells}
                selectedCell={selectedCell}
                onCellSelect={handleCellSelect}
              />
            ) : (
              <section className="inspector-section">
                <h2>Adjust study area.</h2>

                <p className="inspector-description">
                  The current geographical resolution
                  is outside the supported range.
                  Adjust the zoom to configure cells
                  between 10,000 and 100,000 mÃ‚Â².
                </p>
              </section>
            )}

            <section className="inspector-section">
              <p className="eyebrow">
                {isRegionLocked
                  ? 'Experiment ready'
                  : 'Region configuration'}
              </p>

              <p className="inspector-description">
                {isRegionLocked
                  ? 'The geographical boundaries are fixed. Navigation will not change the physical cell area.'
                  : 'Pan or zoom the map to reposition and resize the study region. Lock it before configuring interventions.'}
              </p>
            </section>

            <section className="inspector-section">
              <p className="eyebrow">
                Scientific interpretation
              </p>

              <p className="inspector-description">
                {spatialMode === 'research'
                  ? 'Uses the fixed reference area specified in the published Pollution Index model.'
                  : 'Variable-area exploration introduced in the 2026 reconstruction for the illustrative PM2.5 model.'}
              </p>

              <p className="inspector-description">
                All environmental scenarios are hypothetical.
                The map does not display live pollution data.
              </p>
            </section>
          </aside>
        </div>

        <div className="workspace-statusbar">
          <span>
            {viewport.center.latitude.toFixed(4)}
            {', '}
            {viewport.center.longitude.toFixed(4)}
          </span>

          <span>
            Zoom {viewport.zoom.toFixed(2)}
          </span>

          <span>
            {configuredCellCount} / {cells.length} cells configured
          </span>

          <span className="workspace-status-label">
            {isRegionLocked
              ? 'Geographical boundaries fixed'
              : 'Adaptive region unlocked'}
          </span>
        </div>

        {fullscreenError && (
          <p
            className="workspace-error"
            role="status"
          >
            {fullscreenError}
          </p>
        )}
      </div>

      <section className="simulator-context">
        <div>
          <p className="eyebrow">
            About this workspace
          </p>

          <h2>Geography as a research instrument.</h2>
        </div>

        <div>
          <p>
            Research grid mode preserves the approximately
            23,000 square metre reference cells described
            in the original ECOSIMULATE publication.
          </p>

          <p>
            Adaptive exploration extends the spatial
            interface through configurable geographical
            areas. Locking a study region separates map
            navigation from experimental configuration.
          </p>

          <p>
            Geographical features provide real-world
            context. Generated study boundaries and
            environmental scenarios are hypothetical.
          </p>

          <Link className="text-link" to="/research">
            Explore the published research
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  )
}
