import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './theme.css'
import Signup from './component/Signup/signup';
import { env } from './component/config/config';


class App extends Component {
  componentDidMount() {
    window.FB.init({                // Initialising Facebook connectivity
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
        <Signup />
      </React.Fragment>
    );
  }
}

export default App;
