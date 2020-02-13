import React, { Component } from 'react';

import './theme.css'
import Signup from './component/Signup/signup';
import { env } from './component/config/config';


class App extends Component {
  componentDidMount() {
    window.FB.init({
        appId: env.facebook_client_id,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v3.3'
    });
}
  render() {
    return (
      <Signup />
    );
  }
}

export default App;
