import React from 'react'
// import { env } from '../../config/config'

export default class Fifth extends React.Component {
    render() {
        return (
            <div className="card-body p-4 px-lg-5">
                <div className="mb-4 text-center">
                    <div className="d-flex justify-content-center mb-3">
                        <div className="icon-rounded bg-success">
                            <i className="fas fa-check-circle color-white fs-20" />
                        </div>
                        <h2 className="mt-auto mb-auto ml-2">Congrulations</h2>
                    </div>
                    <span className="h5 d-block">500 RSN is successfully transfered to you Arisen Account.</span>
                    <a className="h6 d-block" href="https://data.arisen.network">Click here to check transaction.</a>
                    <span className="h4 d-block">Thanks for providing your details.</span>
                    {/* <p className="lead">Please ensure you read our
                        <a href="#">Privacy Policy</a>
                        before submitting your proposal request. You will recieve a personal response within 24 hours.
                    </p> */}
                    <hr />
                    <div className="custom-control custom-checkbox mb-3">
                        <input type="checkbox" className="custom-control-input" id="privact-policy-agree" />
                        <label className="custom-control-label" htmlFor="privact-policy-agree">I have read and agree to the Privacy Policy</label>
                    </div>
                    <a className="btn btn-primary" type="submit" href="#">Done</a>
                </div>
            </div>
        )
    }
}