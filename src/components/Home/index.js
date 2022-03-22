import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home_pg">
      <ul className="home_textContent">
        <li className="home_element">
          <h1 className="home_heading">Find The Job That Fits Your Life</h1>
        </li>
        <li className="home_element">
          <p className="home_description">
            Millions of people are searching for jobs,salary information,company
            reviews.Find the job that fits your abilities.
          </p>
        </li>
        <li className="home_element">
          <Link to="/jobs">
            <button type="button" className="Find_jobs_btn">
              Find Jobs
            </button>
          </Link>
        </li>
      </ul>
      <p className="footer">Vishal</p>
    </div>
  </>
)

export default Home
