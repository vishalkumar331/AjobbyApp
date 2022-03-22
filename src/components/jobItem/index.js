import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <li className="jobItem_container">
      <Link to={`/jobs/${id}`} style={{textDecoration: 'none'}}>
        <div className="JobItem_logo_jobRole_container">
          <img
            src={companyLogoUrl}
            className="JobItem_company_logo"
            alt="company logo"
          />
          <div className="JobItem_tile_and_ratings">
            <h1 className="JobItem_jobRole_tile">{title}</h1>
            <div className="JobItem_rating_container">
              <AiFillStar className="JobItem_star_image" />
              <p className="JobItem_rating_number">{rating}</p>
            </div>
          </div>
        </div>
        <div className="JobItem_address_and_package">
          <div className="JobItem_address">
            <MdLocationOn className="JobItem_address_icon" />
            <p className="JobItem_address_icon_description">{location}</p>
            <BsFillBriefcaseFill className="JobItem_address_icon" />
            <p className="JobItem_address_icon_description">{employmentType}</p>
          </div>
          <p className="JobItem_package">{packagePerAnnum}</p>
        </div>
        <hr className="JobItem_line" />
        <h1 className="jobItem_description_heading">Description</h1>
        <p className="jobItem_description">{jobDescription}</p>
      </Link>
    </li>
  )
}
export default JobItem
