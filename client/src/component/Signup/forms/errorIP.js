import React from 'react'

export default class Ipexist extends React.Component {
    render() {
        return (
            <section className="height-100 bg-gradient-3">
                <div className="container">
                    <div className="row justify-content-center text-center">
                        <div className="col-lg-9 col-md-9">
                            <div className="card py-3 shadow-lg">
                                <img src="/assets/img/arisen/warning.png" className="m-auto w-8" alt="warning" />
                                <div className="card-body pb-0">
                                    <h1 className="mb-3 text-center">Stop right there!</h1>
                                    <p className="h5 fw-500">We believe you already received free RIX, as your IP is already associated with someone who already joined the revolution. Try again from another IP address.</p>
                                    {/* <div className="w-80 m-auto">
                                        <p className="c-red m-auto">User already registered with this IP.</p>
                                        <small className="color-grey">User can create or register with Arisen Air Drop only one time with unique Public IP and you have already registered with your unique Public IP.</small>
                                    </div> */}
                                    <hr />
                                    <small>
                                        <a href="https://t.me/arisenio" target="_blank" rel="noopener noreferrer">
                                            Join our Telegram Community
                                        </a>
                                    </small>
                                    <p className="m-0 mt-2">Powered By: <a href="https://explorer.arisen.network" target="_blank" rel="noopener noreferrer"><img className="w30" src="/assets/img/arisen/dsocial.png" alt="logo"/></a> </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}