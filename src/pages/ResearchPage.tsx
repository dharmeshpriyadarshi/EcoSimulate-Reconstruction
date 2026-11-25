import {
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react'

import { Link } from 'react-router-dom'
import { siteConfig } from '../config/site'

import '../styles/research.css'

const studyLocations = [
  'Delhi',
  'Mumbai',
  'Hyderabad',
  'Chennai',
  'Pune',
  'Munnar',
  'Manali',
]

const researchStages = [
  {
    index: '01',
    title: 'Environmental inputs',
    description:
      'Represent atmospheric conditions through selected environmental parameters.',
  },
  {
    index: '02',
    title: 'Spatial representation',
    description:
      'Subdivide study locations into geographical cells for localized experimentation.',
  },
  {
    index: '03',
    title: 'Intervention modelling',
    description:
      'Introduce hypothetical artificial-tree deployments into a computational model.',
  },
  {
    index: '04',
    title: 'Scenario comparison',
    description:
      'Compare baseline and intervention conditions through calculated numerical outputs.',
  },
]

export default function ResearchPage() {
  return (
    <div className="container page research-page">
      <header className="research-hero">
        <p className="eyebrow">
          Research publication / IEEE / 2025
        </p>

        <h1>{siteConfig.title}</h1>

        <p className="research-lead">
          Exploring the relationship between environmental
          monitoring, spatial modelling and hypothetical
          pollution mitigation through computational
          experimentation.
        </p>

        <div className="research-publication">
          <dl className="research-publication-metadata">
            <div>
              <dt>Publication venue</dt>
              <dd>
                {siteConfig.publication.conference}
              </dd>
            </div>

            <div>
              <dt>Digital object identifier</dt>
              <dd>{siteConfig.publication.doi}</dd>
            </div>

            <div>
              <dt>Publication status</dt>
              <dd>Published / 2025</dd>
            </div>
          </dl>

          <div className="button-row">
            <a
              className="button button-primary"
              href={siteConfig.publication.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read IEEE publication
              <ArrowUpRight size={17} />
            </a>

            <a
              className="button button-secondary"
              href="https://github.com/dharmeshpriyadarshi/EcoSimulate"
              target="_blank"
              rel="noopener noreferrer"
            >
              Original repository
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </header>

      <nav
        className="research-contents"
        aria-label="Research page contents"
      >
        <a href="#research-context">01 / Context</a>
        <a href="#research-objectives">02 / Objectives</a>
        <a href="#research-framework">03 / Framework</a>
        <a href="#research-findings">04 / Findings</a>
        <a href="#research-limitations">05 / Limitations</a>
        <a href="#research-reconstruction">06 / Reconstruction</a>
      </nav>

      <section
        className="research-section"
        id="research-context"
      >
        <div className="research-section-heading">
          <p className="eyebrow">
            01 / Environmental context
          </p>

          <h2>Understanding the problem.</h2>
        </div>

        <div className="research-prose">
          <p>
            Air pollution is influenced by interconnected
            environmental conditions, human activity,
            infrastructure and emission sources.
            Investigating possible interventions requires
            more than identifying areas of elevated
            pollution.
          </p>

          <p>
            ECOSIMULATE approaches this problem through
            computational exploration. The original research
            examined how environmental monitoring and
            spatially structured simulation could support
            the examination of hypothetical mitigation
            strategies.
          </p>

          <p>
            Artificial trees were introduced as a conceptual
            filtration intervention whose proposed effects
            could be explored within a mathematical model.
            The simulation provides a framework for examining
            assumptions rather than establishing verified
            real-world filtration effectiveness.
          </p>
        </div>
      </section>

      <section
        className="research-section"
        id="research-objectives"
      >
        <div className="research-section-heading">
          <p className="eyebrow">
            02 / Research objectives
          </p>

          <h2>From monitoring to intervention.</h2>
        </div>

        <div className="research-prose">
          <p>
            The study brings together environmental data,
            geographical representation and computational
            modelling to investigate localized hypothetical
            pollution mitigation.
          </p>

          <ol className="research-objectives">
            <li>
              Explore environmental monitoring through
              selected atmospheric parameters.
            </li>

            <li>
              Represent study locations using a spatial
              grid-based framework.
            </li>

            <li>
              Examine hypothetical artificial-tree
              deployment using a custom Pollution Index.
            </li>

            <li>
              Communicate calculated intervention outcomes
              through interactive visualization.
            </li>
          </ol>
        </div>
      </section>

      <section
        className="research-full-section"
        id="research-framework"
      >
        <p className="eyebrow">
          03 / Experimental framework
        </p>

        <h2>A spatial approach to environmental modelling.</h2>

        <p className="research-section-intro">
          The conceptual workflow connects environmental
          conditions to geographically structured
          intervention scenarios.
        </p>

        <ol className="research-framework">
          {researchStages.map((stage) => (
            <li key={stage.index}>
              <span className="research-stage-index">
                {stage.index}
              </span>

              <h3>{stage.title}</h3>

              <p>{stage.description}</p>
            </li>
          ))}
        </ol>

        <div className="research-spatial-layout">
          <figure className="research-grid-figure">
            <div
              className="research-grid-diagram"
              aria-hidden="true"
            >
              {Array.from(
                { length: 49 },
                (_, index) => (
                  <span
                    key={index}
                    className={
                      index === 24
                        ? 'research-grid-cell is-selected'
                        : 'research-grid-cell'
                    }
                  />
                ),
              )}
            </div>

            <figcaption>
              Conceptual 7 by 7 grid used by the
              reconstructed simulator. Not a historical
              sampling map from the publication.
            </figcaption>
          </figure>

          <div className="research-spatial-copy">
            <p className="eyebrow">
              Reference geographical area
            </p>

            <strong className="research-display-number">
              23,000 <small>mÂ²</small>
            </strong>

            <p>
              The original research describes a nominal
              spatial reference cell area of approximately
              23,000 square metres. Research grid mode
              preserves this reference scale.
            </p>

            <p>
              The reconstruction additionally provides
              adaptive geographical exploration using
              independently defined mathematical assumptions.
            </p>
          </div>
        </div>

        <div className="research-locations">
          <p className="eyebrow">
            Study locations
          </p>

          <ul>
            {studyLocations.map((location) => (
              <li key={location}>{location}</li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="research-section"
        id="research-findings"
      >
        <div className="research-section-heading">
          <p className="eyebrow">
            04 / Reported research findings
          </p>

          <h2>Interpreting the original experiments.</h2>
        </div>

        <div className="research-prose">
          <p>
            The publication reports simulated pollution
            mitigation outcomes under alternative
            artificial-tree deployment configurations.
            These results illustrate the behaviour of
            the proposed computational framework.
          </p>

          <p>
            The findings should be interpreted within
            the assumptions, input conditions and
            mathematical structure of the original study.
            They should not be understood as independently
            verified reductions in ambient pollution.
          </p>

          <aside className="research-note">
            <strong>Scientific interpretation</strong>

            <p>
              A reduction in the custom Pollution Index
              is not equivalent to a measured reduction
              in pollutant concentration or official
              Air Quality Index.
            </p>
          </aside>

          <a
            className="text-link"
            href={siteConfig.publication.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Consult the original published findings
            <ArrowUpRight size={16} />
          </a>
        </div>
      </section>

      <section
        className="research-section"
        id="research-limitations"
      >
        <div className="research-section-heading">
          <p className="eyebrow">
            05 / Scientific limitations
          </p>

          <h2>What simulation cannot establish.</h2>
        </div>

        <div className="research-prose">
          <p>
            Computational models simplify environmental
            systems. Their usefulness depends on the
            transparency of their assumptions and the
            evidence supporting their parameters.
          </p>

          <ul className="research-limitations">
            <li>
              The custom Pollution Index is not an
              official regulatory air-quality index.
            </li>

            <li>
              The mathematical intervention coefficients
              do not establish measured filtration
              effectiveness.
            </li>

            <li>
              Atmospheric transport, meteorological
              variability and spatial interactions require
              more comprehensive physical modelling.
            </li>

            <li>
              Real-world deployment feasibility requires
              engineering investigation and independent
              field validation.
            </li>
          </ul>

          <Link className="text-link" to="/methodology">
            Examine model assumptions
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section
        className="research-full-section"
        id="research-reconstruction"
      >
        <p className="eyebrow">
          06 / Research and reconstruction
        </p>

        <h2>Preserving the research. Extending the interface.</h2>

        <div className="research-comparison">
          <article>
            <p className="eyebrow">
              2025 / Original publication
            </p>

            <h3>The research foundation.</h3>

            <ul>
              <li>Google Air Quality API integration</li>
              <li>Python Flask and JavaScript architecture</li>
              <li>Plotly.js and Leaflet visualization</li>
              <li>Custom Pollution Index formulation</li>
              <li>Grid-based artificial-tree intervention modelling</li>
              <li>Published research findings</li>
            </ul>
          </article>

          <article>
            <p className="eyebrow">
              2026 / Reconstruction
            </p>

            <h3>The experimental workspace.</h3>

            <ul>
              <li>Hypothetical user-configured environmental inputs</li>
              <li>React and TypeScript browser-based architecture</li>
              <li>Recharts and extended Leaflet visualization</li>
              <li>Reconstructed bounded Pollution Index model</li>
              <li>Independent illustrative PM2.5 model</li>
              <li>Regional experiments, analytics and data exports</li>
            </ul>
          </article>
        </div>

        <p className="research-disclaimer">
          The reconstruction is a modern research
          demonstrator. Its additional features are not
          presented as contributions evaluated or validated
          in the original 2025 publication. The current
          simulator uses hypothetical environmental inputs,
          not live pollution measurements.
        </p>
      </section>

      <section className="research-closing">
        <div>
          <p className="eyebrow">
            Continue the investigation
          </p>

          <h2>Explore the model yourself.</h2>
        </div>

        <div className="button-row">
          <Link
            className="button button-primary"
            to="/simulator"
          >
            Open simulator <ArrowRight size={17} />
          </Link>

          <Link
            className="button button-secondary"
            to="/methodology"
          >
            View methodology <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </div>
  )
}
