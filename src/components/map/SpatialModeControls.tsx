import {
  Lock,
  LockOpen,
  AlertTriangle,
} from 'lucide-react'

import type {
  SpatialMode,
  AdaptiveGridMetrics,
  LockedStudyRegion,
} from '../../features/spatial/adaptiveTypes'

interface SpatialModeControlsProps {
  mode: SpatialMode
  onModeChange: (mode: SpatialMode) => void
  metrics: AdaptiveGridMetrics | null
  lockedRegion: LockedStudyRegion | null
  onLock: () => void
  onUnlock: () => void
}

export default function SpatialModeControls({
  mode,
  onModeChange,
  metrics,
  lockedRegion,
  onLock,
  onUnlock,
}: SpatialModeControlsProps) {
  return (
    <div className="spatial-mode-bar">
      <div className="spatial-mode-options">
        <button
          type="button"
          aria-pressed={mode === 'research'}
          className={`spatial-mode-button ${
            mode === 'research' ? 'is-active' : ''
          }`}
          onClick={() => onModeChange('research')}
        >
          <span>01 / Published model</span>
          <strong>Research grid</strong>
        </button>

        <button
          type="button"
          aria-pressed={mode === 'adaptive'}
          className={`spatial-mode-button ${
            mode === 'adaptive' ? 'is-active' : ''
          }`}
          onClick={() => onModeChange('adaptive')}
        >
          <span>02 / Illustrative model</span>
          <strong>Adaptive exploration</strong>
        </button>
      </div>

      {mode === 'research' ? (
        <div className="spatial-mode-status">
          <Lock size={17} />

          <div>
            <strong>Fixed research grid</strong>
            <span>23,000 m² per cell</span>
          </div>
        </div>
      ) : (
        <div className="adaptive-region-controls">
          <div className="spatial-mode-status">
            {lockedRegion
              ? <Lock size={17} />
              : <LockOpen size={17} />
            }

            <div>
              <strong>
                {lockedRegion
                  ? 'Study region locked'
                  : 'Configure study region'}
              </strong>

              <span>
                {lockedRegion
                  ? Math.round(
                      lockedRegion.cellArea,
                    ).toLocaleString() + ' m² per cell'
                  : metrics
                    ? Math.round(
                        metrics.cellArea,
                      ).toLocaleString() + ' m² per cell'
                    : 'Unsupported geographical position'}
              </span>
            </div>
          </div>

          {lockedRegion ? (
            <button
              type="button"
              className="workspace-button"
              onClick={onUnlock}
            >
              <LockOpen size={15} />
              Unlock region
            </button>
          ) : (
            <button
              type="button"
              className="workspace-button workspace-button-primary"
              disabled={!metrics?.isSupported}
              onClick={onLock}
            >
              <Lock size={15} />
              Lock study region
            </button>
          )}
        </div>
      )}

      {mode === 'adaptive' &&
        !lockedRegion &&
        !metrics?.isSupported && (
          <div className="spatial-range-notice" role="status">
            <AlertTriangle size={16} />

            <span>
              Navigate to a supported location and adjust
              the zoom until each cell represents between
              10,000 and 100,000 m².
            </span>
          </div>
        )}
    </div>
  )
}
