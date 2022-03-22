import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'

import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const Header = props => {
  const onUserLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="navbar">
      <Link to="/" style={{textDecoration: 'none'}}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="navbar_logo"
          alt="website logo"
        />
      </Link>
      <div className="navbar_links">
        <Link to="/" style={{textDecoration: 'none'}}>
          <p className="nav_link">Home</p>
        </Link>
        <Link to="/jobs" style={{textDecoration: 'none'}}>
          <p className="nav_link">Jobs</p>
        </Link>
      </div>
      <button type="button" className="navbar_logout" onClick={onUserLogout}>
        Logout
      </button>
      <div className="navLink_icons">
        <Link to="/" style={{textDecoration: 'none'}}>
          <AiFillHome className="navLink_icon" />
        </Link>
        <Link to="/jobs" style={{textDecoration: 'none'}}>
          <BsFillBriefcaseFill className="navLink_icon" />
        </Link>
        <FiLogOut className="navLink_icon" onClick={onUserLogout} />
      </div>
    </div>
  )
}

export default withRouter(Header)
