import React from 'react';
import Axios from 'axios';

export default class Facebook extends React.Component {

    handleFbClick = () => {
        if (window.FB) {
            window.FB.login(function (response) {
                if (response.status === 'connected') {
                    console.log('response', response)
                    const userId = response.authResponse.userID.replace(/"/, ""), userAccessToken = response.authResponse.accessToken.replace(/"/, "");
                    Axios({
                        method: 'GET',
                        url: `https://graph.facebook.com/v5.0/${userId}?fields=name,email,link,picture,location{location{city,state,country}}&access_token=${userAccessToken}`
                    })
                        .then((fbData) => {
                            console.log('fb user data', fbData);
                        })
                        .catch(err => {
                            console.error('Error', err);
                        })
                } else {
                    alert('User Login failed')
                }
            }, {
                scope: 'email,user_photos',
                return_scoper: true,
            });
        }
    }

    render() {
        return (
            <button onClick={this.handleFbClick} className="btn btn-block btn-outline-light border py-4 h-100" type="button">
                <img className="icon mb-3" src="assets/img/arisen/facebook.png" alt="facebook" />
                <span className="h6 mb-0 d-block">Facebook</span>
            </button>
        )
    }
}