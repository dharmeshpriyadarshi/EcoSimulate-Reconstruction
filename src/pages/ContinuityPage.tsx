import {
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react'

import { Link } from 'react-router-dom'
import { siteConfig } from '../config/site'

import '../styles/research.css'
import '../styles/continuity.css'

const researchDirections = [
  {
    index: '01',
    title: 'Environmental data',
    description:
      'Moving from hypothetical environmental configurations toward systematic analysis of historical air-quality observations.',
  },
  {
    index: '02',
    title: 'Predictive modelling',
    description:
      'Investigating machine learning approaches to forecasting air quality across multiple urban environments.',
  },
  {
    index: '03',
    title: 'Evaluation discipline',
    description:
      'Examining data-leakage safeguards, held-out evaluation and the reliability of predictive comparisons.',
  },
  {
    index: '04',
    title: 'Model complexity',
    description:
      'Investigating whether heterogeneous ensembles provide meaningful predictive improvements over individual models.',
  },
]

export default function ContinuityPage() {
  return (
    <div className="container page research-page continuity-page">
      <header className="research-hero">
        <p className="eyebrow">
          Research continuity / Environmental modelling
        </p>

        <h1>
          From intervention simulation
          to predictive understanding.
        </h1>

        <p className="research-lead">
          An evolving investigation into environmental
          systems through computational modelling,
          historical data analysis and machine learning.
          ECOSIMULATE and Veridian represent distinct
          stages of a shared research direction.
        </p>
      </header>

      <section className="research-full-section">
        <p className="eyebrow">
          01 / Research progression
        </p>

        <h2>Two investigations. One environmental direction.</h2>

        <div className="continuity-timeline">
          <article className="continuity-milestone">
            <div
              className="continuity-marker"
              aria-hidden="true"
            />

            <p className="eyebrow">
              2025 / Published research
            </p>

            <h3>ECOSIMULATE.</h3>

            <p className="continuity-subtitle">
              Pollution mitigation and environmental simulation
            </p>

            <div className="research-prose">
              <p>
                ECOSIMULATE investigated how environmental
                conditions and hypothetical artificial-tree
                interventions could be represented through
                computational and geographical modelling.
              </p>

              <p>
                The original study was published at
                IEEE ICSCSA 2025. Its custom Pollution
                Index formulation provides the foundation
                for the reconstructed experimental workspace.
              </p>

              <p>
                The research emphasizes the exploration
                of intervention assumptions and comparative
                mathematical scenarios.
              </p>
            </div>

            <div className="continuity-keywords">
              <span>Environmental modelling</span>
              <span>Spatial simulation</span>
              <span>Hypothetical interventions</span>
            </div>

            <div className="button-row">
              <Link
                className="button button-primary"
                to="/research"
              >
                Research overview
                <ArrowRight size={17} />
              </Link>

              <a
                className="button button-secondary"
                href={siteConfig.publication.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Published paper
                <ArrowUpRight size={17} />
              </a>
            </div>
          </article>

          <div className="continuity-transition">
            <p className="eyebrow">
              Evolution of the research question
            </p>

            <p>
              From examining hypothetical environmental
              interventions to investigating the reliability
              of data-driven air-quality forecasts.
            </p>
          </div>

          <article className="continuity-milestone">
            <div
              className="continuity-marker continuity-marker--ongoing"
              aria-hidden="true"
            />

            <p className="eyebrow">
              2026 / Separate research investigation
            </p>

            <h3>Veridian.</h3>

            <p className="continuity-subtitle">
              Multi-city Air Quality Index forecasting
            </p>

            <div className="continuity-status">
              Research manuscript in preparation
            </div>

            <div className="research-prose">
              <p>
                Veridian extends the broader environmental
                research direction into historical
                air-quality data analysis and machine
                learning-based forecasting.
              </p>

              <p>
                The investigation examines predictive
                modelling across multiple Indian cities,
                with particular attention to heterogeneous
                stacking, data-leakage safeguards and
                held-out model evaluation.
              </p>

              <p>
                A central research consideration is
                whether increasing model complexity
                delivers meaningful improvements in
                predictive performance.
              </p>

              <p>
                Veridian is an independent research
                investigation. Its methodology and
                findings are not contributions of the
                original ECOSIMULATE publication.
              </p>
            </div>

            <div className="continuity-keywords">
              <span>Air-quality forecasting</span>
              <span>Machine learning</span>
              <span>Model evaluation</span>
              <span>Data-leakage safeguards</span>
            </div>
          </article>
        </div>
      </section>

      <section className="research-full-section">
        <p className="eyebrow">
          02 / Evolution of research methodology
        </p>

        <h2>Moving toward data-driven investigation.</h2>

        <div className="continuity-direction-grid">
          {researchDirections.map((direction) => (
            <article key={direction.index}>
              <span className="research-stage-index">
                {direction.index}
              </span>

              <h3>{direction.title}</h3>

              <p>{direction.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="research-full-section">
        <p className="eyebrow">
          03 / Distinct scientific questions
        </p>

        <h2>Simulation is not the same as forecasting.</h2>

        <div className="research-comparison">
          <article>
            <p className="eyebrow">
              ECOSIMULATE / Simulation
            </p>

            <h3>
              What might happen under specified assumptions?
            </h3>

            <ul>
              <li>Hypothetical environmental configurations</li>
              <li>Mathematical intervention response</li>
              <li>Geographically structured scenarios</li>
              <li>Deterministic comparative calculations</li>
              <li>Transparent model interpretation</li>
            </ul>
          </article>

          <article>
            <p className="eyebrow">
              Veridian / Forecasting
            </p>

            <h3>
              What can be predicted from historical evidence?
            </h3>

            <ul>
              <li>Historical air-quality observations</li>
              <li>Data preprocessing and feature representation</li>
              <li>Machine learning model development</li>
              <li>Comparative predictive evaluation</li>
              <li>Assessment of model generalization</li>
            </ul>
          </article>
        </div>

        <aside className="research-note">
          <strong>Scientific distinction</strong>

          <p>
            ECOSIMULATE does not currently implement
            Veridian's forecasting models. Veridian
            does not independently validate the
            hypothetical artificial-tree response
            equations used by ECOSIMULATE.
          </p>
        </aside>
      </section>

      <section className="research-section">
        <div className="research-section-heading">
          <p className="eyebrow">
            04 / Research principles
          </p>

          <h2>Continuity through scientific discipline.</h2>
        </div>

        <div className="research-prose">
          <p>
            Both investigations share an interest in
            understanding environmental systems through
            computational methods, while addressing
            fundamentally different scientific questions.
          </p>

          <p>
            The broader research direction emphasizes
            transparent assumptions, traceable
            computational procedures, reproducibility
            and critical interpretation of results.
          </p>

          <p>
            Increasing methodological sophistication
            is valuable only when it contributes to
            better-supported scientific understanding.
            Negative findings and limitations remain
            important components of that process.
          </p>
        </div>
      </section>

      <section className="research-closing">
        <div>
          <p className="eyebrow">
            Explore the research foundation
          </p>

          <h2>Return to ECOSIMULATE.</h2>
        </div>

        <div className="button-row">
          <Link
            className="button button-primary"
            to="/simulator"
          >
            Open simulator
            <ArrowRight size={17} />
          </Link>

          <Link
            className="button button-secondary"
            to="/methodology"
          >
            View methodology
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </div>
  )
}
