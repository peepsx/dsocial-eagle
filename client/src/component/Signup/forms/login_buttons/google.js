import React from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';

import {API} from '../../../js/api_list';
import { env } from '../../../config/config';

export default class Google extends React.Component {

    handleGoogleClick = () => {
        window.gapi.load('auth2',() => {
            /* Ready. Make a call to gapi.auth2.init or some other API */
            window.gapi.auth2.init({
                client_id: env.google_client_id,
                cookiepolicy: 'single_host_origin',
            }).then(() => {
                const auth2 = window.gapi.auth2.getAuthInstance();
                console.log('auth value',auth2)
                auth2.signIn().then(res => {
                    console.log('response',res)
                    this.handleGoogleDataSave(res);
                })
            })
        });
    }

    handleGoogleDataSave = (userData) => {
        if (userData) {
            const data = JSON.stringify(userData);
            const email = data.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
            console.log('email google',email)
            Axios({
                url: API.google_detai,
                method: 'POST',
                data: {
                    GmailAddress: email
                }
            })
                .then(response => {
                    console.log('Data save Google', response);
                    if (response.status === 200) {
                        const title = response.data.message;
                        const icon = response.data.sucess ? 'success' : 'warning';
                        Swal.fire({
                            title: title,
                            icon: icon,
                            showCancelButton: false,
                            confirmButtonText: 'next',
                        }).then(() => {
                            this.props.handleNextShowBtn('Telegram')
                        })
                    }
                })
                .catch(err => {
                    console.error('Error', err);
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