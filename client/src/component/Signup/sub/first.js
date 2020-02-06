import React from 'react';
import Axios from 'axios';
import TwitterLogin from "react-twitter-login";
import Button from './twitterButton';

export default class First extends React.Component {
    constructor(props) {
        super(props);
        this.handleFbClick = this.handleFbClick.bind(this);
    }

    handleFbClick() {
        if (window.FB) {
            window.FB.login(function (response) {
                if (response.status === 'connected') {
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
                scope: 'email',
                return_scoper: true,
            });
        }
    }

    handleInstaClick = () => {
        window.open('https://api.instagram.com/oauth/authorize?client_id=185483479189128&redirect_uri=https://www.devgenesis.com/&scope=user_profile&response_type=code','_blank')

    }

    handleGoogleClick(googleUser) {
        window.gapi.load('auth2', function () {
            /* Ready. Make a call to gapi.auth2.init or some other API */
            window.gapi.auth2.init({
                client_id: '1017408504940-nti1ddvjutoittciqkoavk442taafj9m.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
                // Request scopes in addition to 'profile' and 'email'
                //scope: 'additional_scope'
            }).then(() => {
                const auth2 = window.gapi.auth2.getAuthInstance();
                // auth2.isSignedIn.listen(res);
                auth2.signIn().then(res => {
                    console.log('after sign in response', res)
                })
            })
        });

    }

    handleTele = (user) => {
        console.log(user)
        // window.open('https://telegram.org/js/telegram-widget.js?7&data-telegram-login="freedom563bot"&data-size="large"&data-auth-url="http://localhost:3000/','_blank')
    }

    randomString = function (length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    authHandler = (err, authData) => {
        console.log('response', err, authData)
    }

    render() {
        return (
            <div className="card-body py-4">
                <div className="mb-4 text-center">
                    {/* <span className="h3 d-block">What kind of business are you?</span> */}
                    <p className="lead">Please login with the accounts given below.</p>
                </div>
                <div className="row">
                    <div className="col-sm mb-3 mb-sm-0">
                        <button onClick={this.handleFbClick} className="btn btn-block btn-outline-light border py-4 h-100" type="button">
                            <img className="icon mb-3" src="assets/img/arisen/facebook.png" alt="facebook" />
                            <span className="h6 mb-0 d-block">Facebook</span>
                        </button>
                    </div>
                    <div className="col-sm mb-3 mb-sm-0">
                        <TwitterLogin
                            authCallback={this.authHandler}
                            consumerKey={process.env.twitter_consumer_key}
                            consumerSecret={process.env.twitter_consumer_secret_key}
                            callbackUrl={"http://localhost:3000/"}
                            children={<Button/>}
                        />
                    </div>
                    <div className="col-sm mb-3 mb-sm-0">
                        <button onClick={this.handleInstaClick} className="btn btn-block btn-outline-light border py-4 h-100" type="button">
                            <img className="icon mb-3" src="assets/img/arisen/instagram.png" alt="instagram" />
                            <span className="h6 mb-0 d-block">Instagram</span>
                        </button>
                    </div>
                    <div className="col-sm mb-3 mb-sm-0">
                        <button onClick={this.handleGoogleClick} className="btn btn-block btn-outline-light border py-4 h-100" type="button">
                            <img className="icon mb-3" src="assets/img/arisen/google.png" alt="google" />
                            <span className="h6 mb-0 d-block">Google</span>
                        </button>
                    </div>
                    <div className="col-sm mb-3 mb-sm-0">
                        <a onClick={this.handleTele} className="btn btn-block btn-outline-light border py-4 h-100">
                            <img className="icon mb-3" src="assets/img/arisen/telegram.png" alt="google" />
                            <span className="h6 mb-0 d-block">Telegram Community</span>
                        </a>
                    </div>
                </div>
                <div className="d-flex justify-content-center pb-0 pt-3">
                    <button className="btn btn-primary sw-btn-next">Next Step</button>
                </div>
            </div>
        )
    }
}