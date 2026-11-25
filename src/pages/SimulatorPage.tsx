import PageHeading from '../components/ui/PageHeading'

export default function SimulatorPage() {
  return (
    <div className="container page">
      <PageHeading
        eyebrow="Interactive Research Demonstration"
        title="Simulation workspace"
        description="Explore illustrative PM2.5 mitigation scenarios using adjustable environmental intervention parameters."
      />

      <section className="panel">
        <h2>Environmental scenario simulator</h2>

        <p>
          The simulation engine and interactive controls are currently
          under development.
        </p>

        <p>
          Future numerical outputs will represent hypothetical model
          behaviour, not measured environmental outcomes.
        </p>
      </section>
    </div>
  )
}
