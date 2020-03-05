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
                                        <a href="#" data-toggle="modal" data-target="#myModal">Contact us</a><br />
                                        <span>OR</span>
                                        <a href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=dpeepsproject@gmail.com&tf=1" target="_blank">
                                            Join our Telegram Community
                                        </a>
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="myModal" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content bg-white">
                            <div className="modal-header pb-1">
                                <button type="button" className="close position-absolute p-0 r-40 t-30" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title text-center">Contact Us</h4>
                            </div>
                            <div className="modal-body py-2">
                                <p className="mb-0">If you are facing any issues in completing the steps or have any kind of problem.<br /> Please contact us via email, send us a descriptive issue on <span className="h5 color-orange">dpeepsproject@gmail.com</span></p>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button type="button" className="btn btn-custom h-2 w-8" data-dismiss="modal">Okay</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}