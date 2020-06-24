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
                        <h1 className="display-3 text-white font-alt-1 text-center mt-2">Let's get our voice back...</h1>
                        <p className="text-white text-center p-3 mt-3">For the past few years, centralized social networks like Twitter and Facebook have been used to censor the voices of millions. Many alternatives like Gab were built, but their inherent weakness of being centralized allowed the deep state to take them offline and ultimately exploit their hard work to provide people with a safe space. At Peeps we've been hard at work as well, developing an entirely new web for Patriots and freedom lovers alike, that is completely decentralized. That means nobody can possibly control it. In the coming weeks, that web will be permanently launched across the world along with the world's first truly decentralized social network that will be forever available, from anywhere in the world, as well. Using this wizard, you can help spread the word about dSocial on centralized social media networks, reserve your dSocial username and help start a decentralized revolution. What do you have to lose? Welcome to the People's Network.</p>
                        <div className="text-center">
                            <a href="/" className="btn btn-lg btn-success">Get Started</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}