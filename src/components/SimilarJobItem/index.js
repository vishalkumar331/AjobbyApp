import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobItem = props => {
  const {similarJobDetails} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails

  return (
    <li className="similar_jobItem">
      <Link to={`/jobs/${id}`} className="similarJobItem_content">
        <div className="similarJob_logo_and_jobRole">
          <img
            src={companyLogoUrl}
            className="similarJob_logo"
            alt="similar job company logo"
          />
          <div className="similarJob_role_and_rating">
            <h1 className="similarJob_role_heading">{title}</h1>
            <div className="similarJob_rating_container">
              <AiFillStar className="similarjob_star" />
              <p className="similarJob_rating">{rating}</p>
            </div>
          </div>
        </div>
        <h1 className="similarJob_description_heading">Description</h1>
        <p className="similarJob_description">{jobDescription}</p>
        <div className="similar_address_and_employment_type">
          <MdLocationOn className="similar_address_icon" />
          <p className="similar_address_icon_details">{location}</p>
          <BsFillBriefcaseFill className="similar_address_icon" />
          <p className="similar_address_icon_details">{employmentType}</p>
        </div>
      </Link>
    </li>
  )
}

export default SimilarJobItem
