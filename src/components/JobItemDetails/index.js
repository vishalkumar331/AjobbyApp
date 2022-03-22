import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {GoLinkExternal} from 'react-icons/go'
import './index.css'
import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'
import Skill from '../SkillI'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  failed: 'FAILED',
  success: 'SUCCESS',
}

class JobItemDetails extends Component {
  state = {jobItemDetailsStatus: apiStatusConstants.failed, jobItemDetails: {}}

  componentDidMount() {
    this.getJobItemDetails()
  }

  renderUpdatedFetchedData = fetchedData => ({
    jobDetails: {
      id: fetchedData.job_details.id,
      title: fetchedData.job_details.title,
      companyLogoUrl: fetchedData.job_details.company_logo_url,
      companyWebsiteUrl: fetchedData.job_details.company_website_url,
      employmentType: fetchedData.job_details.employment_type,
      jobDescription: fetchedData.job_details.job_description,
      lifeAtCompany: {
        description: fetchedData.job_details.life_at_company.description,
        imageUrl: fetchedData.job_details.life_at_company.image_url,
      },
      location: fetchedData.job_details.location,
      packagePerAnnum: fetchedData.job_details.package_per_annum,
      rating: fetchedData.job_details.rating,
      skills: fetchedData.job_details.skills.map(eachSkill => ({
        name: eachSkill.name,
        imageUrl: eachSkill.image_url,
      })),
    },
    similarJobs: fetchedData.similar_jobs.map(eachSimilarJob => ({
      companyLogoUrl: eachSimilarJob.company_logo_url,
      employmentType: eachSimilarJob.employment_type,
      jobDescription: eachSimilarJob.job_description,
      location: eachSimilarJob.location,
      rating: eachSimilarJob.rating,
      title: eachSimilarJob.title,
      id: eachSimilarJob.id,
    })),
  })

  getJobItemDetails = async () => {
    this.setState({jobItemDetailsStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {id} = match.params

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()

      const updatedJobItemDetails = this.renderUpdatedFetchedData(fetchedData)

      this.setState({
        jobItemDetails: updatedJobItemDetails,
        jobItemDetailsStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({jobItemDetailsStatus: apiStatusConstants.failed})
    }
  }

  renderSelectedJobItemDetails = () => {
    const {jobItemDetails} = this.state
    const {jobDetails} = jobItemDetails
    const {
      title,
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      skills,
      packagePerAnnum,
      rating,
      lifeAtCompany,
    } = jobDetails

    return (
      <div className="jobItemDetails_container">
        <div className="jobItemDetails_logo_jobRole_container">
          <img
            src={companyLogoUrl}
            className="jobItemDetails_company_logo"
            alt="job details company logo"
          />
          <div className="jobItemDetails_tile_and_ratings">
            <h1 className="jobItemDetails_jobRole_tile">{title}</h1>
            <div className="jobItemDetails_rating_container">
              <AiFillStar className="jobItemDetails_star_image" />
              <p className="jobItemDetails_rating_number">{rating}</p>
            </div>
          </div>
        </div>
        <div className="jobItemDetails_address_and_package">
          <div className="jobItemDetails_address">
            <li className="jobItemDetails_icon_container">
              <MdLocationOn className="jobItemDetails_address_icon" />
              <p className="jobItemDetails_address_icon_description">
                {location}
              </p>
            </li>
            <li className="jobItemDetails_icon_container">
              <BsFillBriefcaseFill className="jobItemDetails_address_icon" />
              <p className="jobItemDetails_address_icon_description">
                {employmentType}
              </p>
            </li>
          </div>
          <p className="jobItemDetails_package">{packagePerAnnum}</p>
        </div>
        <hr className="jobItemDetails_line" />
        <div className="jobItemDetails_description_visit_Container">
          <h1 className="jobItemDetails_description_heading">Description</h1>
          <div className="jobItemDetails_visit_container">
            <a href={companyWebsiteUrl} className="jobItemDetails_visit_btn">
              Visit
            </a>
            <GoLinkExternal className="jobItemDetails_visit_icon" />
          </div>
        </div>
        <p className="jobItemDetails_description">{jobDescription}</p>
        <h1 className="jobItemDetails_skills_heading">Skills</h1>
        <ul className="jobItemDetails_skills_list">
          {skills.map(eachSkill => (
            <Skill skillDetails={eachSkill} key={eachSkill.name} />
          ))}
        </ul>
        <div className="life_at_company">
          <div className="life_at_company_details">
            <h1 className="life_at_company_heading">Life at Company</h1>
            <p className="life_at_company_description">
              {lifeAtCompany.description}
            </p>
          </div>
          <img
            src={lifeAtCompany.imageUrl}
            className="life_at_company_image"
            alt="life at company"
          />
        </div>
      </div>
    )
  }

  renderJobItemDetailsSuccessView = () => {
    const {jobItemDetails} = this.state
    const {similarJobs} = jobItemDetails

    return (
      <div className="jobItemDetails_pg">
        {this.renderSelectedJobItemDetails()}
        <h1 className="SimilarJobHeading">Similar Jobs</h1>
        <ul className="similar_jobs_list">
          {similarJobs.map(each => (
            <SimilarJobItem similarJobDetails={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  retryRenderingJobItemDetails = () => {
    this.getJobItemDetails()
  }

  renderJobItemDetailsFailureView = () => (
    <div className="jobItemDetailsFailureView">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="jobItemDetailsFailureImage"
        alt="failure view"
      />
      <h1 className="jobItemDetailsFailureHeading">
        Oops! Something Went Wrong
      </h1>
      <p className="jobItemDetailsFailureDescription">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="jobItemDetailsFailure_retryBtn"
        onClick={this.retryRenderingJobItemDetails}
      >
        Retry
      </button>
    </div>
  )

  renderJobItemDetailsLoaderView = () => (
    <div className="jobItemDetails_loader_container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobItemDetailsView = () => {
    const {jobItemDetailsStatus} = this.state

    switch (jobItemDetailsStatus) {
      case apiStatusConstants.inProgress:
        return this.renderJobItemDetailsLoaderView()
      case apiStatusConstants.failed:
        return this.renderJobItemDetailsFailureView()
      case apiStatusConstants.success:
        return this.renderJobItemDetailsSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderJobItemDetailsView()}
      </>
    )
  }
}

export default JobItemDetails
