import React from 'react';

export default class InstaView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSave = (e) => {
        e.preventDefault();
        console.log('sadfasdf')
    }

    render() {
        console.log(this.state)
        return (
            <section>
                <div className="h-100 ">
                    <div className="container">
                        <div className="col-xl-5 col-lg-5">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex justify-content-center">
                                        <img className="w-50" src="/assets/img/arisen/instaIcon.png" alt="logo" />
                                    </div>
                                    <div className="row py-4 pl-4 pr-4">
                                        <form className="w-100" onSubmit={this.handleSave}>
                                            <div className="form-group">
                                                <input
                                                    name="email"
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="Instagram Username"
                                                    onChange={this.handleChange}
                                                />
                                                {/* {this.state.error && <p className="c-red fs-12">Please enter the valid email.</p>} */}
                                            </div>
                                            <div className="form-group mb-3">
                                                <input
                                                    name="password"
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Password"
                                                    onChange={this.handleChange}
                                                />
                                            </div>
                                            <p className="color-red">safas</p>
                                            <button className="btn btn-primary btn-block" type="submit">Log In</button>
                                            <hr />
                                            <div className="d-flex justify-content-center">
                                                <a href="https://www.instagram.com/accounts/password/reset/" target="blank">Forgot Password?</a>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}