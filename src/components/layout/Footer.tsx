import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { siteConfig } from '../../config/site'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <p className="footer-title">{siteConfig.name}</p>

          <p className="footer-description">
            A reconstructed research demonstration exploring
            hypothetical environmental pollution mitigation scenarios.
          </p>

          <p className="footer-description">
            Original research: {siteConfig.publication.conference}.
            Website reconstruction: {siteConfig.reconstructionYear}.
          </p>
        </div>

        <nav className="footer-links" aria-label="Research resources">
          <a
            href={siteConfig.publication.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            IEEE publication <ArrowUpRight size={15} />
          </a>

          <a
            href={siteConfig.historicalRepository}
            target="_blank"
            rel="noopener noreferrer"
          >
            Original implementation <ArrowUpRight size={15} />
          </a>

          <Link to="/methodology">Methodology and limitations</Link>
          <Link to="/continuity">Research continuity</Link>
        </nav>
      </div>

      <div className="container footer-bottom">
        ECOSIMULATE | Research Demonstration | 2026 Reconstruction
      </div>
    </footer>
  )
}
