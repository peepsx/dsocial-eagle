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
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';

export default class First extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fbData: '',
            googleData: '',
            nextBtnStatus: '',
            teleUserid: '',
            twitStatus: false,
            loading: false,
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
        this.setState({ loading: true });
        const fbData = localStorage.getItem('fbUserId');
        const googleEmail = localStorage.getItem('googleEmail');
        const instaUserId = localStorage.getItem('instaUserId');
        const twitterName = localStorage.getItem('twitterName');
        if (!fbData || !googleEmail || !instaUserId || !twitterName) {
            this.setState({loading:false})
            Swal.fire({
                title: 'Error',
                text: 'Please complete the Steps carefully!!',
                icon: "error",
                showCancelButton: false,
                confirmButtonText: 'Okay',
            })
        } else if (this.state.teleUserid !== '') {
            Axios.get(`https://api.telegram.org/${env.telegram_bot_hash}/getChatMember?chat_id=${env.telegram_chat_id}&user_id=${this.state.teleUserid}`)
                .then(res => {
                    console.log('console bot', res);
                    this.setState({ loading: false })
                    const title = res.data.ok ? 'Success' : 'Error';
                    const text = res.data.ok ? 'Step 1 completed successfully' : 'Please join our Telegram community !!';
                    const icon = res.data.ok ? 'success' : 'error';
                    Swal.fire({
                        title,
                        text,
                        icon,
                        showCancelButton: false,
                        confirmButtonText: 'Proceed',
                    })
                    if (res.data.ok) {
                        localStorage.setItem('s1', true)
                        window.location.hash = "#second";
                    }
                })
                .catch(err => {
                    this.setState({ loading: false })
                    console.error('Bot Error : ', err)
                })
        } else {
            this.setState({loading:false})
            Swal.fire({
                title: 'Error',
                text: 'Please Login with Telegram !!',
                icon: "error",
                showCancelButton: false,
                confirmButtonText: 'Okay',
            })
        }
    }

    handleTwitDataSave = (userData) => {
        if (userData && userData.screen_name) {
            Axios({
                url: API.twitter_detail,
                method: 'POST',
                data: {
                    username: userData.screen_name,
                    id: localStorage.getItem('fbUserId')
                },
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(response => {
                    console.log('Data save Twitter', response);
                    localStorage.setItem('twitterName', userData.screen_name);
                    response.data.success && this.setState({ twitStatus: true })
                    toast.success(response.data.message, {
                        autoClose: 3000,
                        onClose: this.handleNextShowBtn('Instagram')
                    })
                })
                .catch(err => {
                    if (err.response && err.response.status === 403) {
                        toast("User already registered", {
                            type: 'warning',
                            autoClose: 3000,
                        })
                    }
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
                    <div className={!(this.state.nextBtnStatus === 'Twitter') ? 'noClick col-sm mb-3 mb-sm-0' : 'col-sm mb-3 mb-sm-0'}>
                        <TwitterLogin
                            authCallback={this.twitterHandler}
                            consumerKey={env.twitter_consumer_key}
                            consumerSecret={env.twitter_consumer_secret_key}
                            callbackUrl={'https://air.arisen.network/'}
                            children={
                                <Twitter
                                    nextBtnStatus={this.state.nextBtnStatus}
                                    twitStatus={this.state.twitStatus}
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
                <div className="columnd-flex justify-content-center mt-2">
                    <p className="text-center">*Join our Telegram Community<br />
                        <span className={!(this.state.nextBtnStatus === 'Telegram') ? 'noClick ml-1' : 'ml-1'}>
                            <Telegram
                                nextBtnStatus={this.state.nextBtnStatus}
                                getTelegramValue={this.getTelegramValue}
                            />
                        </span>
                    </p>
                </div>
                <div className="d-flex justify-content-center pb-0">
                    <button
                        className="btn btn-custom h-2 w-8"
                        onClick={this.checkTelegramUser}
                        disabled={!(this.state.nextBtnStatus === 'Telegram')}
                    >
                        {
                            this.state.loading ?
                                <Loader
                                    type="TailSpin"
                                    className="ml-1 mt-auto mb-auto"
                                    color="white"
                                    height={30}
                                    width={30}
                                />
                                :
                                'Next Step'
                        }
                    </button>
                </div>
            </div>
        )
    }
}