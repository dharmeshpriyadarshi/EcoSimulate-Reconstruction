import EnvironmentalCollage from '../sections/EnvironmentalCollage'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeading from '../components/ui/PageHeading'
import { siteConfig } from '../config/site'

export default function HomePage() {
  return (
    <div className="container page home-page">
      <section className="home-hero">
        <div className="home-hero__content">
          <p className="home-kicker">
            Environmental pollution / computational exploration
          </p>

          <h1 className="home-display-title">
            How do we intervene
            <br />
            in the air we breathe?
          </h1>

          <p className="home-lead">
            Atmospheric pollution is not only an environmental concern,
            but a systems problem involving emissions, urban conditions,
            intervention constraints and uncertain outcomes. ECOSIMULATE
            presents a research-driven way to think about that challenge
            through simulation.
          </p>

          <div className="button-row">
            <Link className="button button-primary" to="/simulator">
              Open simulator <ArrowRight size={17} />
            </Link>

            <Link className="button button-secondary" to="/research">
              Explore research overview <ArrowRight size={17} />
            </Link>
          </div>
        </div>

        <EnvironmentalCollage />
      </section>

      <section className="home-summary-grid" aria-label="Project summary">
        <article className="summary-block">
          <p className="summary-block__index">01</p>
          <h2>The problem</h2>
          <p>
            Air pollution remains a complex public issue shaped by
            infrastructure, emissions, geography and human activity.
            Interventions are often discussed in principle, but their
            comparative effects are difficult to reason about without
            structured modelling.
          </p>
        </article>

        <article className="summary-block">
          <p className="summary-block__index">02</p>
          <h2>What we understand</h2>
          <p>
            Pollution mitigation cannot be approached responsibly through
            assumptions alone. Even when the goal is clear, the expected
            behaviour of an intervention depends on model structure,
            parameters, context and interpretation.
          </p>
        </article>

        <article className="summary-block">
          <p className="summary-block__index">03</p>
          <h2>Why ECOSIMULATE</h2>
          <p>
            ECOSIMULATE was conceived as a research demonstration to
            explore how hypothetical mitigation ideas, such as
            artificial-tree or filtration-inspired concepts, might be
            represented and compared through computational simulation.
          </p>
        </article>
      </section>

      <section className="panel home-narrative">
        <div className="home-two-column">
          <div>
            <p className="eyebrow">Problem statement</p>
            <h2>Why a project like this needs to exist</h2>
          </div>

          <div className="home-prose">
            <p>
              Discussions around pollution control often move quickly from
              concern to solution. But environmental systems are rarely so
              simple. A proposed intervention may sound promising while
              still requiring careful examination of assumptions, scale,
              expected behaviour and limitations.
            </p>

            <p>
              That is where simulation becomes useful. It creates a
              structured environment for comparing scenarios, thinking
              through intervention parameters and understanding how a
              conceptual mitigation strategy might behave under controlled
              assumptions.
            </p>

            <p>
              ECOSIMULATE should therefore be understood as a scientific
              demonstration of environmental modelling logic. It does not
              claim that its illustrative outputs are validated
              real-world pollution outcomes. Instead, it helps visitors
              understand the reasoning process behind such modelling.
            </p>
          </div>
        </div>
      </section>

      <section className="panel home-narrative">
        <div className="home-two-column">
          <div>
            <p className="eyebrow">Research vision</p>
            <h2>From concern to computational exploration</h2>
          </div>

          <div className="home-prose">
            <p>
              The original ECOSIMULATE research investigated pollution
              mitigation through an AI-driven environmental modelling
              perspective. In this reconstruction, that direction is
              communicated through a modern website and an interactive
              simulator that allows visitors to examine hypothetical
              scenarios for themselves.
            </p>

            <p>
              The goal is not to oversimplify environmental science into a
              promise of instant improvement. The goal is to offer an
              honest, technically credible interface for exploring how a
              mitigation idea can be conceptualized, modelled and
              critically interpreted.
            </p>

            <div className="button-row">
              <a
                className="button button-secondary"
                href={siteConfig.publication.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read IEEE publication <ArrowUpRight size={17} />
              </a>

              <Link className="button button-primary" to="/methodology">
                View methodology <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="home-pathways">
        <PageHeading
          eyebrow="Explore the project"
          title="Three ways to continue"
          description="Move from environmental context to scientific framing, interactive modelling and methodological transparency."
        />

        <div className="pathway-grid">
          <article className="pathway-card">
            <p className="pathway-card__eyebrow">Research</p>
            <h3>Understand the original motivation</h3>
            <p>
              Review the environmental problem, the conceptual framing and
              the published research context behind ECOSIMULATE.
            </p>
            <Link className="text-link" to="/research">
              Go to research overview <ArrowRight size={16} />
            </Link>
          </article>

          <article className="pathway-card">
            <p className="pathway-card__eyebrow">Simulator</p>
            <h3>Interact with hypothetical scenarios</h3>
            <p>
              Adjust illustrative pollution and intervention parameters to
              compare baseline and simulated mitigation conditions.
            </p>
            <Link className="text-link" to="/simulator">
              Go to simulator <ArrowRight size={16} />
            </Link>
          </article>

          <article className="pathway-card">
            <p className="pathway-card__eyebrow">Methodology</p>
            <h3>Inspect assumptions and limitations</h3>
            <p>
              See how the demonstrator works, which assumptions it makes
              and why its outputs must be interpreted carefully.
            </p>
            <Link className="text-link" to="/methodology">
              Go to methodology <ArrowRight size={16} />
            </Link>
          </article>
        </div>
      </section>
    </div>
  )
}
