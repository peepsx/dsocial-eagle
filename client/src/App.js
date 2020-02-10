import React, { Component } from 'react';
require('dotenv').config()

import './theme.css'
import Signup from './component/Signup/signup';


class App extends Component {
  render() {
    return (
      <Signup />
    );
  }
}

export default App;
