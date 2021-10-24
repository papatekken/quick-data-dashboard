import React from "react"
import { navigate } from "gatsby"
import { isAuthenticated,logout } from "../services/auth"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
	
  if (!isAuthenticated()) {
    logout()
    return null
  }

  return <Component {...rest} />
}

export default PrivateRoute