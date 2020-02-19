import React from 'react';
import Axios from 'axios';

import { API } from '../../../js/api_list';
import { toast } from 'react-toastify';

class Facebook extends React.Component {
    handleFbClick = () => {
        if (window.FB) {
            window.FB.login((response) => {
                if (response.status === 'connected') {
                    const userId = response.authResponse.userID.replace(/"/, ""),
                        userAccessToken = response.authResponse.accessToken.replace(/"/, "");
                    Axios({
                        method: 'GET',
                        // url: `https://graph.facebook.com/v5.0/${userId}?fields=name,email,link,picture,location{location{city,state,country}}&access_token=${userAccessToken}`
                        url: `https://graph.facebook.com/v3.3/${userId}?fields=id,name,location,posts,likes,link,picture{url}&access_token=${userAccessToken}`
                    })
                        .then((fbData) => {
                            this.handleFbDataSave(fbData);
                        })
                        .catch(err => {
                            console.error('Error', err);
                        })
                } else {
                    toast("Facebook login failed", {
                        type: 'warning',
                        autoClose: 3000,
                    })
                }
            }, {
                scope: 'user_link,user_location,user_posts,user_likes,manage_pages',
                return_scoper: true,
            });
        }
    }

    handleFbDataSave = (userData) => {
        console.log('inside fb', userData);
        if (userData && userData.data) {
            localStorage.setItem('fbUserId', userData.data.id);
            Axios({
                url: API.facebook_detail,
                method: 'POST',
                data: {
                    id: userData.data.id,
                    fbUserURL: "dummy url",
                    fbPhoto: userData.data.picture.data.url,
                    fbUserName: userData.data.name,
                    fbUserLocation: 'noida'
                }
            })
                .then(response => {
                    console.log('Data save facebook', response);
                    toast(response.data.message, {
                        type: 'success',
                        autoClose: 3000,
                        onClose: this.props.handleNextShowBtn('Twitter')
                    })
                })
                .catch(err => {
                    console.error(err);
                    if (err.message.includes('status code 403')) {
                        toast("User already registered", {
                            type: 'warning',
                            autoClose: 3000,
                            onClose: this.props.handleNextShowBtn('Twitter')
                        })
                    }
                })
        }
    }

    render() {
        return (
            <button
                id="fbLoginBtn"
                onClick={this.handleFbClick}
                type="button"
                className="btn btn-block btn-outline-light border py-4 h-100"
                disabled={!(this.props.nextBtnStatus === '')}
            >
                <img className="icon mb-3" src="assets/img/arisen/facebook.png" alt="facebook" />
                <span className="h6 mb-0 d-block">Facebook</span>
            </button>
        )
    }
}

export default Facebook;