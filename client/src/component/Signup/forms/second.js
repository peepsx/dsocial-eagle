import React from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';

import { API } from '../../js/api_list';
import { env } from '../../config/config';

export default class Second extends React.Component {

    handleInstagramLink = () => {
        window.open('https://www.instagram.com/ashutoshsingh174/', '_blank', "toolbar=yes,scrollbars=yes,resizable=yes,width=400, height=600")
    }

    handleFacebookLink = () => {
        window.open('https://www.facebook.com/arisencoin', '_blank', "toolbar=yes,scrollbars=yes,resizable=yes,width=400, height=600")
    }

    handleYoutubeLink = () => {
        window.open('https://www.youtube.com/channel/UC1Ixz0mAUa8XuGBToWW5kcA', '_blank', "toolbar=yes,scrollbars=yes,resizable=yes,width=400, height=600")
    }

    handleTwitClick = () => {
        window.open('https://twitter.com/ArisenCoin', '_blank', "toolbar=yes,scrollbars=yes,resizable=yes,width=400, height=600")
    }

    nextButtonValidation = (e) => {
        e.preventDefault();
        console.log('instide click', localStorage.getItem('twitterName'))
        if (localStorage.getItem('firstStatus')) {
            Axios({
                url: API.validation_follower,
                method: 'POST',
                data: {
                    screen_name: localStorage.getItem('twitterName')
                }
            })
                .then(response => {
                    console.log('twitter', response)
                    if (response.data.success) {
                        localStorage.setItem('secondStatus', true);
                        window.location.hash = "#third"
                    }
                })
                .catch(err => console.log(err))
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
                            <button className="btn btn-block btn-outline-light border py-4 h-100 hover-white" type="button">
                                <img className="icon mb-3" src="assets/img/arisen/facebook.png" alt="facebook" />
                                <span className="h6 mb-0 d-block">Facebook Page</span>
                                <a onClick={this.handleFacebookLink} className="btn btn-sm btn-facebook mt-2 hover-white" type="button">
                                    <i className="fas fa-thumbs-up mr-1" />
                                    Like
                                </a>
                            </button>
                        </div>
                        <div className="col-sm mb-3 mb-sm-0">
                            <button className="btn btn-block btn-outline-light border py-4 h-100 hover-white" type="button">
                                <img className="icon mb-3" src="assets/img/arisen/twitter.png" alt="twitter" />
                                <span className="h6 mb-0 d-block">Twitter Handle</span>
                                <a onClick={this.handleTwitClick} className="btn btn-sm btn-twitter mt-2 hover-white" type="button">
                                    <i className="fab fa-twitter mr-1" />
                                    Follow
                                    </a>
                            </button>
                        </div>
                        <div className="col-sm mb-3 mb-sm-0">
                            <button className="btn btn-block btn-outline-light border py-4 h-100 hover-white" type="button">
                                <img className="icon mb-3" src="assets/img/arisen/instagram.png" alt="instagram" />
                                <span className="h6 mb-0 d-block">Instagram Page</span>
                                <a onClick={this.handleInstagramLink} className="btn btn-sm btn-danger mt-2 hover-white" type="button">
                                    <i className="fab fa-instagram mr-1" />
                                    Follow
                                </a>
                            </button>
                        </div>
                        <div className="col-sm mb-3 mb-sm-0">
                            <button className="btn btn-block btn-outline-light border py-4 h-100 hover-white" type="button">
                                <img className="icon mb-3" src="assets/img/arisen/youtube.png" alt="google" />
                                <span className="h6 mb-0 d-block">Youtube Channel</span>
                                <a onClick={this.handleYoutubeLink} className="btn btn-sm btn-red mt-2 hover-white" type="button">
                                    <i className="fab fa-youtube mr-1" />
                                    Subscribe
                                </a>
                                {/* <div className="mt-2 ">
                                    <a
                                        style={{ width: 85 }}
                                        className="g-ytsubscribe "
                                        data-channelid="UC2foi1ia54oj0TxlkDYXV9g"
                                        data-layout="default"
                                        data-count="hidden">
                                    </a>
                                </div> */}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center pb-0 pt-3">
                    <button className="btn btn-custom h-2 w-8"
                        onClick={this.nextButtonValidation}>Next Step</button>
                </div>
            </div>
        )
    }
}