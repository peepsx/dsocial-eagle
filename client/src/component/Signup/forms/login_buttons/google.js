import React from 'react';
import Axios from 'axios';

import { API } from '../../../js/api_list';
import { env } from '../../../config/config';
import { toast } from 'react-toastify';

export default class Google extends React.Component {
    state ={
        emailStatus:false,
    }

    handleGoogleClick = () => {
        window.gapi.load('auth2', () => {
            window.gapi.auth2.init({
                client_id: env.google_client_id,
                cookiepolicy: 'single_host_origin',
            }).then(() => {
                const auth2 = window.gapi.auth2.getAuthInstance();
                auth2.signIn({ scope: "https://www.googleapis.com/auth/youtube.readonly" }).then(res => {
                    window.gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest");
                    this.handleGoogleDataSave(res);
                })
            })
        });
    }

    handleGoogleDataSave = (userData) => {
        let access_token;
        if (userData) {
            const googleArray = Object.values(userData);
            for (let i of googleArray) {
                if (i.access_token) {
                    access_token = i.access_token;
                    localStorage.setItem('goggle-access',access_token);
                }
            }
            const data = JSON.stringify(userData);
            const email = data.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
            Axios({
                url: API.google_detai,
                method: 'POST',
                data: {
                    GmailAddress: email,
                    access_token,
                },
                headers:{
                    Authorization:'Bearer '+localStorage.getItem('token')
                }
            })
                .then(response => {
                    localStorage.setItem('googleEmail', email);
                    let toastType= 'error';
                    if(response.data.success) {
                        this.setState({emailStatus:true})
                        toastType = 'success'
                        this.props.amountSave(100);
                        this.props.handleNextShowBtn('Telegram')
                    }
                    toast(response.data.message, {
                        type: toastType,
                        autoClose: 3000,
                    })
                })
                .catch(err => {
                    console.error('Error', err);
                    if (err.response && err.response.status === 403) {
                        toast("User already registered", {
                            type: 'warning',
                            autoClose: 3000,
                        })
                    }
                })
        }
    }

    render() {
        console.log('STATUS', this.props.nextBtnStatus)
        return (
            <button
                onClick={this.handleGoogleClick}
                className="btn btn-block btn-outline-light border py-4 h-100 socialBtn"
                type="button"
                disabled={(this.props.nextBtnStatus !== '')}
            >
                <p className='warning' style={{color: 'black', position: 'absolute', top: 0, right: "20px"}}>+<span> 100 RIX</span></p>
                <img className="icon mb-3" src="assets/img/arisen/google.png" alt="google" />
                <span className="h6 mb-0 d-block">Login w/ Google</span>
                {(this.state.emailStatus) && <p className="h6 mt-2 mb-0 color-grey">Logged in</p>}
            </button>
        )
    }
}