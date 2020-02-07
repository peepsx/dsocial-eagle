import React from 'react'

export default class Fifth extends React.Component {
    render() {
        return (
            <div className="card-body p-4 px-lg-5">
                <div className="mb-4 text-center">
                    <div className="icon-rounded bg-success mx-auto mb-3">
                        <i className="material-icons text-white">check</i>
                    </div>
                    <span className="h3 d-block">Thanks for providing your details.</span>
                    <p className="lead">Please ensure you read our
                        <a href="#">Privacy Policy</a>
                        before submitting your proposal request. You will recieve a personal response within 24 hours.
                    </p>
                    <hr />
                    <div className="custom-control custom-checkbox mb-3">
                        <input type="checkbox" className="custom-control-input" id="privact-policy-agree" />
                        <label className="custom-control-label" htmlFor="privact-policy-agree">I have read and agree to the Privacy Policy</label>
                    </div>
                    <button className="btn btn-primary" type="submit">Submit Planner</button>
                </div>
            </div>
        )
    }
}