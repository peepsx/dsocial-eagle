import React from 'react';
import Axios from 'axios';
import TwitterLogin from "react-twitter-login";

import Twitter from './login_buttons/twitter';
import Facebook from './login_buttons/facebook';
import Instagram from './login_buttons/instagram'
import Google from './login_buttons/google';
import Telegram from './login_buttons/telegram';
// import { API } from '../../js/api_list';


export default class First extends React.Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            fbData: '',
        }
    }
    twitterHandler = (err, authData) => {
        console.log('response', err, authData)
    }

    componentWillReceiveProps(props) {
        console.log('Props Recieved:', props)
    }

    handleSave(userData) {
        console.log('user data', userData)
        if (userData && userData.data) {
            this.setState({ fbData: userData.data })
        }
        console.log('state value', this.state)
        // if (this.state.fbData !== "") {
        //     Axios({
        //         url: API.facebook_detail,
        //         method: 'POST',
        //         data: {
        //             fbUserURL: "dummy url",
        //             fbPhoto: this.state.fbData.picture.data.url,
        //             fbUserName: this.state.fbData.name,
        //             fbUserLocation: 'noida'
        //         }
        //     })
        //     .then(response => {
        //         console.log('Data save facebook', response);
        //     })
        //     .catch(err => {
        //         console.error('Error', err);
        //     })
            // }
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
        // console.log('save vale', this.handleSave())
        return (
            <div className="card-body py-4">
                <div className="mb-4 text-center">
                    <span className="h4 d-block">Please login with the accounts given below.</span>
                    <p className="h6 lead">( All fields mandatory )</p>
                </div>
                <div className="row">
                    <div className="col-sm mb-3 mb-sm-0">
                        <Facebook handleSave={this.handleSave} />
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
                </div>
                <div className="d-flex justify-content-end mt-2">
                    <p className="d-flex">Join our Telegram Community: <span className="ml-1"><Telegram /></span></p>
                </div>
                <div className="d-flex justify-content-center pb-0 pt-3">
                    <button className="btn btn-primary sw-btn-next">Next Step</button>
                    <button onClick={this.clickbot}>click bot</button>
                </div>
                <div className="d-flex justify-content-center pb-0 pt-3">
                    <button className="btn btn-warning" onClick={this.handleSave} type="button">Submit Test</button>
                </div>
            </div>
        )
    }
}