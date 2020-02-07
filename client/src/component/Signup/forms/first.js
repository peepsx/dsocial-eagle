import React from 'react';
import TwitterLogin from "react-twitter-login";

import Twitter from './login_buttons/twitter';
import Facebook from './login_buttons/facebook';
import Instagram from './login_buttons/instagram'
import Google from './login_buttons/google';
import Telegram from './login_buttons/telegram';
import Axios from 'axios';


export default class First extends React.Component {
    twitterHandler = (err, authData) => {
        console.log('response', err, authData)
    }

    componentWillReceiveProps(props) {
        console.log('Props Recieved:', props)
    }


    clickbot = (e) => {
        e.preventDefault();
        Axios.get(`https://api.telegram.org/${process.env.telegram_bot_hash}/getUpdates`)
        .then(response => {
            for (let i of response.data.result) {
                console.log(i)
                console.log('bot updates values', i.message.chat.id)
            }
        }
        )
    }

    render() {
        return (
            <div className="card-body py-4">
                <div className="mb-4 text-center">
                    <p className="lead">Please login with the accounts given below.</p>
                </div>
                <div className="row">
                    <div className="col-sm mb-3 mb-sm-0">
                        <Facebook />
                    </div>
                    <div className="col-sm mb-3 mb-sm-0">
                        <TwitterLogin
                            authCallback={this.twitterHandler}
                            consumerKey={process.env.twitter_consumer_key}
                            consumerSecret={process.env.twitter_consumer_secret_key}
                            callbackUrl={"https://air.arisen.network/"}
                            children={<Twitter />}
                        />
                    </div>
                    <div className="col-sm mb-3 mb-sm-0">
                        <Instagram />
                    </div>
                    <div className="col-sm mb-3 mb-sm-0">
                        <Google />
                    </div>
                    <div className="col-sm mb-3 mb-sm-0">
                        <Telegram />
                    </div>
                </div>
                <div className="d-flex justify-content-center pb-0 pt-3">
                    <button className="btn btn-primary sw-btn-next">Next Step</button>
                    <button onClick={this.clickbot}>click bot</button>
                </div>
            </div>
        )
    }
}