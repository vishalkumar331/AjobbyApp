import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', isError: false, errorMsg: ''}

  componentDidMount() {
    this.checkUserToken()
  }

  checkUserToken = () => {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      const {history} = this.props
      history.replace('/')
    }
  }

  updateUsername = event => {
    const {value} = event.target
    this.setState({username: value})
  }

  updatePassword = event => {
    const {value} = event.target
    this.setState({password: value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({isError: true, errorMsg})
  }

  submitUserDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userDetails = {
      username,
      password,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const fetchedData = await response.json()
    if (response.ok === true) {
      const jwtToken = fetchedData.jwt_token
      this.onSubmitSuccess(jwtToken)
    } else {
      const errorMsg = fetchedData.error_msg
      this.onSubmitFailure(errorMsg)
    }
  }

  render() {
    const {username, password, isError, errorMsg} = this.state
    return (
      <div className="login_pg">
        <form
          type="submit"
          className="login_form"
          onSubmit={this.submitUserDetails}
        >
          <div className="login_logo_container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              className="login_logo"
              alt="website logo"
            />
          </div>
          <div className="login_input_container">
            <label htmlFor="USERNAME" className="login_input_label">
              USERNAME
            </label>
            <input
              id="USERNAME"
              type="text"
              className="login_input_element"
              placeholder="Username"
              value={username}
              onChange={this.updateUsername}
            />
          </div>
          <div className="login_input_container">
            <label htmlFor="PASSWORD" className="login_input_label">
              PASSWORD
            </label>
            <input
              id="PASSWORD"
              type="password"
              className="login_input_element"
              placeholder="Password"
              value={password}
              onChange={this.updatePassword}
            />
          </div>
          <button type="submit" className="login_button">
            Login
          </button>
          {isError && <p className="error_msg">* {errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default Login
