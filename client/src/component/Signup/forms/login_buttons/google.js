import React from 'react';
import Axios from 'axios';

import { API } from '../../../js/api_list';
import { env } from '../../../config/config';
import { toast } from 'react-toastify';

export default class Google extends React.Component {

    handleGoogleClick = () => {
        window.gapi.load('auth2', () => {
            /* Ready. Make a call to gapi.auth2.init or some other API */
            window.gapi.auth2.init({
                client_id: env.google_client_id,
                cookiepolicy: 'single_host_origin',
            }).then(() => {
                const auth2 = window.gapi.auth2.getAuthInstance();
                auth2.signIn({ scope: "https://www.googleapis.com/auth/youtube.readonly" }).then(res => {
                    window.gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest");
                    window.google = res;
                    this.handleGoogleDataSave(res);
                })
            })
        });
    }

    handleGoogleDataSave = (userData) => {
        let access_token;
        if (userData) {
            const googleArray = Object.values(userData);
            for(let i of googleArray) {
                if(i.access_token) {
                    access_token = i.access_token;
                }
            }
            const data = JSON.stringify(userData);
            const email = data.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
            console.log('email google', email,access_token)
            localStorage.setItem('googleEmail', email);
            Axios({
                url: API.google_detai,
                method: 'POST',
                data: {
                    GmailAddress: email,
                    access_token,
                }
            })
                .then(response => {
                    console.log('Data save Google', response);
                    toast.success(response.data.message, {
                        autoClose: 3000,
                        onClose: this.props.handleNextShowBtn('Telegram')
                    })
                })
                .catch(err => {
                    console.error('Error', err);
                    if (err.message.includes('status code 403')) {
                        toast("User already registered", {
                            type: 'warning',
                            autoClose: 3000,
                            onClose: this.props.handleNextShowBtn('Telegram')
                        })
                    }
                })
        }
    }

    render() {
        return (
            <button
                onClick={this.handleGoogleClick}
                className="btn btn-block btn-outline-light border py-4 h-100"
                type="button"
            // disabled={!(this.props.nextBtnStatus === 'Google')}
            >
                <img className="icon mb-3" src="assets/img/arisen/google.png" alt="google" />
                <span className="h6 mb-0 d-block">Google</span>
            </button>
        )
    }
}