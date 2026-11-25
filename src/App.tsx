import { lazy, Suspense } from 'react'

import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom'

import RootLayout from './components/layout/RootLayout'
import HomePage from './pages/HomePage'

const ResearchPage = lazy(
  () => import('./pages/ResearchPage'),
)

const SimulatorPage = lazy(
  () => import('./pages/SimulatorPage'),
)

const MethodologyPage = lazy(
  () => import('./pages/MethodologyPage'),
)

const ContinuityPage = lazy(
  () => import('./pages/ContinuityPage'),
)

const NotFoundPage = lazy(
  () => import('./pages/NotFoundPage'),
)

function PageLoading() {
  return (
    <section
      className="container page route-loading"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="eyebrow">
        ECOSIMULATE / Workspace
      </span>

      <h1>Preparing the page.</h1>

      <p>
        Loading the required application components.
      </p>

      <div
        className="loading-track"
        aria-hidden="true"
      >
        <span />
      </div>
    </section>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route
            index
            element={<HomePage />}
          />

          <Route
            path="research"
            element={
              <Suspense fallback={<PageLoading />}>
                <ResearchPage />
              </Suspense>
            }
          />

          <Route
            path="simulator"
            element={
              <Suspense fallback={<PageLoading />}>
                <SimulatorPage />
              </Suspense>
            }
          />

          <Route
            path="methodology"
            element={
              <Suspense fallback={<PageLoading />}>
                <MethodologyPage />
              </Suspense>
            }
          />

          <Route
            path="continuity"
            element={
              <Suspense fallback={<PageLoading />}>
                <ContinuityPage />
              </Suspense>
            }
          />

          <Route
            path="*"
            element={
              <Suspense fallback={<PageLoading />}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
