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
                        <h1 className="display-3 text-white font-alt-1 text-center mt-2">Join The Social Revolution</h1>
                        <p className="text-white text-center p-3 mt-3">We're readying the launch of dSocial, the world's first truly decentralized and censorship-resistant social network. You can use this wizard to reserve your dSocial @username (PeepsID), help us promote the revolution to your friends and earn 1000 RIX coins in the process. It's completely free and only takes a few minutes.</p>
                        <div className="text-center">
                            <a href="/" className="btn btn-lg btn-success">Get Started</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}