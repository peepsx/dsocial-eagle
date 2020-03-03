import React from 'react'
import Axios from 'axios';
import Swal from 'sweetalert2';

import { API } from '../../js/api_list';
import { env } from '../../config/config';
import Loader from 'react-loader-spinner';

export default class Third extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fbPostResponse: '',
            loading: false,
        }
    }

    handleFbShare = () => {
        window.FB.ui({
            appID: env.facebook_client_id,
            method: 'feed',
            quote: 'Get 500 free #ArisenCoin (RSN) and learn more about the #blockchain that defied all odds.',
            link: 'https://air.arisen.network/',
        }, (response) => {
            console.log('facebook facebook response', response);
            this.setState({ fbPostResponse: response });
        });
    }

    handleTweet = () => {
        const text = 'Get 500 free %23ArisenCoin (RSN) and learn more about the %23blockchain that defied all odds. https://air.arisen.network'
        window.open(`https://twitter.com/intent/tweet?&text=${text}`, '_blank', 'height=500,width=400')
    }

    handleNextStep = (e) => {
        e.preventDefault();
        if (localStorage.getItem('s2')) {
            this.setState({ loading: true })
            if (Array.isArray(this.state.fbPostResponse) && localStorage.getItem('twitterName')) {
                Axios({
                    method: 'POST',
                    url: API.user_share_validation,
                    data: {
                        status: this.state.fbPostResponse,
                        screenname: localStorage.getItem('twitterName')
                    },
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                    .then(res => {
                        console.log('Validation response', res);
                        this.setState({ loading: false })
                        if (res.status === 200) {
                            Swal.fire({
                                title: res.data.success ? 'Successful' : 'Error',
                                text: res.data.message,
                                icon: res.data.success ? 'success' : 'error',
                                showCancelButton: false,
                                confirmButtonText: 'Next',
                            }).then(() => {
                                if (res.data.success) {
                                    window.location.hash = "#fourth";
                                    localStorage.setItem('s3', true)
                                }
                            })
                        }
                    })
                    .catch(err => {
                        this.setState({ loading: false })
                        console.error('Error', err)
                    })
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Please share post on facebook and twitter !!',
                    icon: "error",
                    showCancelButton: false,
                    confirmButtonText: 'Okay',
                })
            }
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Please complete step 2!!',
                icon: "error",
                showCancelButton: false,
                confirmButtonText: 'Okay',
            })
                .then(() => window.location.hash = '#second')
        }
    }

    render() {
        return (
            <div className="card-body py-4">
                <div className="mb-4 text-center">
                    <p className="lead">Share pre-written with your friends</p>
                </div>
                <div className="row justify-content-center">
                    <div className="col-xl-8 col-lg-8">
                        <div className="list-group">
                            <a onClick={this.handleFbShare} className="mb-2 b-1 list-group-item list-group-item-action d-flex justify-content-between align-items-center c-pointer">
                                <div className="d-flex align-items-center">
                                    <img src="assets/img/icons/icon13.svg" alt="assets/img/icons/icon01.svg" className="d-block mr-3 icon" />
                                    <span className="mb-0 h6 mb-0">Share Post with Facebook friends</span>
                                </div>
                                <i className="fas fa-chevron-right" />
                            </a>
                            <a onClick={this.handleTweet} id="fakeTweetBtn" className="mt-2 mb-2 b-1 list-group-item list-group-item-action d-flex justify-content-between align-items-center c-pointer">
                                <div className="d-flex align-items-center">
                                    <img src="assets/img/icons/icon57.svg" alt="assets/img/icons/icon02.svg" className="d-block mr-3 icon" />
                                    <span className="mb-0 h6 mb-0">Share Tweet with Twitter followers </span>
                                </div>
                                <i className="fas fa-chevron-right" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center pb-0 pt-3">
                    <button className="btn btn-custom h-2 w-8"
                        onClick={this.handleNextStep}
                    >
                        Next Step
                    </button>
                    {
                        this.state.loading &&
                        <Loader
                            type="TailSpin"
                            className="ml-1 mt-auto mb-auto"
                            color="red"
                            height={30}
                            width={30}
                        />
                    }
                </div>
            </div>
        )
    }
}
