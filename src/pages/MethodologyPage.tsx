import {
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react'

import { Link } from 'react-router-dom'
import { siteConfig } from '../config/site'

import '../styles/research.css'
import '../styles/methodology.css'

const publishedParameters = [
  ['T', 'Temperature', '°C', '0–50'],
  ['PM', 'PM2.5 concentration', 'µg/m³', '0–500'],
  ['CO', 'Carbon monoxide', 'ppm', '0–50'],
  ['AT', 'Artificial-tree count', 'Units', '0–125'],
]

const adaptiveParameters = [
  ['C₀', 'Baseline PM2.5', 'µg/m³', '0–500'],
  ['N', 'Filtration-unit count', 'Units', '0–125'],
  ['I', 'Intervention intensity', '%', '0–100'],
  ['A', 'Nominal cell area', 'm²', '10,000–100,000'],
]

const limitations = [
  {
    title: 'Environmental inputs',
    description:
      'The reconstruction uses hypothetical user-configured values. It does not retrieve live air-quality measurements.',
  },
  {
    title: 'Physical calibration',
    description:
      'Neither model establishes an empirically calibrated relationship between artificial-tree deployment and measured ambient pollution.',
  },
  {
    title: 'Atmospheric transport',
    description:
      'Wind, humidity, atmospheric chemistry, dispersion and interactions between neighbouring cells are not explicitly simulated.',
  },
  {
    title: 'Spatial approximation',
    description:
      'Nominal geographical cell areas are mathematical approximations. The grids do not represent surveyed engineering deployment boundaries.',
  },
  {
    title: 'Statistical uncertainty',
    description:
      'Descriptive statistics characterize configured scenarios. They do not quantify measurement uncertainty, confidence intervals or causal effects.',
  },
  {
    title: 'Deployment feasibility',
    description:
      'Installation costs, energy consumption, maintenance, infrastructure constraints and engineering feasibility are outside the current model.',
  },
  {
    title: 'Regulatory interpretation',
    description:
      'The custom Pollution Index is not official AQI. Neither model should be used for public-health advisories or regulatory decisions.',
  },
  {
    title: 'Predictive capability',
    description:
      'The reconstructed simulator evaluates deterministic scenarios. It does not implement a trained machine learning forecasting model.',
  },
]

export default function MethodologyPage() {
  return (
    <div className="container page research-page methodology-page">
      <header className="research-hero">
        <p className="eyebrow">
          Scientific methodology / ECOSIMULATE
        </p>

        <h1>
          Understanding the mathematics
          behind the simulation.
        </h1>

        <p className="research-lead">
          A transparent reference to the mathematical
          models, geographical assumptions, analytical
          procedures and scientific limitations that
          govern the reconstructed ECOSIMULATE workspace.
        </p>

        <div className="methodology-header-note">
          <span>Deterministic modelling</span>
          <span>Hypothetical experiments</span>
          <span>Transparent assumptions</span>
        </div>

        <div className="button-row">
          <Link
            className="button button-primary"
            to="/simulator"
          >
            Open simulator <ArrowRight size={17} />
          </Link>

          <a
            className="button button-secondary"
            href={siteConfig.publication.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Original publication
            <ArrowUpRight size={17} />
          </a>
        </div>
      </header>

      <nav
        className="research-contents"
        aria-label="Methodology contents"
      >
        <a href="#model-architecture">01 / Models</a>
        <a href="#published-model">02 / Published model</a>
        <a href="#illustrative-model">03 / Illustrative model</a>
        <a href="#spatial-methodology">04 / Spatial framework</a>
        <a href="#experimental-procedure">05 / Experiments</a>
        <a href="#statistical-methodology">06 / Statistics</a>
        <a href="#reproducibility">07 / Reproducibility</a>
        <a href="#scientific-limitations">08 / Limitations</a>
      </nav>

      <section
        className="research-full-section"
        id="model-architecture"
      >
        <p className="eyebrow">
          01 / Model architecture
        </p>

        <h2>
          Two models. Two distinct interpretations.
        </h2>

        <p className="research-section-intro">
          ECOSIMULATE separates the reconstructed
          published Pollution Index formulation from
          an independently defined illustrative
          concentration-response model.
        </p>

        <div className="research-comparison">
          <article>
            <p className="eyebrow">
              Model A / Research grid
            </p>

            <h3>Published Pollution Index.</h3>

            <p className="methodology-model-description">
              A bounded reconstruction of the custom
              index formulation described in the
              original research.
            </p>

            <dl className="methodology-model-details">
              <div>
                <dt>Spatial scale</dt>
                <dd>23,000 m² per cell</dd>
              </div>
              <div>
                <dt>Output</dt>
                <dd>Custom index points</dd>
              </div>
              <div>
                <dt>Response</dt>
                <dd>Linear with clipping</dd>
              </div>
              <div>
                <dt>Provenance</dt>
                <dd>2025 research formulation</dd>
              </div>
            </dl>
          </article>

          <article>
            <p className="eyebrow">
              Model B / Adaptive exploration
            </p>

            <h3>Illustrative PM2.5 response.</h3>

            <p className="methodology-model-description">
              A separate mathematical demonstration
              introduced during the reconstruction to
              explore variable-area scenarios.
            </p>

            <dl className="methodology-model-details">
              <div>
                <dt>Spatial scale</dt>
                <dd>Variable nominal cell area</dd>
              </div>
              <div>
                <dt>Output</dt>
                <dd>Hypothetical PM2.5 in µg/m³</dd>
              </div>
              <div>
                <dt>Response</dt>
                <dd>Exponential</dd>
              </div>
              <div>
                <dt>Provenance</dt>
                <dd>2026 illustrative extension</dd>
              </div>
            </dl>
          </article>
        </div>

        <aside className="research-note">
          <strong>Model separation</strong>

          <p>
            Outputs from these models have different
            meanings and must not be combined into a
            single statistical distribution or treated
            as interchangeable pollution measurements.
          </p>
        </aside>
      </section>

      <section
        className="research-full-section"
        id="published-model"
      >
        <p className="eyebrow">
          02 / Published research formulation
        </p>

        <h2>The custom Pollution Index.</h2>

        <p className="research-section-intro">
          The original research describes a weighted
          combination of temperature, PM2.5, carbon
          monoxide and hypothetical artificial-tree
          deployment. The reconstruction implements
          explicit lower and upper bounds consistent
          with the stated 0–100 index range.
        </p>

        <div className="methodology-equation">
          <span className="methodology-equation-label">
            Equation 01 / Unbounded index
          </span>

          <p>
            P<sub>raw</sub> = 0.3T + 0.4PM + 1.2CO − 0.8AT
          </p>
        </div>

        <div className="methodology-equation">
          <span className="methodology-equation-label">
            Equation 02 / Bounded index
          </span>

          <p>
            PI = max(0, min(100, P<sub>raw</sub>))
          </p>
        </div>

        <div className="methodology-table-scroll">
          <table className="methodology-table">
            <caption>
              Published model parameter definitions
              and reconstruction input bounds.
            </caption>

            <thead>
              <tr>
                <th scope="col">Symbol</th>
                <th scope="col">Parameter</th>
                <th scope="col">Unit</th>
                <th scope="col">Input range</th>
              </tr>
            </thead>

            <tbody>
              {publishedParameters.map((parameter) => (
                <tr key={parameter[0]}>
                  <th scope="row">{parameter[0]}</th>
                  <td>{parameter[1]}</td>
                  <td>{parameter[2]}</td>
                  <td>{parameter[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="methodology-explanation">
          <h3>Baseline and intervention conditions.</h3>

          <p>
            The baseline index is calculated with zero
            artificial trees. The intervention index
            uses the applied artificial-tree count,
            while the remaining environmental inputs
            are held constant.
          </p>

          <p>
            The model assigns a fixed mathematical
            contribution of −0.8 raw index points per
            additional artificial tree. The bounded
            output can remain unchanged when clipping
            is active at either end of the index range.
          </p>
        </div>

        <div className="methodology-worked-example">
          <p className="eyebrow">
            Worked example / Research grid
          </p>

          <h3>From environmental inputs to index values.</h3>

          <p>
            Consider temperature of 30°C, PM2.5 of
            100 µg/m³, carbon monoxide of 5 ppm and
            a hypothetical deployment of 25 artificial
            trees within a nominal 23,000 m² cell.
          </p>

          <div className="methodology-calculation">
            <p>Baseline = 9 + 40 + 6 = 55</p>
            <p>Intervention = 55 − 20 = 35</p>
            <p>Relative reduction = 20 / 55 × 100</p>
          </div>

          <div className="methodology-result-grid">
            <div>
              <span>Baseline PI</span>
              <strong>55.00</strong>
            </div>
            <div>
              <span>Intervention PI</span>
              <strong>35.00</strong>
            </div>
            <div>
              <span>Relative index reduction</span>
              <strong>36.36%</strong>
            </div>
          </div>

          <p className="methodology-caption">
            This is a calculated example using the
            reconstructed equation, not a historical
            field measurement or proof of filtration
            effectiveness.
          </p>
        </div>
      </section>

      <section
        className="research-full-section"
        id="illustrative-model"
      >
        <p className="eyebrow">
          03 / Illustrative reconstruction extension
        </p>

        <h2>An area-dependent concentration model.</h2>

        <p className="research-section-intro">
          Adaptive exploration uses an independent
          exponential response model to demonstrate
          hypothetical concentration changes as
          deployment count, intensity and geographical
          area vary.
        </p>

        <div className="methodology-equation">
          <span className="methodology-equation-label">
            Equation 03 / Intervention score
          </span>

          <p>
            S = 0.005 × N × (I / 100) × (23000 / A)
          </p>
        </div>

        <div className="methodology-equation">
          <span className="methodology-equation-label">
            Equation 04 / Intervention concentration
          </span>

          <p>
            C<sub>1</sub> = C<sub>0</sub> × exp(−S)
          </p>
        </div>

        <div className="methodology-table-scroll">
          <table className="methodology-table">
            <caption>
              Illustrative model parameter definitions
              and supported input bounds.
            </caption>

            <thead>
              <tr>
                <th scope="col">Symbol</th>
                <th scope="col">Parameter</th>
                <th scope="col">Unit</th>
                <th scope="col">Input range</th>
              </tr>
            </thead>

            <tbody>
              {adaptiveParameters.map((parameter) => (
                <tr key={parameter[0]}>
                  <th scope="row">{parameter[0]}</th>
                  <td>{parameter[1]}</td>
                  <td>{parameter[2]}</td>
                  <td>{parameter[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="methodology-explanation">
          <h3>Interpreting the mathematical response.</h3>

          <p>
            The coefficient 0.005 is a demonstration
            parameter, not an experimentally estimated
            physical filtration coefficient. The area
            ratio normalizes deployment against the
            original reference scale.
          </p>

          <p>
            Increasing deployment count or intensity
            increases the intervention score.
            Increasing cell area reduces the score
            when other parameters remain constant.
            The exponential transformation produces
            diminishing marginal reductions.
          </p>

          <p>
            At zero deployment or zero intervention
            intensity, the intervention concentration
            equals the baseline concentration.
          </p>
        </div>

        <div className="methodology-worked-example">
          <p className="eyebrow">
            Worked example / Illustrative model
          </p>

          <h3>Exploring hypothetical concentration changes.</h3>

          <p>
            Consider a baseline concentration of
            100 µg/m³, 25 filtration units,
            50% intervention intensity and a
            nominal cell area of 23,000 m².
          </p>

          <div className="methodology-calculation">
            <p>S = 0.005 × 25 × 0.5 × 1</p>
            <p>S = 0.0625</p>
            <p>C₁ = 100 × exp(−0.0625)</p>
          </div>

          <div className="methodology-result-grid">
            <div>
              <span>Baseline PM2.5</span>
              <strong>100.00</strong>
            </div>
            <div>
              <span>Intervention PM2.5</span>
              <strong>93.94</strong>
            </div>
            <div>
              <span>Relative reduction</span>
              <strong>6.06%</strong>
            </div>
          </div>

          <p className="methodology-caption">
            Concentrations are expressed in µg/m³.
            These values demonstrate mathematical
            behaviour, not an empirically supported
            physical dose-response relationship.
          </p>
        </div>
      </section>

      <section
        className="research-full-section"
        id="spatial-methodology"
      >
        <p className="eyebrow">
          04 / Spatial methodology
        </p>

        <h2>Representing geographical space.</h2>

        <div className="research-comparison">
          <article>
            <p className="eyebrow">
              Fixed research framework
            </p>

            <h3>Preserving the reference scale.</h3>

            <strong className="research-display-number">
              23,000 <small>m²</small>
            </strong>

            <p className="methodology-model-description">
              Each research-mode geographical cell
              has a nominal area of 23,000 m².
              The reconstructed 7 by 7 framework
              contains 49 cells, representing a
              total nominal area of 1.127 km².
            </p>

            <p className="methodology-model-description">
              Cell dimensions are derived from the
              square root of the reference area.
              Geographical boundaries are generated
              using approximate spherical offsets.
            </p>
          </article>

          <article>
            <p className="eyebrow">
              Adaptive exploration framework
            </p>

            <h3>Changing the spatial perspective.</h3>

            <strong className="research-display-number">
              48 <small>pixels</small>
            </strong>

            <p className="methodology-model-description">
              Adaptive cells are derived from a
              48-pixel reference dimension and
              estimated Web Mercator ground
              resolution at the map centre.
            </p>

            <p className="methodology-model-description">
              Map zoom and latitude determine the
              nominal cell area. The study region
              must be locked before scenarios can
              be applied, preserving the selected
              geographical configuration.
            </p>
          </article>
        </div>

        <div className="methodology-equation">
          <span className="methodology-equation-label">
            Equation 05 / Approximate ground resolution
          </span>

          <p>
            r = 2πR cos(φ) / (256 × 2<sup>z</sup>)
          </p>

          <small>
            R = 6,378,137 m; φ = centre latitude;
            z = map zoom; r = metres per pixel.
          </small>
        </div>

        <div className="methodology-equation">
          <span className="methodology-equation-label">
            Equation 06 / Nominal adaptive cell area
          </span>

          <p>A = (48r)²</p>
        </div>

        <p className="research-section-intro">
          The adaptive model supports nominal cell
          areas between 10,000 and 100,000 m².
          The geographical basemap provides context
          through OpenStreetMap. It does not supply
          environmental measurements.
        </p>
      </section>

      <section
        className="research-section"
        id="experimental-procedure"
      >
        <div className="research-section-heading">
          <p className="eyebrow">
            05 / Experimental procedure
          </p>

          <h2>Designing a hypothetical intervention.</h2>
        </div>

        <div className="research-prose">
          <ol className="research-objectives">
            <li>
              Select a reference study location and
              mathematical model.
            </li>
            <li>
              Establish the fixed or locked
              geographical study region.
            </li>
            <li>
              Configure environmental inputs and
              hypothetical deployment parameters.
            </li>
            <li>
              Apply the scenario to a selected cell,
              row, column or entire study region.
            </li>
            <li>
              Examine the calculated baseline,
              intervention and reduction values.
            </li>
            <li>
              Compare regional statistics and
              deployment sensitivity.
            </li>
            <li>
              Export the applied experiment for
              independent analysis.
            </li>
          </ol>

          <p>
            Each geographical cell is evaluated
            independently. Applying scenarios to
            multiple cells does not introduce
            atmospheric interactions between them.
          </p>

          <p>
            Intervention markers represent aggregated
            hypothetical deployment counts within
            cells rather than surveyed installation
            positions.
          </p>
        </div>
      </section>

      <section
        className="research-full-section"
        id="statistical-methodology"
      >
        <p className="eyebrow">
          06 / Experimental statistics
        </p>

        <h2>From individual cells to regional analysis.</h2>

        <p className="research-section-intro">
          Regional statistics are calculated from
          configured cells only. Unconfigured cells
          are excluded rather than interpreted as
          zero-pollution environments.
        </p>

        <div className="methodology-statistics-grid">
          <article>
            <h3>Absolute reduction</h3>

            <div className="methodology-inline-equation">
              Δ = B − J
            </div>

            <p>
              The difference between baseline B and
              intervention J, expressed in the
              output unit of the active model.
            </p>
          </article>

          <article>
            <h3>Relative reduction</h3>

            <div className="methodology-inline-equation">
              R = (B − J) / B × 100
            </div>

            <p>
              The percentage reduction relative to
              baseline. Undefined when the
              baseline equals zero.
            </p>
          </article>

          <article>
            <h3>Arithmetic mean</h3>

            <div className="methodology-inline-equation">
              μ = Σxᵢ / n
            </div>

            <p>
              The arithmetic mean of configured
              cell values. The active geographical
              framework uses equal nominal cell areas.
            </p>
          </article>

          <article>
            <h3>Population standard deviation</h3>

            <div className="methodology-inline-equation">
              σ = √(Σ(xᵢ − μ)² / n)
            </div>

            <p>
              Describes numerical variation across
              the complete configured experiment,
              rather than inferential uncertainty.
            </p>
          </article>

          <article>
            <h3>Deployment density</h3>

            <div className="methodology-inline-equation">
              D = N / (A<sub>c</sub> / 10000)
            </div>

            <p>
              Total deployment N divided by
              configured area A<sub>c</sub> in
              hectares.
            </p>
          </article>

          <article>
            <h3>Geographical coverage</h3>

            <div className="methodology-inline-equation">
              Q = A<sub>c</sub> / A<sub>t</sub> × 100
            </div>

            <p>
              Configured area relative to total
              nominal study area. This is not
              measured filtration coverage.
            </p>
          </article>
        </div>

        <div className="methodology-explanation">
          <h3>Regional relative reduction.</h3>

          <p>
            The regional relative reduction is
            calculated from the mean baseline and
            mean intervention values. It is not
            the arithmetic mean of individual
            cell-level percentage reductions.
          </p>
        </div>

        <div className="methodology-equation">
          <span className="methodology-equation-label">
            Equation 07 / Regional relative reduction
          </span>

          <p>R = (B̄ − J̄) / B̄ × 100</p>
        </div>

        <div className="methodology-explanation">
          <h3>Deployment sensitivity.</h3>

          <p>
            The selected cell is evaluated across
            alternative integer deployment counts
            from zero to 125 while other applied
            model parameters remain constant.
          </p>

          <p>
            The resulting sensitivity curve describes
            the response of the chosen mathematical
            model. It does not modify the applied
            scenario or establish an independently
            validated dose-response relationship.
          </p>
        </div>
      </section>

      <section
        className="research-section"
        id="reproducibility"
      >
        <div className="research-section-heading">
          <p className="eyebrow">
            07 / Experimental reproducibility
          </p>

          <h2>Making calculations inspectable.</h2>
        </div>

        <div className="research-prose">
          <p>
            The analytical workspace exposes
            intermediate mathematical contributions,
            regional descriptive statistics,
            deployment sensitivity and configured
            cell-level results.
          </p>

          <p>
            CSV exports contain configured cell
            records, environmental parameters,
            geographical information and calculated
            outcomes.
          </p>

          <p>
            JSON exports additionally preserve the
            complete active geographical grid,
            model-specific scenario results and
            regional statistical information.
          </p>

          <p>
            Both formats retain underlying numerical
            precision and include scientific
            limitations. Files are generated locally
            within the browser.
          </p>

          <p>
            Exports contain applied configurations
            only. The application currently does
            not restore experimental sessions from
            previously exported files.
          </p>
        </div>
      </section>

      <section
        className="research-full-section"
        id="scientific-limitations"
      >
        <p className="eyebrow">
          08 / Scientific limitations
        </p>

        <h2>Knowing where the model ends.</h2>

        <p className="research-section-intro">
          Responsible interpretation requires a
          distinction between mathematical
          behaviour and independently established
          environmental evidence.
        </p>

        <div className="methodology-limitations-grid">
          {limitations.map((limitation, index) => (
            <article key={limitation.title}>
              <span className="research-stage-index">
                {String(index + 1).padStart(2, '0')}
              </span>

              <h3>{limitation.title}</h3>

              <p>{limitation.description}</p>
            </article>
          ))}
        </div>

        <aside className="research-note">
          <strong>Appropriate scientific use</strong>

          <p>
            ECOSIMULATE is intended for transparent
            computational exploration, conceptual
            experimentation and critical discussion
            of environmental modelling assumptions.
            Its results must not be interpreted as
            validated forecasts or deployment
            recommendations.
          </p>
        </aside>
      </section>

      <section className="research-closing">
        <div>
          <p className="eyebrow">
            From methodology to experimentation
          </p>

          <h2>Examine the assumptions in practice.</h2>
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
            to="/research"
          >
            Research overview <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </div>
  )
}
