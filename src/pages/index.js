import React from "react"
import { Link } from "gatsby"
import {navigate} from "gatsby"
import { login, isAuthenticated, getProfile }  from "../services/auth"

import Layout from "../components/layout"

export default function Home() {
	try { 	
	  if (!isAuthenticated()) {
		login()
		return <p>Redirecting to login...</p>
	  }
		else
			navigate(`/dashboard/mView`);
		
		
	} catch (e) {
		console.log(e)
	}
  	
  return (
      <Layout>
      <p>
		Please click <Link to="/​​dashboard/mView">here</Link>
      </p>
    </Layout>
  )
}