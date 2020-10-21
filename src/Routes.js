import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Profile from './pages/Profile'
import Home from './pages/Home'

function MainRouter(props) {


    return(
      <div>
        <nav className="shadow-sm p-3 mb-5 bg-white rounded navbar navbar-primary bg-light">
          <a className="navbar-brand" onClick={() => props.history.goBack() } href="/">GitHub Profiles</a>
        </nav>
          <Router>
              <Route exact  component={Home} path={'/'}/>
              <Route component={Profile} path={'/profile'}/>
          </Router>
      </div>
    );
}


export default MainRouter;