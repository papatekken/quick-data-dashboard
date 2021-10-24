import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Typography from "typography"
import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header  />
      <div
        style={{
          margin: `0 auto`,
          
        }}
      >
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()} {` `} Dashboard demo - Allan
		  <div>
		  Icons made by Vectors Market from  www.flaticon.com
		  </div>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
