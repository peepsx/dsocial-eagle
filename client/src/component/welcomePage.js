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
                        <h1 className="display-3 text-white font-alt-1 text-center mt-2">"We're taking the web back...</h1>
                        <p className="text-white text-center p-3 mt-3">Today the web is controlled by big tech companies who utilize it for their own greedy and dishonest purposes. It is also being used to censor its users who simply want to voice their opinions or find a safe space for their ideas. The lack of privacy, transparency or freedom found on today's internet forced us to re-design and decentralize it, so that anyone and everyone could have a free and open web that all of us could build upon for the foreseeable future, as well as one that nobody could ever control or abuse us with ever again. That web is alive today and we need your help spreading awareness about our revolution to decentralize everything and as a result - #TakeTheWebBack.</p>
                        <div className="text-center">
                            <a href="/" className="btn btn-lg btn-success">Lets Take The Web Back!</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}