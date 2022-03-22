import Header from '../Header'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="notFound_view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        className="notfound_image"
        alt="not found"
      />
      <h1 className="notFound_heading">Page Not Found</h1>
      <p className="notFound_description">
        We&apos;re sorry, the page you requested could not be found.
      </p>
    </div>
  </>
)

export default NotFound
