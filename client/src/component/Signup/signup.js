import React, { Component } from 'react';
import Axios from 'axios';

import './signup.css'
import First from './forms/first';
import Second from './forms/second';
import Third from './forms/third';
import Fourth from './forms/fourth';
import Fifth from './forms/fifth';
import { API } from '../js/api_list';
import Ipexist from './forms/errorIP';
import Help from '../help';
import { env } from '../config/config';
import { Redirect } from 'react-router-dom';
import ConfirmUser from '../SignupSystem/ConfirmUser'

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ip: true
        }
        this.handleIpCheck = this.handleIpCheck.bind(this);
    }

    async componentDidMount() {
        if (sessionStorage.getItem('user')) {
            const ip = { v4: '', v6: '' }  // Device Public IP
            await fetch('https://api.ipify.org/')
                .then(res => res.text())
                .then(res => ip.v4 = res)

            await fetch('https://api64.ipify.org/')
                .then(res => res.text())
                .then(res => ip.v6 = res)

            await this.handleIpCheck(ip);
        }
    }

    async handleIpCheck(ipData){
        await Axios({
            url: API.ip_check,
            method: 'post',
            data: {
                ip: ipData
            }
        })
            .then( async (response) => {
                this.setState({ ip: response.data.success });
                if (response.data.success && window.location.href === env.liveStatus) {
                    await document.getElementById('helpRef').click();
                }
            })
            .catch(error => console.error('IP', error))
    }

    render() {
        // if (!sessionStorage.getItem('user')) {
        //     return <Redirect to="/welcome" />
        // } else {
            return (
                <section className="bg-gradient-4 height-100 p-3">
                    {/* <img src="assets/img/header-17.jpg" alt="bg" className="bg-image opacity-10" /> */}
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-11 col-lg-12">
                                <div className="text-center">
                                    <img className="w-15" src="assets/img/arisen/dsocial.png" alt="Logo" />
                                    {/* <p className="color-white h2">Arisen Air-Drop</p> */}
                                </div>
                                <div className="wizard card" autoComplete="off" name="signup">
                                    <ul className="nav nav-tabs card-header text-center bg-light p-0" id="navActive">
                                        <li className="nav-item flex-fill noClick">
                                            <a className="nav-link noClick" href="#first">1. Your Account</a>
                                        </li>
                                        <li className="nav-item flex-fill noClick">
                                            <a className="nav-link noClick" href="#second">2. Verify Email</a>
                                        </li>
                                        <li className="nav-item flex-fill noClick">
                                            <a className="nav-link noClick" href="#third">3. Verify Phone</a>
                                        </li>
                                        <li className="nav-item flex-fill noClick">
                                            <a className="nav-link noClick" href="#fourth">4. Agree To Terms</a>
                                        </li>
                                        {/* <li className="nav-item flex-fill noClick">
                                            <a className="nav-link noClick" href="#fifth">5. Confirm Username</a>
                                        </li> */}
                                        <li className="nav-item flex-fill noClick">
                                            <a className="nav-link noClick" href="#sixth">5. You Got Coins!</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content">
                                        <div id="first">
                                            <Fourth />
                                        </div>
                                        <div id="second">
                                            <First />
                                        </div>
                                        <div id="third">
                                            <Second />
                                        </div>
                                        <div id="fourth">
                                            <Third />
                                        </div>
                                        <div id="fifth">
                                            <ConfirmUser />
                                        </div>
                                        <div id="sixth">
                                            <Fifth />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer text-center">
                                    <small>This code has been open sourced
                                    <a style={{ marginLeft: 3 }} href="https://github.com/peepsx/dsocial-eagle" target="_blank" rel="noopener noreferrer">
                                            here
                                    </a>
                                    </small>
                                    <a  href="https://t.me/peepsology"  data-target="#help" target="_blank" className="position-absolute r-3 btn btn-sm btn-lg btn-warning" rel="noopener noreferrer">Help</a>
                                    <p className="m-0 mt-2">Powered By: <a href="https://explorer.arisen.network" target="_blank " rel="noopener noreferrer"><img className="w30" src="/assets/img/arisen/arisenLogo.png" alt="logo"/></a> </p>
                                </div>
                                <hr />
                            </div>
                        </div>
                    </div>
                    <Help />
                </section>
            )
       // }
    }
}