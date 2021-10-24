import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import PrivateRoute from "../components/privateRoute"

import mView from "../components/mView"



const App = () => (
  <Layout>
    <Router>
		<PrivateRoute path="/dashboard/mView" component={mView} />
    </Router>
  </Layout>
)

export default App