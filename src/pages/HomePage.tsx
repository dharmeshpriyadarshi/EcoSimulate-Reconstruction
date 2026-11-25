import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeading from '../components/ui/PageHeading'
import { siteConfig } from '../config/site'

export default function HomePage() {
  return (
    <div className="container page">
      <PageHeading
        eyebrow="Environmental Modelling Research"
        title="ECOSIMULATE"
        description={siteConfig.title}
      />

      <section className="panel">
        <h2>Exploring pollution mitigation through simulation</h2>

        <p>
          An interactive research demonstration investigating how
          hypothetical environmental interventions can be represented
          through computational models.
        </p>

        <div className="button-row">
          <Link className="button button-primary" to="/simulator">
            Explore simulator <ArrowRight size={17} />
          </Link>

          <a
            className="button button-secondary"
            href={siteConfig.publication.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read published research <ArrowUpRight size={17} />
          </a>
        </div>
      </section>
    </div>
  )
}
