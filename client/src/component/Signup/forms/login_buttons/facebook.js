import React from 'react';
import Axios from 'axios';

import { API } from '../../../js/api_list';
import { toast } from 'react-toastify';

class Facebook extends React.Component {
    state = {
        fbStatus: false,
    }
    handleFbClick = () => {
        if (window.FB) {
            window.FB.login((response) => {
                if (response.status === 'connected') {
                    const userId = response.authResponse.userID.replace(/"/, ""),
                        userAccessToken = response.authResponse.accessToken.replace(/"/, "");
                    Axios({
                        method: 'GET',
                        url: `https://graph.facebook.com/v3.3/${userId}?fields=id,name,picture{url}&access_token=${userAccessToken}`
                    })
                        .then((fbData) => {
                            this.handleFbDataSave(fbData, userAccessToken);
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
                scope: 'email',
                return_scoper: true,
            });
        }
    }

    handleFbDataSave = (userData, accessToken) => {
        if (userData && userData.data) {
            Axios({
                url: API.facebook_detail,
                method: 'POST',
                data: {
                    id: userData.data.id,
                    access_token: accessToken,
                    fbPhoto: userData.data.picture.data.url,
                    fbUserName: userData.data.name,
                },
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(response => {
                    if (response.data.access_token) {
                        localStorage.setItem('token', response.data.token);
                    }
                    localStorage.setItem('fbUserId', userData.data.id);
                    let toastType = 'error';
                    if (response.data.success) {
                        this.setState({ fbStatus: true })
                        toastType = 'success'
                        this.props.handleNextShowBtn('Twitter')
                    }
                    toast(response.data.message, {
                        type: toastType,
                        autoClose: 3000,
                    })
                })
                .catch(err => {
                    console.error(err);
                    if (err.response && err.response.status === 403) {
                        toast("User already registered !!", {
                            type: 'warning',
                            autoClose: 3000,
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
                disabled={(this.props.nextBtnStatus) !== ''}
            >
                <img className="icon mb-3" src="assets/img/arisen/facebook.png" alt="facebook" />
                <span className="h6 mb-0 d-block">Login w/ Facebook</span>
                {this.state.fbStatus && <p className="h6 mt-2 mb-0 color-grey">Logged in</p>}
            </button>
        )
    }
}

export default Facebook;