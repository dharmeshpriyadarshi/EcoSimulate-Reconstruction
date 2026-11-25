import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RootLayout from './components/layout/RootLayout'

import HomePage from './pages/HomePage'
import ResearchPage from './pages/ResearchPage'
import SimulatorPage from './pages/SimulatorPage'
import MethodologyPage from './pages/MethodologyPage'
import ContinuityPage from './pages/ContinuityPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="research" element={<ResearchPage />} />
          <Route path="simulator" element={<SimulatorPage />} />
          <Route path="methodology" element={<MethodologyPage />} />
          <Route path="continuity" element={<ContinuityPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
