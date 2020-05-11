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
            quote: "Peeps is fighting the abuse of power and the #censorshipofconservatives through the launch of the decentralized web. I'm joining hands with them to decentralize the world and you can too at",
            link: 'https://dpeeps.com',
        }, (response) => {
            this.setState({ fbPostResponse: response });
        });
    }

    handleTweet = () => {
        const text = "I just joined the all-new decentralized web and @peepsx fight against the %23censorshipofconservatives. You can too at https://dpeeps.com"
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
                        this.setState({ loading: false })
                        if (res.data.success) {
                            window.location.hash = "#fourth";
                            localStorage.setItem('s3', true)
                        } else if(!res.data.success) {
                            Swal.fire({
                                title: 'Error',
                                text: 'You must share on Facebook and Twitter before continuing to Step 4.',
                                icon: "error",
                                showCancelButton: false,
                                confirmButtonText: 'Okay',
                            })
                        }
                    })
                    .catch(err => {
                        this.setState({ loading: false })
                        console.error('Error', err)
                    })
            } else {
                this.setState({loading: false})
                Swal.fire({
                    title: 'Error',
                    text: 'You must share on Facebook and Twitter before continuing to Step 4.',
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
                    <span className="h4 d-block">Spread the word about our fight to decentralize the world</span>
                    <p className="w-75 m-auto">Help us spread the word about Peeps, Arisen, dWeb and RIX to your friends and followers. You must share on Facebook and Twitter to continue to step 4.</p>
                </div>
                <div className="row justify-content-center">
                    <div className="col-xl-8 col-lg-8">
                        <div className="list-group">
                            <a onClick={this.handleFbShare} className="mb-2 b-1 list-group-item list-group-item-action d-flex justify-content-between align-items-center c-pointer">
                                <div className="d-flex align-items-center">
                                    <img src="assets/img/icons/icon13.svg" alt="assets/img/icons/icon01.svg" className="d-block mr-3 icon" />
                                    <span className="mb-0 h6 mb-0">Share The Revolution On Facebook</span>
                                </div>
                                <i className="fas fa-chevron-right" />
                            </a>
                            <a onClick={this.handleTweet} id="fakeTweetBtn" className="mt-2 mb-2 b-1 list-group-item list-group-item-action d-flex justify-content-between align-items-center c-pointer">
                                <div className="d-flex align-items-center">
                                    <img src="assets/img/icons/icon57.svg" alt="assets/img/icons/icon02.svg" className="d-block mr-3 icon" />
                                    <span className="mb-0 h6 mb-0">Tweet About The Revolution On Twitter</span>
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
                        {
                            this.state.loading ?
                                <Loader
                                    type="TailSpin"
                                    className="ml-1 mt-auto mb-auto"
                                    color="white"
                                    height={30}
                                    width={30}
                                />
                                :
                                'Next Step'
                        }
                    </button>
                </div>
            </div>
        )
    }
}
