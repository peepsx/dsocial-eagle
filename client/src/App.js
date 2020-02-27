import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './theme.css'
import Signup from './component/Signup/signup';
import { env } from './component/config/config';
import { API } from './component/js/api_list';
import Axios from 'axios';
import Ipexist from './component/Signup/forms/errorIP';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import InstaView from './component/instagramView/instaView';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ip: true
    }
  }
  async componentDidMount() {
    window.FB.init({                // Initialising Facebook connectivity
      appId: env.facebook_client_id,
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v3.3'
    });

    const ip = { v4: '', v6: '' }  // Device Public IP
    await fetch('https://api.ipify.org/')
      .then(res => res.text())
      .then(res => ip.v4 = res)

    await fetch('https://api6.ipify.org/')
      .then(res => res.text())
      .then(res => ip.v6 = res)

    this.handleIpCheck(ip);
  }

  handleIpCheck = (ipData) => {
    Axios({
      url: API.ip_check,
      method: 'post',
      data: {
        ip: ipData
      }
    })
      .then(response => {
        this.setState({ ip: response.data.success });
      })
      .catch(error => console.error('IP', error))
  }

  render() {
    if (!this.state.ip) {
      return <Ipexist />;
    } else {
      return (
        <React.Fragment>
          <ToastContainer />            {/*  Initiate Toaster instance */}
          <BrowserRouter>
            <Switch>
              <Route path="/" component={Signup} exact />
              <Route path="/instagramLogin" component={InstaView} exact />
            </Switch>
          </BrowserRouter>
        </React.Fragment>
      );
    }
  }
}

export default App;
