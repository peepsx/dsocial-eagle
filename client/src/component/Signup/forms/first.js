import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
// import TwitterLogin from "react-twitter-login";
// import TwitterLogin from "react-twitter-auth";
import gold from '../../assets/img/gold_img.png'
// import Twitter from './login_buttons/twitter';
import Facebook from './login_buttons/facebook';
// import Instagram from './login_buttons/instagram'
import Google from './login_buttons/google';
// import Telegram from './login_buttons/telegram';
// import { env } from '../../config/config';
import { API } from '../../js/api_list';
import { toast } from 'react-toastify';
import validator from 'validator';
import Loader from 'react-loader-spinner';

export default class First extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            amount: 0,
            twitStatus: false,
            nextBtnStatus: '',
            loading: false,
        }
    }

    onChangeHandle = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onVerification = (e) => {
        e.preventDefault();
        if(!validator.isEmail(this.state.email)) {
            toast("Email id is Invalid", {
                type: 'error',
                autoClose: 3000,
            })
            return;
        } else {
            axios({
                url: API.email_verifier,
                method: 'POST',
                data: {
                    email: this.state.email
                },
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                    localStorage.setItem('email', this.state.email);
                    let toastType = "error";
                    console.log('ddddd', response, response.data.success)
                    if (response.data.success) {
                        this.setState({ twitStatus: true })
                        toastType = "success";
                        this.handleNextShowBtn('Google')
                    }
                    if(this.state.twitStatus) {
                        let amt = this.state.amount + 500;
                        this.setState({amount: amt});
                    }
                    this.handleNextShowBtn('Google')

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
    // twitterHandler = (err, authData) => {
    //     this.setState({loading: true})
    //     if(authData) {
    //         this.setState({loading: false})
    //         this.handleTwitDataSave(authData);
    //     }
    // }
    // amountSave = (reward) => {
    //     let amt = reward + this.state.amount;
    //     this.setState({amount: amt});
    // }
    // getTelegramValue = (teleData) => {
    //     this.setState({
    //         teleUserid: teleData
    //     })
    // }
    // checkTelegramUser = (e) => {
    //     e.preventDefault();
    //     this.setState({ loading: true });
    //     const fbData = localStorage.getItem('fbUserId');
    //     const googleEmail = localStorage.getItem('googleEmail');
    //     // const instaUserId = localStorage.getItem('instaUserId');
    //     const twitterName = localStorage.getItem('twitterName');
    //     if (fbData ||
    //         googleEmail ||
    //         // !instaUserId ||
    //         twitterName
    //     ) {
    //         localStorage.setItem('s1', true)
    //         window.location.hash = "#third";
    //         localStorage.setItem('login_reward', this.state.amount);
    //     } else {
    //         this.setState({ loading: false })
    //         Swal.fire({
    //             title: 'Error',
    //             text: 'You must login to all platforms beforing continuing to step 3',
    //             icon: "error",
    //             showCancelButton: false,
    //             confirmButtonText: 'Okay',
    //         })
    //     }

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

    // onSuccess = (result) => {
    //     result.json().then(user => {
    //         if (user.screen_name) {
    //             Axios({
    //                 url: API.twitter_detail,
    //                 method: 'POST',
    //                 data: {
    //                     username: user.screen_name,
    //                     id: localStorage.getItem('fbUserId')
    //                 },
    //                 headers: {
    //                     Authorization: 'Bearer ' + localStorage.getItem('token')
    //                 }
    //             }).then(response => {
    //                     localStorage.setItem('twitterName', user.screen_name);
    //                     localStorage.setItem('twitter_login', true)
    //                     if(!this.state.twitStatus) {
    //                         let amt = this.state.amount + 100;
    //                         this.setState({amount: amt});
    //                     }
    //                     let toastType = "error";
    //                     if (response.data.success) {
    //                         this.setState({ twitStatus: true })
    //                         toastType = "success";
    //                         this.handleNextShowBtn('Google')
    //                     }
    //                     toast(response.data.message, {
    //                         type: toastType,
    //                         autoClose: 3000,
    //                     })
    //                 })
    //                 .catch(err => {
    //                     if (err.response && err.response.status === 403) {
    //                         toast("User already registered !!!", {
    //                             type: 'warning',
    //                             autoClose: 3000,
    //                         })
    //                     }
    //                 })
    //         }
    //     });
    //   };
      
    // handleTwitDataSave = (userData) => {
    //     if (userData && userData.screen_name) {
    //         Axios({
    //             url: API.twitter_detail,
    //             method: 'POST',
    //             data: {
    //                 username: userData.screen_name,
    //                 id: localStorage.getItem('fbUserId')
    //             },
    //             headers: {
    //                 Authorization: 'Bearer ' + localStorage.getItem('token')
    //             }
    //         })
    //             .then(response => {
    //                 localStorage.setItem('twitterName', userData.screen_name);
    //                 let toastType = "error";
    //                 if (response.data.success) {
    //                     this.setState({ twitStatus: true })
    //                     toastType = "success";
    //                     this.handleNextShowBtn('Google')
    //                 }
    //                 toast(response.data.message, {
    //                     type: toastType,
    //                     autoClose: 3000,
    //                 })
    //             })
    //             .catch(err => {
    //                 if (err.response && err.response.status === 403) {
    //                     toast("User already registered !!!", {
    //                         type: 'warning',
    //                         autoClose: 3000,
    //                     })
    //                 }
    //             })
    //     }
    // }

    handleNextShowBtn = (status) => {
        this.setState({
            nextBtnStatus: status
        })
    }
    // onFailed = (error) => {
    //     alert(error);
    //   };
      
    render() {

        return localStorage.getItem('username') ? 
            <div className="col-11 col-md-8 col-lg-6 col-xl-6 py-4 p-3 custom-border mt-4 gradient-color" style={{margin: "auto"}}>
                <div className="card-body py-4">
                <div className="mb-4 text-center">
                    <span style={{"fontFamily": 'sans-serif'}}>You have earned:</span>
                    <img src={gold} alt='gold' width="15 px" height="auto"></img> <span>{ this.state.amount } RIX</span>
                    <span className="h4 d-block">Enter your email</span>
                    <p className="mb-3">
                    To get started, enter your email below.
                    </p>
                    {/* <span>Email: </span> */}
                    <form className="form-group mb-3" onSubmit={this.onVerification.bind(this)}>
                    <input className="mb-3 text-center form-control b-none" name="email" value={this.state.email} onChange={this.onChangeHandle.bind(this)} />
                    <button className="btn btn-block btn-lg btn-custom br-dot2" type='submit'>Verify Email</button>
                    </form>
                </div>
                {this.state.twitStatus && <div>To do </div>}
                <div className="mt-3">
                    <p className="small text-center noteStyle m-auto width-fit-content">NOTE :- Make sure your browser didn't block popups.</p>
                </div>
            </div>
            </div>
            : <div>Please complete last step</div>
}
}