import '../styles/collage.css'

export default function EnvironmentalCollage() {
  return (
    <figure className="environmental-collage">
      <div className="collage-board">
        <article className="clipping clipping-headline">
          <div className="clipping-masthead">
            <span>Environmental Briefing</span>
            <span>No. 01</span>
          </div>

          <p className="clipping-headline-text">
            The burden of
            <br />
            polluted air.
          </p>

          <p className="clipping-subheadline">
            An environmental challenge beyond what we can see.
          </p>

          <div className="clipping-columns">
            <p>
              Emissions from transportation, industry and combustion
              contribute to the deterioration of ambient air quality.
            </p>

            <p>
              Understanding how pollutants behave is essential to
              evaluating potential mitigation strategies.
            </p>
          </div>
        </article>

        <figure className="clipping clipping-photograph">
          <img
            src="/images/delhi-smog-2016.jpg"
            alt="Nighttime smog illuminated by a streetlight in Delhi, India"
            width={3200}
            height={2400}
            fetchPriority="high"
          />

          <figcaption>
            Delhi, India / November 2016
          </figcaption>
        </figure>

        <article className="clipping clipping-statistic">
          <p className="clipping-statistic-label">
            Global estimate / 2019
          </p>

          <p className="clipping-statistic-value">
            4.2 million
          </p>

          <p className="clipping-statistic-description">
            Estimated premature deaths worldwide attributable
            to outdoor air pollution.
          </p>

          <a
            className="clipping-source"
            href="https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source: World Health Organization
          </a>
        </article>

        <div className="collage-annotation" aria-hidden="true">
          Environmental context
          <br />
          Field notes / 001
        </div>
      </div>

      <figcaption className="collage-caption">
        <span>
          Fig. 01 — Environmental context. Original editorial composition.
        </span>

        <span>
          Photograph:
          {' '}
          <a
            href="https://commons.wikimedia.org/wiki/File:Delhi_Smog.jpg"
            target="_blank"
            rel="noopener noreferrer"
          >
            AnkClix
          </a>
          {' / '}
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            CC BY-SA 4.0
          </a>
          . Grayscale presentation and cropping applied.
        </span>
      </figcaption>
    </figure>
  )
}
