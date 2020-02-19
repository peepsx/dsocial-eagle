import React from 'react'
import Axios from 'axios';

import { API } from '../../js/api_list';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export default class Fourth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            arisen_username: '',
            error: false,
            ip: {
                v4: '',
                v6: ''
            },
        }
    }

    async componentDidMount() {
        const ip = { v4: '', v6: '' }
        await fetch('https://api.ipify.org/')
            .then(res => res.text())
            .then(res => ip.v4 = res)

        await fetch('https://api6.ipify.org/')
            .then(res => res.text())
            .then(res => ip.v6 = res)
        this.setState({ ip });
    }

    handleSignup = (e) => {
        e.preventDefault();
        window.open('https://signup.arisen.network/', '_blank', 'width=400,height=600')
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            error: false,
        })
    }

    handleSave = (e) => {
        e.preventDefault();
        const email = this.state.email.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
        if (localStorage.getItem('thirdStatus')) {
            if (email && email[0] && this.state.arisen_username !== '') {
                this.setState({ error: false })
                console.log('email', email[0], this.state.arisen_username)
                Axios({
                    method: 'post',
                    url: API.arisen_user_detail,
                    data: {
                        arisen_username: this.state.arisen_username,
                        email: email[0],
                        ip: this.state.ip,
                        userDetails: {
                            fbUserId: localStorage.getItem('fbUserId'),
                            googleEmail: localStorage.getItem('googleEmail'),
                            instaUserId: localStorage.getItem('instaUserId'),
                            teleUserId: localStorage.getItem('teleUserId'),
                            twitterScreenName: localStorage.getItem('twitterName')
                        }
                    }
                })
                    .then(res => {
                        console.log('response from account arisen', res);
                    })
                    .catch(err => {
                        console.error('Error :', err);
                    })
            } else {
                this.formValidation();
            }
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Please complete step 3!!',
                icon: "error",
                showCancelButton: false,
                confirmButtonText: 'Okay',
            })
                .then(() => window.location.hash = '#third')
        }
    }

    formValidation = () => {
        const email = this.state.email.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
        if (!email) {
            this.setState({
                error: true
            })
        }
        if (this.state.arisen_username === '' || this.state.email === '') {
            toast("All fields are mandatory", {
                type: 'error',
                autoClose: 3000,
            })
        }
    }

    render() {
        return (
            <div className="p-0 d-flex bg-white align-items-lg-center">
                <div className="row no-gutters flex-fill justify-content-center">
                    <div className="col-11 col-md-8 col-lg-6 col-xl-6 py-4 p-3 custom-border mt-4 mb-4 gradient-color">
                        <h1 className="h4 text-center">Arisen Account</h1>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                name="email"
                                id="email"
                                type="email"
                                className="form-control b-none"
                                placeholder="Enter your email address"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                            {this.state.error && <p className="c-red fs-12">Please enter the valid email.</p>}
                        </div>
                        <div className="form-group mb-3">
                            <div className="d-flex justify-content-between">
                                <label htmlFor="password" className="text-dark">Arisen Username:</label>
                            </div>
                            <input
                                name="arisen_username"
                                id="username"
                                type="text"
                                className="form-control b-none"
                                placeholder="Enter your arisen username"
                                value={this.state.arisen_username}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-block btn-lg btn-custom" type="submit" onClick={this.handleSave}>Log in</button>
                        </div>
                        <div className="text-center text-small mt-3">
                            <span>Don't have an Arisen account? <button className="btn btn-sm btn-lg btn-info" onClick={this.handleSignup}>Sign up</button></span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}