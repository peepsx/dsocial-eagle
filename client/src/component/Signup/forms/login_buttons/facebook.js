import React from 'react';
import Axios from 'axios';

let IsMount = false;

class Facebook extends React.Component {
    componentDidMount() {
        window.FB.init({
            appId: process.env.facebook_client_id,
            autoLogAppEvents: true,
            xfbml: true,
            version: 'v6.0'
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
                        url: `https://graph.facebook.com/v5.0/${userId}?fields=name,email,link,picture,location{location{city,state,country}}&access_token=${userAccessToken}`
                    })
                        .then((fbData) => {
                            console.log('fb user data', fbData);
                            this.props.handleFbDataSave(fbData, false);
                        })
                        .catch(err => {
                            console.error('Error', err);
                        })
                } else {
                    alert('User Login failed')
                }
            }, {
                // scope:'user_link,user_location',
                return_scoper: true,
            });
        }

    }

    render() {
        return (
            <button onClick={this.handleFbClick} type="button" className="btn btn-block btn-outline-light border py-4 h-100">
                <img className="icon mb-3" src="assets/img/arisen/facebook.png" alt="facebook" />
                <span className="h6 mb-0 d-block">Facebook</span>
            </button>
        )
    }
}

export default Facebook;