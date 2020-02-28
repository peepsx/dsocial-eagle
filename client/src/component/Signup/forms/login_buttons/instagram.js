import React from 'react';
import Axios from 'axios';
import { toast } from 'react-toastify';

import { API } from '../../../js/api_list';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner';

export default class Instagram extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            instaCode: '',
        }
    }

    handleInstaClick = () => {
        window.open('/instagramLogin', '_blank', 'width=400, height=500')
    }

    render() {
        return (
            <button
                onClick={this.handleInstaClick}
                className="btn btn-block btn-outline-light border py-4 h-100"
                type="button"
            disabled={(this.props.nextBtnStatus === '')}
            >
                <img className="icon mb-3" src="assets/img/arisen/instagram.png" alt="instagram" />
                <span className="h6 mb-0 d-block">Instagram</span>
            </button>
        )
    }
}


export class InstaView extends Instagram {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            message: '',
            error: false,
            error2: false,
            loading: false,
        }
    }
    parent = new Instagram();

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            error: false,
            error2: false
        })
    }

    handleSave = (e) => {
        e.preventDefault();

        if (this.state.username !== '' && this.state.password !== '') {
            this.setState({ 
                error: false, 
                error2: false, 
                loading: true 
            })
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
                    console.log('sadfasdf', res);
                    this.setState({ loading: false })
                    if (res.data.success) {
                        localStorage.setItem('instaUserId', res.data.data.name);
                        toast.success(res.data.message,{
                            autoClose:1500,
                            onClose: () => self.close()
                        })
                    } else if (!res.data.success) {
                        this.setState({
                            error2: true,
                            message: res.data.message
                        })
                    }
                })
                .catch(err => {
                    this.setState({ loading: false })
                    if (err.response) {
                        err.response.status === 500 ?
                            this.setState({
                                error: true,
                                message: 'Please confirm yourself by opening Instagram'
                            }) :
                            this.setState({
                                error2: true,
                                message: err.response.data.message
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
                                                <p className="c-red text-center">Error: {this.state.message}<br />
                                                    <a href="https://www.instagram.com/" target="blank"><small>Redirect to Instagram</small></a>
                                                </p>
                                            }{
                                                this.state.error2 &&
                                                <p className="c-red text-center">Error: {this.state.message}</p>
                                            }
                                            <button className="btn btn-primary btn-block" type="submit">
                                                {
                                                    this.state.loading && <Loader
                                                        type="TailSpin"
                                                        className="position-absolute ml-18"
                                                        color="#fff"
                                                        height={20}
                                                        width={20}
                                                    />
                                                }
                                                Log In
                                            </button>

                                            <hr />
                                            <div className="d-flex justify-content-center">
                                                <a href="https://www.instagram.com/accounts/password/reset/" target="blank">Forgot Password?</a>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <small className="mb-0 text-center">*Note: Only Personal Accounts are allowed.</small>
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