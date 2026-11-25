import PageHeading from '../components/ui/PageHeading'

export default function ContinuityPage() {
  return (
    <div className="container page">
      <PageHeading
        eyebrow="Research Continuity"
        title="Beyond ECOSIMULATE"
        description="Following the progression from environmental mitigation simulation toward atmospheric data analysis and predictive modelling."
      />

      <section className="panel">
        <h2>Veridian</h2>

        <p>
          ECOSIMULATE helped establish an environmental modelling
          research direction that later motivated Veridian, a separate
          investigation into multi-city air quality forecasting.
        </p>

        <p>
          Veridian is a distinct research project rather than a direct
          extension of this simulation implementation.
        </p>
      </section>
    </div>
  )
}
