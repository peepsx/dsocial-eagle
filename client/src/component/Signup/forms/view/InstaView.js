import React from 'react';
import Axios from 'axios';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';

import { API } from '../../../js/api_list';

export default class InstaView extends React.Component {

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

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            error: false,
            error2: false
        })
    }

    handleSave = (e) => {
        e.preventDefault();
        if (this.state.username !== '') {
            this.setState({
                error: false,
                error2: false,
                loading: true
            })
            Axios({
                url: API.instagram_detail,
                data: {
                    username: this.state.username
                },
                method: 'post',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(res => {
                    console.log('sadfasdf', res);
                    this.setState({ loading: false })
                    if (res.data && res.data.success) {
                        localStorage.setItem('instaMsg', res.data.message);
                        localStorage.setItem('instastatus', res.data.message);
                        localStorage.setItem('instaUserId', res.data.data.name);
                        self.close();
                    }
                    if (!res.data.success) {
                        this.setState({
                            error2: true,
                            message: res.data.message
                        })
                    }
                })
                .catch(err => {
                    this.setState({ loading: false })
                    if (err.response) {
                        err.response && err.response.status === 505 ?
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
            toast.error('Username Field Missing !!');
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
                                        <img className="w-50 h100" src="/assets/img/arisen/instaIcon.png" alt="logo" />
                                    </div>
                                    <div className="d-flex justify-content-center mt-3">
                                        <img src="/assets/img/icons/icon14.svg" className="w-50 " alt="profile" />
                                    </div>
                                    <div className="row py-4 pl-4 pr-4">
                                        <form className="w-100" onSubmit={this.handleSave} autoComplete="off">
                                            <div className="form-group d-flex flex-direction-column">
                                                <label className="mb-1 align-self-center">Enter Instagram Username</label>
                                                <input
                                                    name="username"
                                                    type="username"
                                                    className="form-control w-75 align-self-center cstm-placeholder"
                                                    placeholder="Username"
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
                                                Submit
                                            </button>
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