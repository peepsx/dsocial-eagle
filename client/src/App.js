import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import './theme.css'
import Signup from './component/Signup/signup';
import { env } from './component/config/config';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import InstaView from './component/Signup/forms/view/InstaView';
import Welcome from './component/welcomePage';


class App extends Component {
  
  async componentDidMount() {
    localStorage.removeItem('a_user');
    localStorage.removeItem('transaction_id');
    await window.FB.init({                // Initialising Facebook connectivity
      appId: env.facebook_client_id,
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v3.3'
    });
  }
  
  render() {
    return (
      <React.Fragment>
        <ToastContainer />            {/*  Initiate Toaster instance */}
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Signup} exact />
            <Route path="/welcome" component={Welcome} exact />
            {/* <Route path="/instagramLogin" component={InstaView} /> */}
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
