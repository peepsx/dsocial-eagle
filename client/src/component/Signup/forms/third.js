import React from 'react'
import Axios from 'axios';
import Swal from 'sweetalert2';

import { API } from '../../js/api_list';
import { env } from '../../config/config';
import Loader from 'react-loader-spinner';
import gold from '../../assets/img/gold_img.png'

export default class Third extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fbPostResponse: '',
            loading: false,
            facebook_share_reward: 0,
            twitter_share_reward: 0
        }
    }

    handleFbShare = () => {
        window.FB.ui({
            appID: env.facebook_client_id,
            method: 'feed',
            quote: "I just created an account on dSocial, the world's first decentralized and %23censorshipresistant social network. You can join the social revolution and earn 1000 coins in the process. Join us at https://dsocial.network",
            link: 'https://dsocial.network',
        }, (response) => {
            this.setState({ fbPostResponse: response });
            Axios({
                method: 'POST',
                url: API.share_with_fb,
                data: {
                    status: this.state.fbPostResponse,
                },
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(res => {
                    this.setState({ loading: false })
                    if (res.data.success) {
                        // window.location.hash = "#fifth";
                        localStorage.setItem('s3', true)
                        if(!this.state.facebook_share_reward) {
                            let amt = this.state.facebook_share_reward + 400;
                            this.setState({facebook_share_reward: amt})
                        }
                    } else if(!res.data.success) {
                        Swal.fire({
                            title: 'Error',
                            text: 'You must share on facebook',
                            icon: "error",
                            showCancelButton: false,
                            confirmButtonText: 'Okay',
                        })
                    }
                })
                .catch(err => {
                    this.setState({ loading: false })
                    console.log("error", err)
                    window.location.hash = '#fifth'
                })
        });
    }

    handleTweet = () => {
        const text = "I just joined dSocial, a %23decentralized social network that cannot censor its users. Join the %23dweb revolution at https://dsocial.network"
        window.open(`https://twitter.com/intent/tweet?&text=${text}`, '_blank', 'height=500,width=400')
        if (localStorage.getItem('s2')) {
            this.setState({ loading: true })
            if (localStorage.getItem('twitterName')) {
                Axios({
                    method: 'POST',
                    url: API.user_share_validation,
                    data: {
                        screenname: localStorage.getItem('twitterName')
                    },
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                    .then(res => {
                        this.setState({ loading: false })
                        if (res.data.success) {
                            if(!this.state.twitter_share_reward){
                                let amt = this.state.twitter_share_reward + 200;
                                this.setState({twitter_share_reward: amt})
                            }
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
                window.location.hash = "#fifth";
                localStorage.setItem('s3', true)
                // Swal.fire({
                //     title: 'Error',
                //     text: 'You must share on Facebook and Twitter before continuing to Step 4.',
                //     icon: "error",
                //     showCancelButton: false,
                //     confirmButtonText: 'Okay',
                // })
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

    handleNextStep = (e) => {
        e.preventDefault();
        if (localStorage.getItem('s2')) {
            this.setState({ loading: true })
            if (this.state.facebook_share_reward || this.state.twitter_share_reward) {                
                this.setState({ loading: false })
                window.location.hash = "#fifth";
                localStorage.setItem('s3', true)
                localStorage.setItem('share_reward', this.state.facebook_share_reward + this.state.twitter_share_reward)
            } else {
                this.setState({loading: false})
                window.location.hash = "#fifth";
                localStorage.setItem('s3', true)
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
        return localStorage.getItem('email') && localStorage.getItem('username')  ? (
            <div className="card-body py-4">
                <div className="mb-4 text-center">
                    <span style={{"fontFamily": 'sans-serif'}}>You have earned:</span>
                    <img src={gold} alt='gold' width="15 px" height="auto"></img> <span>{parseInt(localStorage.getItem('login_reward')) + parseInt(localStorage.getItem('like_reward') || 0) + parseInt(this.state.facebook_share_reward) + parseInt(this.state.twitter_share_reward)} RIX</span>
                    <span className="h4 d-block">Agree To Terms</span>
                </div>
            <div className="main">
                <div className="scroll-box">
                    <b>dSocial Terms of Service</b>
                <br/>
                <br/>
                <b>I. Your Privacy</b>
                <p>Your personal information WILL NEVER be sold to anyone, under any circumstance. We will only utilize your phone number and email address for the purpose of communicating with you about your Peeps account (PeepsID) or other Peeps products and services.</p>
                <br/>
                <br/>
                <b>II. Your Data</b>
                <p>You are always in control of your data. dSocial is not centralized or powered from within a data center, nor does dSocial store a copy of your data for any reason. If you would like to remove your data from dSocial, you have the ability to do so via the dSocial application. Once your data is removed from dSocial, it will no longer exist on the network. Users of dWeb-based applications like dSocial, store and broadcast their own data to others. dSocial and other Peeps applications make it easy for users to remove their data from these applications (i.e. stop broadcasting the data). Once removed, a user can choose to republish their data at a later time.</p>
                <br/>
                
                <b>III. American Values</b>
                <br/>
                <p>dSocial represents American values - life, liberty and happiness - and you agree to honor and respect the American values and the Constitutional rights of all other dSocial users. No user on dSocial may be censored for any reason, nor shall their God-given rights be entrenched upon.</p>
                <br/>
                
                <b>IV. dWeb Constitution</b>
                <br/>
                <p>You agree to abide by the <a href="https://constitution.dwebx.org" target="_blank">dWeb Constitution</a>.</p>

                </div>
                <form action="/action_page.php">
                    <input type="checkbox" id="iagree" name="iagree" value=""/>
                    <label htmlFor="iagree">{'  '}I agree to dSocial's Terms of Service.</label><br/>
                    <input className="btn btn-block btn-lg btn-custom br-dot2" type="submit" value="Create Account & Send Coins"/>
                </form>
            </div>
            </div>
        ) : (<div className="card-body p-4 px-lg-5">
        <div className="mb-4 text-center">
        <div className="column justify-content-center mb-3">
            <img src="/assets/img/arisen/alert.svg" className="w-15 mb-2" alt="warning" />
            <h2 className="mt-auto mb-auto ml-2">Error</h2>
        </div>
        <span className="h4 d-block">Please Complete Previous Step</span>
        </div>
        </div>
)
    }
}
