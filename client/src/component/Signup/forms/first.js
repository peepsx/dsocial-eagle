import React from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
// import TwitterLogin from "react-twitter-login";
import TwitterLogin from "react-twitter-auth";
import gold from '../../assets/img/gold_img.png'
import Twitter from './login_buttons/twitter';
import Facebook from './login_buttons/facebook';
// import Instagram from './login_buttons/instagram'
import Google from './login_buttons/google';
// import Telegram from './login_buttons/telegram';
// import { env } from '../../config/config';
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
            amount: '',
            teleUserid: '',
            twitStatus: false,
            loading: false,
        }
    }

    twitterHandler = (err, authData) => {
        this.setState({loading: true})
        if(authData) {
            this.setState({loading: false})
            this.handleTwitDataSave(authData);
        }
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
        // const instaUserId = localStorage.getItem('instaUserId');
        const twitterName = localStorage.getItem('twitterName');
        if (fbData ||
            googleEmail ||
            // !instaUserId ||
            twitterName
        ) {
            localStorage.setItem('s1', true)
            window.location.hash = "#third";
        } else {
            this.setState({ loading: false })
            Swal.fire({
                title: 'Error',
                text: 'You must login to all platforms beforing continuing to step 3',
                icon: "error",
                showCancelButton: false,
                confirmButtonText: 'Okay',
            })
        }

        // TO ENABLE TELEGRAM CHECK - UNCOMMENT THE CODE GIVEN BELOW AND COMMENT ABOVE ELSE STATEMENT


        // else if (this.state.teleUserid !== '') {
        //     Axios.get(`https://api.telegram.org/${env.telegram_bot_hash}/getChatMember?chat_id=${env.telegram_chat_id}&user_id=${this.state.teleUserid}`)
        //         .then(res => {
        //             this.setState({ loading: false })
        //             const title = res.data.ok ? 'Success' : 'Error';
        //             const text = res.data.ok ? 'Step 1 completed successfully' : 'Please join our Telegram community !!';
        //             const icon = res.data.ok ? 'success' : 'error';
        //             Swal.fire({
        //                 title,
        //                 text,
        //                 icon,
        //                 showCancelButton: false,
        //                 confirmButtonText: 'Proceed',
        //             })
        //             if (res.data.ok) {
        //                 localStorage.setItem('s1', true)
        //                 window.location.hash = "#second";
        //             }
        //         })
        //         .catch(err => {
        //             this.setState({ loading: false })
        //             console.error('Bot Error : ', err)
        //         })
        // } else {
        //     this.setState({ loading: false })
        //     Swal.fire({
        //         title: 'Error',
        //         text: 'Please Login with Telegram !!',
        //         icon: "error",
        //         showCancelButton: false,
        //         confirmButtonText: 'Okay',
        //     })
        // }
    }
    onSuccess = (result) => {
        result.json().then(user => {
            if (user.screen_name) {
                Axios({
                    url: API.twitter_detail,
                    method: 'POST',
                    data: {
                        username: user.screen_name,
                        id: localStorage.getItem('fbUserId')
                    },
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                        localStorage.setItem('twitterName', user.screen_name);
                        localStorage.setItem('tw_amount', 100);
                        let toastType = "error";
                        if (response.data.success) {
                            this.setState({ twitStatus: true })
                            toastType = "success";
                            this.handleNextShowBtn('Google')
                        }
                        toast(response.data.message, {
                            type: toastType,
                            autoClose: 3000,
                        })
                    })
                    .catch(err => {
                        if (err.response && err.response.status === 403) {
                            toast("User already registered !!!", {
                                type: 'warning',
                                autoClose: 3000,
                            })
                        }
                    })
            }
        });
      };
      
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
                    localStorage.setItem('twitterName', userData.screen_name);
                    let toastType = "error";
                    if (response.data.success) {
                        this.setState({ twitStatus: true })
                        toastType = "success";
                        this.handleNextShowBtn('Google')
                    }
                    toast(response.data.message, {
                        type: toastType,
                        autoClose: 3000,
                    })
                })
                .catch(err => {
                    if (err.response && err.response.status === 403) {
                        toast("User already registered !!!", {
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
        
        if(localStorage.getItem('fb_amount')){
            this.setState({amount: localStorage.getItem('fb_amount')})
        } else if (localStorage.getItem('go_amount')) {
            this.setState({amount: localStorage.getItem('go_amount')})
        } else if(localStorage.getItem('tw_amount')) {
            this.setState({amount: localStorage.getItem('tw_amount')})
        } else if(localStorage.getItem('fb_amount') && localStorage.getItem('go_amount')) {
            let  amt = localStorage.getItem('fb_amount') + localStorage.getItem('go_amount');
            this.setState({amount: amt})
        } else if(localStorage.getItem('fb_amount') && localStorage.getItem('tw_amount')) {
            let amt = localStorage.getItem('fb_amount') + localStorage.getItem('tw_amount')
            this.setState({amount: amt})
        } else if(localStorage.getItem('tw_amount') && localStorage.getItem('go_amount')) {
            let amt = localStorage.getItem('tw_amount') + localStorage.getItem('go_amount')
            this.setState({amount: amt})
        } 
        else if(localStorage.getItem('tw_amount') && localStorage.getItem('go_amount') && localStorage.getItem('fb_amount')) 
        {
            let amt = localStorage.getItem('tw_amount') + localStorage.getItem('go_amount') + localStorage.getItem('fb_amount');
            this.setState({amount: amt})
        }    

    }
    onFailed = (error) => {
        alert(error);
      };
      
    render() {

        return localStorage.getItem('username') ? (
            <div className="card-body py-4">
                <div className="mb-4 text-center">
                    <img src={gold} alt='gold' width="15 px" height="auto"></img> <span>{(localStorage.getItem('fbUserId') || localStorage.getItem('googleEmail') || localStorage.getItem('twitterName')) ? (localStorage.getItem('fb_amount') || 0 + localStorage.getItem('tw_amount') || 0 + localStorage.getItem('go_amount') || 0): "0 RIX" } RIX</span>
                    <span className="h4 d-block">Let's start a social revolution</span>
                    <p className="w-75 m-auto">We need your help spreading the word about dSocial to the world and we're going to pay you with the dWeb's all-new cryptocurrency to do it. For EACH platform you login with below, you will earn 100 RIX. You must choose at least one platform to proceed to Step 3 of the signup wizard.</p>
                </div>
                <div className="row">
                    <div className="col-sm mb-3 mb-sm-0">
                        <Facebook
                            handleNextShowBtn={this.handleNextShowBtn}
                            nextBtnStatus={this.state.nextBtnStatus}
                        />
                    </div>
                    <div className='col-sm mb-3 mb-sm-0 change'>
                        {/* <TwitterLogin
                            authCallback={this.twitterHandler}
                            consumerKey={env.twitter_consumer_key}
                            className="h-100"
                            consumerSecret={env.twitter_consumer_secret_key}
                            callbackUrl={env.callback_url}
                            children={
                                <Twitter
                                    nextBtnStatus={this.state.nextBtnStatus}
                                    twitStatus={this.state.twitStatus}
                                />
                            }
                        /> */}
                    {/* { (this.state.nextBtnStatus === 'Twitter' || localStorage.getItem('twitterName')) && */}
                    <TwitterLogin loginUrl="https://devserver.dsocial.network/new/auth/twitter"
                    onFailure={this.onFailed}
                    onSuccess={this.onSuccess}
                    requestTokenUrl="https://devserver.dsocial.network/new/auth/twitter/reverse"
                    children={
                        <Twitter
                                nextBtnStatus={this.state.nextBtnStatus}
                                twitStatus={this.state.twitStatus}
                            />
                    }
                    />
                    {/*  } */}
                    </div>
                    {/* <div className="col-sm mb-3 mb-sm-0">
                        <Instagram
                            handleNextShowBtn={this.handleNextShowBtn}
                            nextBtnStatus={this.state.nextBtnStatus}
                        />
                    </div> */}
                    <div className="col-sm mb-3 mb-sm-0">
                        {/* { (this.state.nextBtnStatus === 'Google' || localStorage.getItem('googleEmail')) && */}
                        <Google
                            handleNextShowBtn={this.handleNextShowBtn}
                            nextBtnStatus={this.state.nextBtnStatus}
                        />
                        {/* } */}
                    </div>
                </div>
                {/* <div className="columnd-flex justify-content-center mt-2">
                    <p className="text-center">*Join our Telegram Community<br />
                        <span className={!(this.state.nextBtnStatus === 'Telegram') ? 'noClick ml-1' : 'ml-1'}>
                            <Telegram
                                nextBtnStatus={this.state.nextBtnStatus}
                                getTelegramValue={this.getTelegramValue}
                            />
                        </span>
                    </p>
                </div> */}
                <div className="mt-3">
                    <p className="small text-center noteStyle m-auto width-fit-content">NOTE :- Make sure your browser didn't block popups.</p>
                </div>
                {
                    (localStorage.getItem('fbUserId') || localStorage.getItem('twitterName') || localStorage.getItem('googleEmail')) &&
                    <div className="d-flex justify-content-center pb-0 mt-2">
                    <button
                        className="btn btn-custom h-2 min-w-10"
                        onClick={this.checkTelegramUser}
                        disabled={(!this.state.nextBtnStatus === 'Twitter' || !this.state.nextBtnStatus === 'Facebook', !this.state.nextBtnStatus === 'Google')}
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
                                'Proceed To Step 3'
                        }
                    </button>
                </div>
                }
            </div>
        ) : (<div className="card-body p-4 px-lg-5">
            <div className="mb-4 text-center">
            <div className="column justify-content-center mb-3">
                <img src="/assets/img/arisen/alert.svg" className="w-15 mb-2" alt="warning" />
                <h2 className="mt-auto mb-auto ml-2">Error</h2>
            </div>
            <span className="h4 d-block">Please Complete Previous Step</span>
            </div>
            </div>
    )
    }
}