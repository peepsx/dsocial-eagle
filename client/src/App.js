import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import './theme.css'
import Signup from './component/Signup/signup';
import email from './component/Signup/forms/first';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Welcome from './component/welcomePage';
  

class App extends Component {
  

  
  render() {
    return (
      <React.Fragment>
        <ToastContainer />            {/*  Initiate Toaster instance */}
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Signup} exact />
            {/* <Route path="/email/verify" component={email} /> */}
            {/* <Route path="/mobile/verify" component={mobile} /> */}
            {/* <Route path="/term/condition" component={terms} /> */}
            <Route path="/welcome" component={Welcome} exact />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
