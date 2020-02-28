import React, { Component } from 'react';

import './signup.css'
import First from './forms/first';
import Second from './forms/second';
import Third from './forms/third';
import Fourth from './forms/fourth';
import Fifth from './forms/fifth';


export default class Signup extends Component {

    // componentDidMount() {
    //     const hashUrl = window.location.hash;;
    //     const s1 = localStorage.getItem('s1');
    //     if (hashUrl.length > 1) {
    //         if (!s1) {
    //             window.location.hash = "";
    //         }
    //     }
    //     window.addEventListener('hashchange', () => {
    //         console.log('inside event',window.location.hash)
    //         if (!s1) {
    //             window.location.hash = "";
    //         }
    //     })
    // }

    render() {
        return (
            <section className="height-100 bg-gradient-3 p-3">
                <img src="assets/img/header-17.jpg" alt="bg" className="bg-image opacity-10" />
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-11 col-lg-12">
                            <div className="text-center">
                                <img className="w-15" src="assets/img/arisen/arisenLogo.png" alt="Logo" />
                            </div>
                            <form className="wizard card" autoComplete="off">
                                <ul className="nav nav-tabs card-header text-center bg-light p-0" id="navActive">
                                    <li className="nav-item flex-fill">
                                        <a className="nav-link" href="#first">1. Air Drop Setup</a>
                                    </li>
                                    <li className="nav-item flex-fill">
                                        <a className="nav-link" href="#second">2. Follow Arisen</a>
                                    </li>
                                    <li className="nav-item flex-fill">
                                        <a className="nav-link" href="#third">3. Share with Friends</a>
                                    </li>
                                    <li className="nav-item flex-fill">
                                        <a className="nav-link" href="#fourth">4. Your Arisen Account</a>
                                    </li>
                                    <li className="nav-item flex-fill">
                                        <a className="nav-link" href="#fifth">5. Recieve Free Coins</a>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div id="first">
                                        <First />
                                    </div>
                                    <div id="second">
                                        <Second />
                                    </div>
                                    <div id="third">
                                        <Third />
                                    </div>
                                    <div id="fourth">
                                        <Fourth />
                                    </div>
                                    <div id="fifth">
                                        <Fifth />
                                    </div>
                                </div>
                            </form>
                            <div className="card-footer text-center">
                                <small>Having trouble filling out this form?
                                    <a href="#">Contact Support</a>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}