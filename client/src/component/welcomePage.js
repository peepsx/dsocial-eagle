import React, { useEffect } from 'react';

export default function Welcome() {
    useEffect(() => {
        sessionStorage.setItem('user', true);
        localStorage.clear();
    }, [])
    return (
        <section className="bg-gradient-3 height-100 overlay-top welSec">
            <img src="assets/img/header-13.jpg" alt="Background" className="bg-image bg-image opacity-20"/>
            <div className="container">
                <div className="row align-items-center justify-content-between">
                    <div className="col-lg-10 m-auto mb-3 mb-lg-0">
                        <h1 className="display-3 text-white font-alt-1 text-center mt-2">Welcome to the decentralized economy...</h1>
                        <p className="text-white text-center p-3 mt-3">Arisen doesn't just power applications on the decentralized web, it also acts as a payment network for most of those applications as well. For this reason, Arisen features its own decentralized "cryptocurrency" known as RISE (RIX), that app developers are using as a form of exchange in their applications. Whether it's dApps like dSocial where friends use RIX to upvote another friend's post or dRide where you can use RIX to catch a ride downtown, RIX is giving birth to the decentralized web's economy and a world where government currencies are no longer a lifeline for commerce. For that reason, we're giving 1,000 RIX to the first 300,000 people who join our revolution to decentralize the wrold. That's right. We're not selling any coins, we're spreading them around the world for FREE. So what are you waiting on? Grab some free money while it lasts!</p>
                        <div className="text-center">
                            <a href="/" className="btn btn-lg btn-success">Get Started</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}