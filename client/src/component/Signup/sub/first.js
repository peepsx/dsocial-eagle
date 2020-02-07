import React from 'react';
import Axios from 'axios';
import TwitterLogin from "react-twitter-login";
import Button from './twitterButton';
// import TelegramLoginButton from 'react-telegram-login';

export default class First extends React.Component {
    constructor(props) {
        super(props);
        this.handleTelegramResponse = this.handleTelegramResponse.bind(this);
    }

    componentDidMount() {
        window.TelegramLoginWidget = {
            dataOnauth: user => this.handleTelegramResponse(user)
        };
        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-widget.js?4';
        script.setAttribute('data-telegram-login', 'ArisenIO_bot');
        script.setAttribute('data-size', 'large');
        script.setAttribute('data-request-access', "write");
        script.setAttribute('data-userpic', false);
        script.setAttribute('data-onauth', 'TelegramLoginWidget.dataOnauth(user)');
        script.async = true;
        this.instance.appendChild(script);
    }

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

    handleInstaClick = () => {
        // window.open('https://api.instagram.com/oauth/authorize?client_id=185483479189128&redirect_uri=https://www.devgenesis.com/&scope=user_profile&response_type=code','_blank')
        const code = 'AQA1rLxFKkXHu4LPvlNjAOx1ILno-lx_4YQ8XncIpxYnbjxKtfhdMUjeVQ8_VDnhZFYI19RD7_qCsUBk9V4Rn-lBC4qu9GWlTfFng6JrEikO_oKvNjR_wiXrl9m8IvrmmWJTzfKYbQ7hJTXBIbbc3hV3FQDjr4c_tzH1p79FjlQLpDFxBKb4tPyIW4pFeu0IfNrxhIZgTG9hX9I8gpFEvoISQDtlHJDBtyRPEyGuRtzGmg'
        const data = new FormData()
        data.append('client_id', process.env.instagram_client_id);
        data.append('client_secret', process.env.instagram_client_secret_id);
        data.append('grant_type', 'authorization_code');
        data.append('redirect_uri', 'https://www.devgenesis.com/');
        data.append('code', code);

        fetch('https://api.instagram.com/oauth/access_token', {
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(response => console.log('response', response))
            .catch(err => console.log('error', err))
    }

    handleGoogleClick = () => {
        window.gapi.load('auth2', function () {
            /* Ready. Make a call to gapi.auth2.init or some other API */
            window.gapi.auth2.init({
                client_id: process.env.google_client_id + '.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
            }).then(() => {
                const auth2 = window.gapi.auth2.getAuthInstance();
                auth2.signIn().then(res => {
                    console.log('after sign in response', res)
                })
            })
        });

    }

    handleTelegramResponse(response){
        console.log(response);
    };

    authHandler = (err, authData) => {
        console.log('response', err, authData)
    }

    componentWillReceiveProps(props){
        console.log('Props Recieved:', props)
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
                            children={<Button />}
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
                </div>
                <a className="btn btn-outline-light border">
                    {/* <img className="icon mb-3" src="assets/img/arisen/telegram.png" alt="google" />
                        <span className="h6 mb-0 d-block">Telegram Community</span> */}
                    <div
                        className={this.props.className}
                        ref={component => {
                            this.instance = component;
                        }}
                    >
                        {this.props.children}
                    </div>
                    {/* <TelegramLoginButton dataOnauth={this.handleTelegramResponse} botName="ArisenIO_bot" /> */}
                </a>
                <div className="d-flex justify-content-center pb-0 pt-3">
                    <button className="btn btn-primary sw-btn-next">Next Step</button>
                </div>
            </div>
        )
    }
}