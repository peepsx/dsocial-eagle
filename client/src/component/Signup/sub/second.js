import React from 'react'

export default class Second extends React.Component {
    render() {
        return (
<div className="card-body py-4">
                <div className="mb-4 text-center">
                    {/* <span className="h3 d-block">What kind of business are you?</span> */}
                    <p className="lead">Please follow Arisen with logged in accounts.</p>
                </div>
                <div className="row">
                    <div className="col-sm mb-3 mb-sm-0">
                        <button className="btn btn-block btn-outline-light border py-4 hover-white" type="button">
                            <img className="icon mb-3" src="assets/img/arisen/facebook.png" alt="facebook" />
                            <span className="h6 mb-0 d-block">Facebook Page</span>
                            <a className="btn btn-sm btn-primary mt-2 hover-white" type="button">Like</a>
                        </button>
                    </div>
                    <div className="col-sm mb-3 mb-sm-0">
                        <button className="btn btn-block btn-outline-light border py-4 hover-white" type="button">
                            <img className="icon mb-3" src="assets/img/arisen/twitter.png" alt="twitter" />
                            <span className="h6 mb-0 d-block">Twitter Handle</span>
                            <a className="btn btn-sm btn-info mt-2 hover-white" type="button">Follow</a>
                        </button>
                    </div>
                    <div className="col-sm mb-3 mb-sm-0">
                        <button className="btn btn-block btn-outline-light border py-4 hover-white" type="button">
                            <img className="icon mb-3" src="assets/img/arisen/instagram.png" alt="instagram" />
                            <span className="h6 mb-0 d-block">Instagram Page</span>
                            <a className="btn btn-sm btn-danger mt-2 hover-white" type="button">Follow</a>
                        </button>
                    </div>
                    <div className="col-sm mb-3 mb-sm-0">
                        <button className="btn btn-block btn-outline-light border py-4 hover-white" type="button">
                            <img className="icon mb-3" src="assets/img/arisen/youtube.png" alt="google" />
                            <span className="h6 mb-0 d-block">Youtube Channel</span>
                            <a className="btn btn-sm mt-2 btn-red hover-white" type="button">Subscribe</a>
                        </button>
                    </div>
                </div>
                <div className="d-flex justify-content-center pb-0 pt-3">
                    <button className="btn btn-primary sw-btn-next">Next Step</button>
                </div>
            </div>
        )
    }
}