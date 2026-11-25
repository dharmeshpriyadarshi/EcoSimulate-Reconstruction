import PageHeading from '../components/ui/PageHeading'

export default function MethodologyPage() {
  return (
    <div className="container page">
      <PageHeading
        eyebrow="Scientific Transparency"
        title="Methodology and limitations"
        description="Understanding the assumptions, mathematical logic and limitations behind the reconstructed simulation demonstrator."
      />

      <section className="panel">
        <h2>Scientific interpretation</h2>

        <p>
          This website reconstructs the research demonstration.
          It does not report new experiments or establish validated
          real-world filtration effectiveness.
        </p>

        <p>
          The illustrative simulation model will be documented here
          once its calculation logic has been implemented.
        </p>
      </section>
    </div>
  )
}
