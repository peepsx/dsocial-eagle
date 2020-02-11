import React from 'react';
import Axios from 'axios';
import TwitterLogin from "react-twitter-login";

import Twitter from './login_buttons/twitter';
import Facebook from './login_buttons/facebook';
import Instagram from './login_buttons/instagram'
import Google from './login_buttons/google';
import Telegram from './login_buttons/telegram';
import { env } from '../../config/config';
import { API } from '../../js/api_list';

export default class First extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fbData: '',
            googleData: '',
        }
    }

    twitterHandler = (err, authData) => {
        this.handleTwitDataSave(authData);
    }

    clickbot = (e) => {
        e.preventDefault();
        Axios.get(`https://api.telegram.org/${env.telegram_bot_hash}/getUpdates`)
            .then(response => {
                for (let i of response.data.result) {
                    console.log('bot updates values', i.message.chat.id)
                }
            }
            )
    }

    handleTwitDataSave = (userData) => {
        console.log('twitter data inside',userData)
        if (userData && userData.screen_name) {
            Axios({
                url:API.twitter_detail,
                method: 'POST',
                data: {
                    username:userData.screen_name
                }
            })
                .then(response => {
                    console.log('Data save Twitter', response);
                })
                .catch(err => {
                    console.error('Error', err);
                })
        }
    }

    render() {
        return (
            <div className="card-body py-4">
                <div className="mb-4 text-center">
                    <span className="h4 d-block">Please login with the platforms given below.</span>
                    <p className="h6">( All fields mandatory )</p>
                </div>
                <div className="row">
                    <div className="col-sm mb-3 mb-sm-0">
                        <Facebook handleFbDataSave={this.handleFbDataSave} />
                    </div>
                    <div className="col-sm mb-3 mb-sm-0">
                        <TwitterLogin
                            authCallback={this.twitterHandler}
                            consumerKey={env.twitter_consumer_key}
                            consumerSecret={env.twitter_consumer_secret_key}
                            callbackUrl={'https://air.arisen.network/'}
                            children={<Twitter />}
                        />
                    </div>
                    <div className="col-sm mb-3 mb-sm-0">
                        <Instagram />
                    </div>
                    <div className="col-sm mb-3 mb-sm-0">
                        <Google handleGoogleDataSave={this.handleGoogleDataSave} />
                    </div>
                </div>
                <div className="d-flex justify-content-end mt-2">
                    <p className="d-flex">*Join our Telegram Community: <span className="ml-1"><Telegram /></span></p>
                </div>
                <div className="d-flex justify-content-center pb-0 pt-3">
                    <button className="btn btn-primary sw-btn-next" onClick={() => window.location.replace(`${env.callback_url}#second`)}>Next Step</button>
                    <button onClick={this.clickbot}>click bot</button>
                </div>
            </div>
        )
    }
}