import React from 'react'

export default class Fourth extends React.Component {
    handleSignup = (e) => {
        e.preventDefault();
        window.open('https://signup.arisen.network/','_blank','width=400,height=600')
    }
    render() {
        return (
            <div className="p-0 d-flex bg-white align-items-lg-center">
                <div className="row no-gutters flex-fill justify-content-center">
                    <div className="col-11 col-md-8 col-lg-6 col-xl-9 py-4 p-3 b-1 mt-4 mb-4">
                        <h1 className="h4 text-center">Arisen Account</h1>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input id="email" type="email" className="form-control" placeholder="Enter your email address" />
                        </div>
                        <div className="form-group mb-3">
                            <div className="d-flex justify-content-between">
                                <label htmlFor="password" className="text-dark">Arisen Username:</label>
                            </div>
                            <input id="password" type="password" className="form-control" placeholder="Enter your username" />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-block btn-lg btn-primary" type="submit">Log in</button>
                        </div>
                        {/* <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Keep me logged in</label>
                            </div>
                        </div> */}
                        <div className="text-center text-small mt-3">
                            <span>Don't have an account? <button className="btn btn-sm btn-lg btn-info" onClick={this.handleSignup}>Sign up here</button></span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}