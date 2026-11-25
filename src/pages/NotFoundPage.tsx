import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeading from '../components/ui/PageHeading'

export default function NotFoundPage() {
  return (
    <div className="container page">
      <PageHeading
        eyebrow="404 - Page Not Found"
        title="This page does not exist."
        description="The requested resource could not be found. Return to the ECOSIMULATE home page to continue exploring."
      />

      <div className="button-row">
        <Link className="button button-primary" to="/">
          <ArrowLeft size={17} /> Return home
        </Link>
      </div>
    </div>
  )
}
