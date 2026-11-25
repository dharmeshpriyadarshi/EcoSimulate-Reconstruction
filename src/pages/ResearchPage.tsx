import { ArrowUpRight } from 'lucide-react'
import PageHeading from '../components/ui/PageHeading'
import { siteConfig } from '../config/site'

export default function ResearchPage() {
  return (
    <div className="container page">
      <PageHeading
        eyebrow="Research Overview"
        title="The research behind ECOSIMULATE"
        description="Understanding environmental pollution and the role of computational simulation in exploring hypothetical mitigation strategies."
      />

      <section className="panel">
        <h2>Published research</h2>

        <p>{siteConfig.title}</p>
        <p>{siteConfig.publication.conference}</p>
        <p>DOI: {siteConfig.publication.doi}</p>

        <div className="button-row">
          <a
            className="button button-primary"
            href={siteConfig.publication.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            View publication <ArrowUpRight size={17} />
          </a>
        </div>
      </section>
    </div>
  )
}
