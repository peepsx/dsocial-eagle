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
                                <div className="card-body">
                                    <h1 className="display-3 mb-3 text-center">404</h1>
                                    <p className="h4">The page you were looking for wasn't found.</p>
                                    <div className="w-80 m-auto">
                                        <p className="c-red m-auto">User already registered with this IP.</p>
                                        <small className="color-grey">User can create or register with Arisen Air Drop only one time with unique Public IP and you have already registered with your unique Public IP.</small>
                                    </div>
                                    <hr />
                                    <small>
                                        <span>Do you think this might be a mistake?</span>
                                        <a href="#">Contact us</a><br/>
                                        <span>OR</span>
                                        <a href="https://t.me/arisenio" target="_blank"> Join our Telegram Community</a>
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}