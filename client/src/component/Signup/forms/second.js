import React from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';

import { API } from '../../js/api_list';
import { env } from '../../config/config';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import gold from '../../assets/img/gold_img.png'

export default class Second extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clickCounter:0,
            loading: false,
            subscriber: '',
            amount: 0,
            facebook_reward: 0,
            twitter_reward: 0,
            youtube_reward: 0,
            you_tube: false,
        }
    }

    // handleInstagramLink = () => {
    //     window.open('https://www.instagram.com/arisencoin/', '_blank', "toolbar=yes,scrollbars=yes,resizable=yes,width=400, height=600")
    //     this.setState({
    //         clickCounter: this.state.clickCounter +1
    //     })
    // }

    handleFacebookLink = () => {
        window.open('https://www.facebook.com/peepsology/', '_blank', "toolbar=yes,scrollbars=yes,resizable=yes,width=800, height=600")
        this.setState({
            clickCounter: this.state.clickCounter +1
        })
        let amt = this.state.facebook_reward + 100
        if(!this.state.facebook_reward) {
            this.setState({facebook_reward: amt})
        }
    }

    handleYoutubeLink = () => {
    const googleAccessToken = localStorage.getItem('goggle-access')
    if (window.gapi.client.youtube) {
        Axios.get(`https://www.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&maxResults=50&key=${env.google_api_key} HTTP/1.1&mine=true`, {
            headers: {
                Authorization: 'Bearer ' + googleAccessToken
            }
        })
            .then((response) => {
                let channel;
                let amt = this.state.youtube_reward + 100
                if (response.data.items) {
                    for (let item of response.data.items) {
                        if (item.snippet.title === 'Peeps') {
                            channel = item.snippet.title
                            if(!this.state.youtube_reward) {
                                this.setState({youtube_reward: amt})
                            }
                            toast("You already subscribed our page", {
                                type: "success",
                                autoClose: 3000,
                            })
                        }
                    }
                }
                if(!channel) {
                        window.open('https://www.youtube.com/channel/UCoknUFNMUF9ciA_WGmm8pxQ', '_blank', "toolbar=yes,scrollbars=yes,resizable=yes,width=400, height=600")
                        this.setState({
                            clickCounter: this.state.clickCounter +1, you_tube: true
                        })                    
                        this.setState({youtube_reward: amt})
                }
            })
            .catch(err => console.error('Subscribe error', err))
    } else {
        this.setState({ loading: false })
        Swal.fire({
            title: 'Error',
            text: 'Data Lost, due to roloading of the page !! ',
            icon: "warning",
            showCancelButton: false,
            confirmButtonText: 'Okay',
        })
            .then(() => {
                window.open(env.liveStatus)
            })
    }
    }

    handleTwitClick = () => {
        Axios({
            url: API.validation_follower,
            method: 'POST',
            data: {
                screen_name: localStorage.getItem('twitterName'),
                // username: localStorage.getItem('instaUserId'),
            },
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                this.setState({ loading: false })
                let amt = this.state.twitter_reward + 100
                if (response.data.success) {
                    if(!this.state.twitter_reward) {
                        this.setState({twitter_reward: amt})
                    }
                    toast("You already follow our page", {
                        type: "success",
                        autoClose: 3000,
                    })
                } else {
                    window.open('https://twitter.com/peepsology', '_blank', "toolbar=yes,scrollbars=yes,resizable=yes,width=400, height=600")
                    this.setState({
                        clickCounter: this.state.clickCounter +1
                    })
                    if(!this.state.twitter_reward) {
                        this.setState({twitter_reward: amt})
                    }
                }
            })
            .catch(err => {
                this.setState({ loading: false })
                console.log(err);
            })
    }


    nextButtonValidation = async (e) => {
        e.preventDefault();
        if(this.state.you_tube) {
                const googleAccessToken = localStorage.getItem('goggle-access')
            if (window.gapi.client.youtube) {
            Axios.get(`https://www.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&maxResults=50&key=${env.google_api_key} HTTP/1.1&mine=true`, {
                headers: {
                    Authorization: 'Bearer ' + googleAccessToken
                }
            })
                .then((response) => {
                    if (response.data.items) {
                        for (let item of response.data.items) {
                            if (item.snippet.title === 'Peeps') {
                                toast("You have successfully subscribed our channel", {
                                    type: "success",
                                    autoClose: 3000,
                                })
                            } else {
                                let amt = this.state.twitter_reward - 100
                                this.setState({youtube_reward: amt})
                                toast("Please subscribe our channel if you want to earn 100 RIX", {
                                    type: "success",
                                    autoClose: 3000,
                                })
                                this.setState({you_tube: false})
                            }
                        }
                    }
                })
                .catch(err => console.error('Subscribe error', err))
            } else {
            this.setState({ loading: false })
            Swal.fire({
                title: 'Error',
                text: 'Data Lost, due to roloading of the page !! ',
                icon: "warning",
                showCancelButton: false,
                confirmButtonText: 'Okay',
            })
                .then(() => {
                    window.open(env.liveStatus)
                })
            }
        }
        if (localStorage.getItem('s1')) {
            this.setState({ loading: true });
            if (localStorage.getItem('twitterName')  && this.state.clickCounter) {
                this.apiCall();
                localStorage.setItem('like_reward', ((this.state.facebook_reward || 0) + (this.state.twitter_reward || 0) + (this.state.youtube_reward || 0)))
            } else {
                this.setState({ loading: false })
                // if(localStorage.getItem('twitterName') === null && localStorage.getItem('fbUserId') === null) {
                //     window.location.hash = '#fifth'
                //     localStorage.setItem('s2', true);
                //     localStorage.setItem('s3', true);
                //     localStorage.setItem('like_reward', this.state.amount)
                // }
                    window.location.hash = '#fourth'
                    localStorage.setItem('s2', true);
                    // localStorage.setItem('s3', true);
                    localStorage.setItem('like_reward', ((this.state.facebook_reward || 0) + (this.state.twitter_reward || 0) + (this.state.youtube_reward || 0)))
                // window.location.hash = '#fourth'
                // localStorage.setItem('s2', true);
                // localStorage.setItem('like_reward', this.state.amount)
            //     Swal.fire({
            //         title: 'Whoops!',
            //         text: "You must follow all of Peeps' social media pages before continuing!!",
            //         icon: "warning",
            //         showCancelButton: false,
            //         confirmButtonText: 'Okay',
            //     })
            }
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Please complete step 1!!',
                icon: "error",
                showCancelButton: false,
                confirmButtonText: 'Okay',
            })
            .then(() => window.open(env.liveStatus, '_self'))
        }
    }

    apiCall = () => {
        Axios({
            url: API.validation_follower,
            method: 'POST',
            data: {
                screen_name: localStorage.getItem('twitterName'),
                // username: localStorage.getItem('instaUserId'),
            },
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                this.setState({ loading: false })
                if (response.data.success) {
                    localStorage.setItem('s2', true);
                    localStorage.removeItem('goggle-access');
                    window.location.hash = "#fourth";
                } else {
                    Swal.fire({
                        title: 'Whoops!',
                        text: "You must follow all of Peeps' social media pages before continuing!!",
                        icon: "Error",
                        showCancelButton: false,
                        confirmButtonText: 'Okay',
                    })
                }
            })
            .catch(err => {
                this.setState({ loading: false })
                console.log(err);
            })
    }

    render() {
        return localStorage.getItem('username') || localStorage.getItem('twitterName') || localStorage.getItem('googleEmail') || localStorage.getItem('fbUserId') ? (
            <div className="card-body py-4">
                <div className="mb-4 text-center">
                    <img src={gold} alt='gold' width="15 px" height="auto"></img> <span>{parseInt(localStorage.getItem('login_reward')) + parseInt(((this.state.facebook_reward || 0) + (this.state.twitter_reward || 0) + (this.state.youtube_reward || 0)))} RIX</span>
                    <span className="h4 d-block">Tune in to our fight to decentralize the web...</span>
                    <p className="w-75 m-auto">Like, follow and subscribe to @Peepsology on the platforms below and earn 100 RIX for EACH platform you follow us on.</p>
                </div>
                <div className="col-md-12">
                    <div className="row">
                        {localStorage.getItem('fbUserId') && <div className="col-sm mb-3 mb-sm-0">
                            <div className="btn btn-block btn-outline-light border py-4 h-100 hover-white bg-white">
                                <img className="icon mb-3" src="assets/img/arisen/facebook.png" alt="facebook" />
                                <span className="h6 mb-0 d-block">Peeps On Facebook</span>
                                <button onClick={this.handleFacebookLink} className=" btn btn-sm btn-facebook mt-2 hover-white color-white" type="button">
                                    <p className='warning' style={{color: 'black', position: 'absolute', top: 0, right: "20px"}}>+<span> 100 RIX</span></p>
                                    <i className="fas fa-thumbs-up mr-1" />
                                    Like Peeps
                                </button>
                            </div>
                        </div>
                        }
                        { localStorage.getItem('twitterName') &&
                            <div className="col-sm mb-3 mb-sm-0">
                                <div className="btn btn-block btn-outline-light border py-4 h-100 hover-white bg-white" >
                                    <img className="icon mb-3" src="assets/img/arisen/twitter.png" alt="twitter" />
                                    <span className="h6 mb-0 d-block">Peeps On Twitter</span>
                                    <button onClick={this.handleTwitClick} className=" color-white btn btn-sm btn-twitter mt-2 hover-white" type="button">
                                        <p className='warning' style={{color: 'black', position: 'absolute', top: 0, right: "20px"}}>+<span> 100 RIX</span></p>
                                        <i className="fab fa-twitter mr-1" />
                                        Follow @peepsx
                                    </button>
                                </div>
                            </div>
                        }
                        {/* <div className="col-sm mb-3 mb-sm-0">
                            <div className="btn btn-block btn-outline-light border py-4 h-100 hover-white" type="button">
                                <img className="icon mb-3" src="assets/img/arisen/instagram.png" alt="instagram" />
                                <span className="h6 mb-0 d-block">Instagram Page</span>
                                <button onClick={this.handleInstagramLink} className="color-white btn btn-sm btn-instagram mt-2 hover-white" type="button">
                                    <i className="fab fa-instagram mr-1" />
                                    Follow
                                </button>
                            </div>
                        </div> */}
                        {localStorage.getItem('googleEmail') && 
                            <div className="col-sm mb-3 mb-sm-0">
                                <div className="btn btn-block btn-outline-light border py-4 h-100 hover-white bg-white" >
                                    <img className="icon mb-3" src="assets/img/arisen/youtube.png" alt="google" />
                                    <span className="h6 mb-0 d-block">Peeps On YouTube</span>
                                    <button onClick={this.handleYoutubeLink} className=" color-white btn btn-sm btn-red mt-2 hover-white" type="button">
                                        <p className='warning' style={{color: 'black', position: 'absolute', top: 0, right: "20px"}}>+<span> 100 RIX</span></p>
                                        <i className="fab fa-youtube mr-1" />
                                        Subscribe To Peeps
                                    </button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className="d-flex justify-content-center pb-0 pt-3">
                    <button className="btn btn-custom h-2 min-w-10"
                        onClick={this.nextButtonValidation}>
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
                                "I'm Tuned In"
                        }
                    </button>
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