import React from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import TwitterLogin from "react-twitter-login";

import Twitter from './login_buttons/twitter';
import Facebook from './login_buttons/facebook';
import Instagram from './login_buttons/instagram'
import Google from './login_buttons/google';
import Telegram from './login_buttons/telegram';
import { env } from '../../config/config';
import { API } from '../../js/api_list';
import store from '../../../store/store';
import { twitAction } from '../../../store/action/action';

export default class First extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fbData: '',
            googleData: '',
            nextBtnStatus: '',
            teleUserid: '',
        }
    }

    twitterHandler = (err, authData) => {
        this.handleTwitDataSave(authData);
    }

    getTelegramValue = (teleData) => {
        this.setState({
            teleUserid: teleData
        })
    }

    checkTelegramUser = (e) => {
        e.preventDefault();
        if (this.state.teleUserid !== '') {
            Axios.get(`https://api.telegram.org/${env.telegram_bot_hash}/getChatMember?chat_id=${env.telegram_chat_id}&user_id=${this.state.teleUserid}`)
                .then(res => {
                    console.log('console bot', res);
                    const title = res.data.ok ? 'Step 1 completed successfully' : 'Please join our Telegram group .'
                    const icon = res.data.ok ? 'success' : 'warning'
                    Swal.fire({
                        title,
                        icon,
                        showCancelButton: false,
                        confirmButtonText: 'Next',
                    })
                    if (res.data.ok) {
                        window.open(env.liveStatus + '#second', '_self');
                    }
                })
                .catch(err => console.error('Bot Error : ', err))
        } else {
            alert('join telegram first');
        }
    }

    handleTwitDataSave = (userData) => {
        console.log('twitter data inside', userData)
        if (userData && userData.screen_name) {
            store.dispatch(twitAction(userData.screen_name));
            Axios({
                url: API.twitter_detail,
                method: 'POST',
                data: {
                    username: userData.screen_name
                }
            })
                .then(response => {
                    console.log('Data save Twitter', response);
                    if (response.status === 200) {
                        const title = response.data.message;
                        const icon = response.data.sucess ? 'success' : 'warning';
                        Swal.fire({
                            title: title,
                            icon: icon,
                            showCancelButton: false,
                            confirmButtonText: 'next',
                        }).then(() => {
                            this.handleNextShowBtn('Instagram')
                        })
                    }
                })
                .catch(err => {
                    console.error('Error', err);
                })
        }
    }

    handleNextShowBtn = (status) => {
        this.setState({
            nextBtnStatus: status
        })
    }

    render() {
        return (
            <div className="card-body py-4">
                <div className="mb-4 text-center">
                    <span className="h4 d-block">Please go through all the platforms given below.</span>
                    <p className="h6">( All fields mandatory )</p>
                </div>
                <div className="row">
                    <div className="col-sm mb-3 mb-sm-0">
                        <Facebook
                            handleNextShowBtn={this.handleNextShowBtn}
                            nextBtnStatus={this.state.nextBtnStatus}
                        />
                    </div>
                    <div className="col-sm mb-3 mb-sm-0">
                        <TwitterLogin
                            authCallback={this.twitterHandler}
                            consumerKey={env.twitter_consumer_key}
                            consumerSecret={env.twitter_consumer_secret_key}
                            callbackUrl={'https://air.arisen.network/'}
                            children={
                                <Twitter
                                    nextBtnStatus={this.state.nextBtnStatus}
                                />
                            }
                        />
                    </div>
                    <div className="col-sm mb-3 mb-sm-0">
                        <Instagram
                            handleNextShowBtn={this.handleNextShowBtn}
                            nextBtnStatus={this.state.nextBtnStatus}
                        />
                    </div>
                    <div className="col-sm mb-3 mb-sm-0">
                        <Google
                            handleNextShowBtn={this.handleNextShowBtn}
                            nextBtnStatus={this.state.nextBtnStatus}
                        />
                    </div>
                </div>
                <div className="d-flex justify-content-end mt-2">
                    <p className="d-flex">*Join our Telegram Community:
                        <span className="ml-1">
                            <Telegram
                                nextBtnStatus={this.state.nextBtnStatus}
                                getTelegramValue={this.getTelegramValue}
                            />
                        </span>
                    </p>
                </div>
                <div className="d-flex justify-content-center pb-0 pt-3">
                    <button
                        className="btn btn-primary"
                        onClick={this.checkTelegramUser}
                        disabled={!(this.state.nextBtnStatus === 'Telegram')}
                    >Next Step
                    </button>
                </div>
            </div>
        )
    }
}