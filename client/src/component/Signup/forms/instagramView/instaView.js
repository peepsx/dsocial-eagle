import React from 'react';
import Axios from 'axios';
import { API } from '../../../js/api_list';
import { toast } from 'react-toastify';

export default class InstaView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            message: '',
            error: false,
            already:false,
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSave = (e) => {
        e.preventDefault();
        if(this.state.username !== '' && this.state.password !== ''){
        Axios({
            url: API.instagram_detail,
            data: {
                username: this.state.username,
                password: this.state.password
            },
            method: 'post',
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then(res => {
                console.log(res)
                if(!res.data.success) {
                    this.setState({
                        already: true,
                        message: res.data.message
                    })
                }
            })
            .catch(err => {
                if (err.response.status === 500) {
                    this.setState({
                        error: true,
                        message: 'Please confirm yourself by opening Instagram'
                    })
                }
            })
        } else {
            toast.error('All Fields are mandatory.');
        }
    }

    render() {
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
                                        <form className="w-100" onSubmit={this.handleSave} autoComplete="off">
                                            <div className="form-group">
                                                <input
                                                    name="username"
                                                    type="username"
                                                    className="form-control"
                                                    placeholder="Instagram Username"
                                                    onChange={this.handleChange}
                                                />
                                                {/* {this.state.error && <p className="c-red fs-12">Please enter the valid username.</p>} */}
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
                                            {
                                                this.state.error && 
                                                <p className="c-red text-center">Error: {this.state.message}<br/>
                                                    <a href="https://www.instagram.com/" target="blank"><small>Redirect to Instagram</small></a>
                                                </p>
                                            }{
                                                this.state.already && 
                                                <p className="c-red text-center">Error: {this.state.message}</p>
                                            }
                                            <button className="btn btn-primary btn-block" type="submit">Log In</button>
                                            <hr />
                                            <div className="d-flex justify-content-center">
                                                <a href="https://www.instagram.com/accounts/password/reset/" target="blank">Forgot Password?</a>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <small className="mb-0 text-center">*Note: Business Accounts are not allowed.</small>
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