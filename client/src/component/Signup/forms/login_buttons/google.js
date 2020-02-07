import React from 'react';

export default class Google extends React.Component {

    handleGoogleClick = () => {
        window.gapi.load('auth2', function () {
            /* Ready. Make a call to gapi.auth2.init or some other API */
            window.gapi.auth2.init({
                client_id: process.env.google_client_id,
                // cookiepolicy: 'single_host_origin',
            }).then(() => {
                const auth2 = window.gapi.auth2.getAuthInstance();
                auth2.signIn().then(res => {
                    console.log('after sign in response', res)
                })
            })
        });
    }

    render() {
        return (
            <button onClick={this.handleGoogleClick} className="btn btn-block btn-outline-light border py-4 h-100" type="button">
                <img className="icon mb-3" src="assets/img/arisen/google.png" alt="google" />
                <span className="h6 mb-0 d-block">Google</span>
            </button>
        )
    }
}