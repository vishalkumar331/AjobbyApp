import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import './index.css'
import JobItem from '../jobItem'

import Header from '../Header'
import EmploymentType from '../EmploymentType'
import SalaryRangeItem from '../SalaryRangeItem'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failed: 'FAILED',
  inProgress: 'IN_PROGRESS',
}

const initialValues = {
  employmentTypeList: [],
  salaryRange: '',
  searchInput: '',
}

class Jobs extends Component {
  state = {
    profileDetails: {},
    profileStatus: apiStatusConstants.initial,
    jobsListStatus: apiStatusConstants.initial,
    jobsList: [],
    searchInput: initialValues.searchInput,
    salaryRange: initialValues.salaryRange,
    employmentTypeList: initialValues.employmentTypeList,
  }

  componentDidMount() {
    this.getJobsList()
    this.getUserInfo()
  }

  getUserInfo = async () => {
    this.setState({profileStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const fetchedData = await response.json()

      const updatedData = {
        name: fetchedData.profile_details.name,
        profileImageUrl: fetchedData.profile_details.profile_image_url,
        shortBio: fetchedData.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        profileStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({profileStatus: apiStatusConstants.failed})
    }
  }

  renderApiUrl = () => {
    const {employmentTypeList, salaryRange, searchInput} = this.state
    const employmentTypes =
      employmentTypeList !== '' ? employmentTypeList.join() : ''

    let apiUrl = ''
    if (
      employmentTypeList !== initialValues.employmentTypeList &&
      salaryRange === initialValues.salaryRange &&
      searchInput === initialValues.searchInput
    ) {
      apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypes}`
    } else if (
      employmentTypeList === initialValues.employmentTypeList &&
      salaryRange !== initialValues.salaryRange &&
      searchInput === initialValues.searchInput
    ) {
      apiUrl = `https://apis.ccbp.in/jobs?minimum_package=${salaryRange}`
    } else if (
      employmentTypeList === initialValues.employmentTypeList &&
      salaryRange === initialValues.salaryRange &&
      searchInput !== initialValues.searchInput
    ) {
      apiUrl = `https://apis.ccbp.in/jobs?search=${searchInput}`
    } else {
      apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypes}&minimum_package=${salaryRange}&search=${searchInput}`
    }

    return apiUrl
  }

  getJobsList = async () => {
    this.setState({jobsListStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = this.renderApiUrl()

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = {
        jobs: fetchedData.jobs.map(eachJob => ({
          companyLogoUrl: eachJob.company_logo_url,
          employmentType: eachJob.employment_type,
          id: eachJob.id,
          jobDescription: eachJob.job_description,
          location: eachJob.location,
          packagePerAnnum: eachJob.package_per_annum,
          rating: eachJob.rating,
          title: eachJob.title,
        })),
      }
      this.setState({
        jobsList: updatedData.jobs,
        jobsListStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({jobsListStatus: apiStatusConstants.failed})
    }
  }

  onUpdatingSalaryRange = updatedSalary => {
    this.setState({salaryRange: updatedSalary}, this.getJobsList)
  }

  renderSalaryRangesCategory = () => (
    <>
      <h1 className="salary_ranges_heading">Salary Range</h1>
      <ul className="salary_ranges_container">
        {salaryRangesList.map(eachRange => (
          <SalaryRangeItem
            salaryItemDetails={eachRange}
            onUpdatingSalaryRange={this.onUpdatingSalaryRange}
            key={eachRange.salaryRangeId}
          />
        ))}
      </ul>
    </>
  )

  onClickingSearch = () => {
    this.getJobsList()
  }

  updateSearchInput = event => {
    const {value} = event.target

    return this.setState({searchInput: value})
  }

  renderSmallViewSearchBar = () => {
    const {searchInput} = this.state
    return (
      <div className="search_container_sm">
        <input
          type="search"
          placeholder="Search"
          className="search_input"
          onChange={this.updateSearchInput}
          value={searchInput}
        />
        <button
          type="button"
          testid="searchButton"
          className="search_btn"
          onClick={this.onClickingSearch}
        >
          <BsSearch className="search_icon" />
        </button>
      </div>
    )
  }

  renderLargeViewSearchBar = () => {
    const {searchInput} = this.state
    return (
      <div className="search_container_lg">
        <input
          type="search"
          placeholder="Search"
          className="search_input"
          onChange={this.updateSearchInput}
          value={searchInput}
        />
        <button
          type="button"
          testid="searchButton"
          className="search_btn"
          onClick={this.onClickingSearch}
        >
          <BsSearch className="search_icon" />
        </button>
      </div>
    )
  }

  onUpdatingEmploymentType = (isChecked, employmentType) => {
    const {employmentTypeList} = this.state
    let newEmploymentTypeList = employmentTypeList

    if (isChecked) {
      newEmploymentTypeList.push(employmentType)
    } else {
      newEmploymentTypeList = newEmploymentTypeList.filter(
        each => each !== employmentType,
      )
    }
    this.setState({employmentTypeList: newEmploymentTypeList}, this.getJobsList)
  }

  renderJobTypeCategory = () => (
    <>
      <h1 className="employment_type_heading">Type of Employment</h1>
      <ul className="employment_category">
        {employmentTypesList.map(eachType => (
          <EmploymentType
            employmentType={eachType}
            onUpdatingEmploymentType={this.onUpdatingEmploymentType}
            key={eachType.employmentTypeId}
          />
        ))}
      </ul>
    </>
  )

  renderProfileInfoSuccess = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile_container">
        <img src={profileImageUrl} className="profile_image" alt="profile" />
        <h1 className="userName">{name}</h1>
        <p className="jobRole">{shortBio}</p>
      </div>
    )
  }

  retryRenderingProfile = () => {
    this.getUserInfo()
  }

  renderProfileInfoFailure = () => (
    <div className="Retry_button_container">
      <button
        type="button"
        className="retry_btn"
        onClick={this.retryRenderingProfile}
      >
        Retry
      </button>
    </div>
  )

  renderProfileInfoLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfile = () => {
    const {profileStatus} = this.state

    switch (profileStatus) {
      case apiStatusConstants.inProgress:
        return this.renderProfileInfoLoader()
      case apiStatusConstants.success:
        return this.renderProfileInfoSuccess()
      case apiStatusConstants.failed:
        return this.renderProfileInfoFailure()
      default:
        return null
    }
  }

  retryRenderingJobsList = () => {
    this.getJobsList()
  }

  renderJobsFailureView = () => (
    <div className="jobsFailure_container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="jobs_failure_image"
        alt="failure view"
      />
      <h1 className="jobs_failure_heading">Oops! Something Went Wrong</h1>
      <p className="jobs_failure_description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry_btn"
        onClick={this.retryRenderingJobsList}
      >
        Retry
      </button>
    </div>
  )

  renderNoJobsView = () => (
    <div className="no_jobs_container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        className="no_jobs_image"
        alt="no jobs"
      />
      <h1 className="no_jobs_heading">No Jobs Found</h1>
      <p className="no_jobs_description">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  renderJobsSuccessView = () => {
    const {jobsList} = this.state

    return jobsList.length === 0
      ? this.renderNoJobsView()
      : jobsList.map(eachJob => (
          <JobItem jobDetails={eachJob} key={eachJob.id} />
        ))
  }

  renderJobsList = () => {
    const {jobsListStatus} = this.state

    switch (jobsListStatus) {
      case apiStatusConstants.inProgress:
        return this.renderProfileInfoLoader()
      case apiStatusConstants.failed:
        return this.renderJobsFailureView()
      case apiStatusConstants.success:
        return this.renderJobsSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs_pg">
          <div className="jobs_categories_section">
            {this.renderSmallViewSearchBar()}
            {this.renderProfile()}
            <hr className="line" />
            {this.renderJobTypeCategory()}
            <hr className="line" />
            {this.renderSalaryRangesCategory()}
          </div>
          <div className="jobs_container">
            {this.renderLargeViewSearchBar()}
            <ul className="jobs_list">{this.renderJobsList()}</ul>
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
