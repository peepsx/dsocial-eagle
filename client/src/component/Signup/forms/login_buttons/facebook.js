import React from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';

import { API } from '../../../js/api_list';
import { env } from '../../../config/config';

let IsMount = false;

class Facebook extends React.Component {
    componentDidMount() {
        window.FB.init({
            appId: env.facebook_client_id,
            autoLogAppEvents: true,
            xfbml: true,
            version: 'v3.3'
        });
        IsMount = true;
    }

    handleFbClick = () => {
        if (window.FB && IsMount) {
            window.FB.login((response) => {
                if (response.status === 'connected') {
                    const userId = response.authResponse.userID.replace(/"/, ""),
                        userAccessToken = response.authResponse.accessToken.replace(/"/, "");
                    Axios({
                        method: 'GET',
                        // url: `https://graph.facebook.com/v5.0/${userId}?fields=name,email,link,picture,location{location{city,state,country}}&access_token=${userAccessToken}`
                        url: `https://graph.facebook.com/v3.3/${userId}?fields=id,name,location,posts,link,picture{url}&access_token=${userAccessToken}`
                    })
                        .then((fbData) => {
                            this.handleFbDataSave(fbData);
                        })
                        .catch(err => {
                            console.error('Error', err);
                        })
                } else {
                    alert('User Login failed')
                }
            }, {
                    scope: 'user_link,user_location,user_posts',
                    return_scoper: true,
                });
        }

    }

    handleFbDataSave = (userData) => {
        console.log('inside fb', userData);
        if (userData && userData.data) {
            Axios({
                url: API.facebook_detail,
                method: 'POST',
                data: {
                    fbUserURL: "dummy url",
                    fbPhoto: userData.data.picture.data.url,
                    fbUserName: userData.data.name,
                    fbUserLocation: 'noida'
                }
            })
                .then(response => {
                    console.log('Data save facebook', response);
                    if (response.status === 200) {
                        const title = response.data.message;
                        const icon = response.data.sucess ? 'success' : 'warning';
                        Swal.fire({
                            title: title,
                            icon: icon,
                            showCancelButton: false,
                            confirmButtonText: 'next',
                        }).then(() => {
                            this.props.handleNextShowBtn('Twitter')
                        })
                    }
                })
                .catch(err => {
                    console.error('Error', err);
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
                // disabled={!(this.props.nextBtnStatus === '')}
            >
                <img className="icon mb-3" src="assets/img/arisen/facebook.png" alt="facebook" />
                <span className="h6 mb-0 d-block">Facebook</span>
            </button>
        )
    }
}

export default Facebook;