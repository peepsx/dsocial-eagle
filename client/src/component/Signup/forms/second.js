import React from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';

import { API } from '../../js/api_list';
import { env } from '../../config/config';
import Loader from 'react-loader-spinner';

export default class Second extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fbClick: false,
            youtubeClick: false,
            instaClick: false,
            twitterClick: false,
            loading: false,
            subscriber: '',
        }
    }

    handleInstagramLink = () => {
        window.open('https://www.instagram.com/arisencoin/', '_blank', "toolbar=yes,scrollbars=yes,resizable=yes,width=400, height=600")
        this.setState({
            instaClick: true
        })
    }

    handleFacebookLink = () => {
        window.open('https://www.facebook.com/arisencoin', '_blank', "toolbar=yes,scrollbars=yes,resizable=yes,width=800, height=600")
        this.setState({
            fbClick: true
        })
    }

    handleYoutubeLink = () => {
        window.open('https://www.youtube.com/channel/UCSA8YUDeXWEYHl54XdFO6_w', '_blank', "toolbar=yes,scrollbars=yes,resizable=yes,width=400, height=600")
        this.setState({
            youtubeClick: true
        })
    }

    handleTwitClick = () => {
        window.open('https://twitter.com/ArisenCoin', '_blank', "toolbar=yes,scrollbars=yes,resizable=yes,width=400, height=600")
        this.setState({
            twitterClick: true
        })
    }


    nextButtonValidation = async (e) => {
        e.preventDefault();
        const googleAccessToken = localStorage.getItem('goggle-access')
        if (localStorage.getItem('s1')) {
            this.setState({ loading: true });
            let youtubeTitle = false;
            if (window.gapi.client.youtube) {
                await Axios.get(`https://www.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&maxResults=50&key=${env.google_api_key} HTTP/1.1&mine=true`, {
                    headers: {
                        Authorization: 'Bearer ' + googleAccessToken
                    }
                })
                    .then((response) => {
                        if (response.data.items) {
                            for (let item of response.data.items) {
                                if (item.snippet.title === 'Arisen Coin') {
                                    youtubeTitle = item.snippet.title;
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
            console.log("Response", youtubeTitle);
            if (this.state.twitterClick && this.state.youtubeClick && this.state.instaClick && this.state.fbClick && youtubeTitle === 'Arisen Coin') {
                this.apiCall();
            } else if (youtubeTitle !== 'Arisen Coin') {
                this.setState({ loading: false })
                Swal.fire({
                    title: 'Error',
                    text: 'Please Subscribe Youtube Channel with your given G-mail Account !!',
                    icon: "warning",
                    showCancelButton: false,
                    confirmButtonText: 'Okay',
                })
            } else if (!this.state.fbClick) {
                this.setState({ loading: false })
                Swal.fire({
                    title: 'Error',
                    text: 'Please Like Arisen\'s Facebook Page !!',
                    icon: "warning",
                    showCancelButton: false,
                    confirmButtonText: 'Okay',
                })
            } else if (!this.state.twitterClick) {
                this.setState({ loading: false })
                Swal.fire({
                    title: 'Error',
                    text: 'Please follow Arisen on Twiiter !!',
                    icon: "warning",
                    showCancelButton: false,
                    confirmButtonText: 'Okay',
                })
            } else if (!this.state.instaClick) {
                this.setState({ loading: false })
                Swal.fire({
                    title: 'Error',
                    text: 'Please follow Arisen on Instagram  !!',
                    icon: "warning",
                    showCancelButton: false,
                    confirmButtonText: 'Okay',
                })
            } else if (!this.state.youtubeClick) {
                this.setState({ loading: false })
                Swal.fire({
                    title: 'Error',
                    text: 'Please Subscribe Arisen\'s Youtube Channel !!',
                    icon: "warning",
                    showCancelButton: false,
                    confirmButtonText: 'Okay',
                })
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
                username: localStorage.getItem('instaUserId'),
            },
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                this.setState({ loading: false })
                const title = response.data.success ? 'Success' : 'Error';
                const text = response.data.success ? 'Step 2 completed successfully' : response.data.message;
                const icon = response.data.success ? 'success' : 'error';
                Swal.fire({
                    title,
                    text,
                    icon,
                    showCancelButton: false,
                    confirmButtonText: 'Done',
                })
                if (response.data.success) {
                    localStorage.setItem('s2', true);
                    localStorage.removeItem('goggle-access');
                    window.location.hash = "#third";
                }
            })
            .catch(err => {
                this.setState({ loading: false })
                console.log(err);
            })
    }

    render() {
        return (
            <div className="card-body py-4">
                <div className="mb-4 text-center">
                    <span className="h4 d-block">Please follow Arisen with logged in accounts.</span>
                    <p className="h6">( All fields mandatory )</p>
                </div>
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-sm mb-3 mb-sm-0">
                            <div className="btn btn-block btn-outline-light border py-4 h-100 hover-white" type="button">
                                <img className="icon mb-3" src="assets/img/arisen/facebook.png" alt="facebook" />
                                <span className="h6 mb-0 d-block">Facebook Page</span>
                                <button onClick={this.handleFacebookLink} className="btn btn-sm btn-facebook mt-2 hover-white color-white" type="button">
                                    <i className="fas fa-thumbs-up mr-1" />
                                    Like
                                </button>
                            </div>
                        </div>
                        <div className="col-sm mb-3 mb-sm-0">
                            <div className="btn btn-block btn-outline-light border py-4 h-100 hover-white" type="button">
                                <img className="icon mb-3" src="assets/img/arisen/twitter.png" alt="twitter" />
                                <span className="h6 mb-0 d-block">Twitter Handle</span>
                                <button onClick={this.handleTwitClick} className="color-white btn btn-sm btn-twitter mt-2 hover-white" type="button">
                                    <i className="fab fa-twitter mr-1" />
                                    Follow
                                </button>
                            </div>
                        </div>
                        <div className="col-sm mb-3 mb-sm-0">
                            <div className="btn btn-block btn-outline-light border py-4 h-100 hover-white" type="button">
                                <img className="icon mb-3" src="assets/img/arisen/instagram.png" alt="instagram" />
                                <span className="h6 mb-0 d-block">Instagram Page</span>
                                <button onClick={this.handleInstagramLink} className="color-white btn btn-sm btn-instagram mt-2 hover-white" type="button">
                                    <i className="fab fa-instagram mr-1" />
                                    Follow
                                </button>
                            </div>
                        </div>
                        <div className="col-sm mb-3 mb-sm-0">
                            <div className="btn btn-block btn-outline-light border py-4 h-100 hover-white" type="button">
                                <img className="icon mb-3" src="assets/img/arisen/youtube.png" alt="google" />
                                <span className="h6 mb-0 d-block">Youtube Channel</span>
                                <button onClick={this.handleYoutubeLink} className="color-white btn btn-sm btn-red mt-2 hover-white" type="button">
                                    <i className="fab fa-youtube mr-1" />
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center pb-0 pt-3">
                    <button className="btn btn-custom h-2 w-8 d"
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
                                'Next Step'
                        }
                    </button>
                </div>
            </div>
        )
    }
}