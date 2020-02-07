import React from 'react';

export default class Instagram extends React.Component {

    handleInstaClick = () => {
        // window.open('https://api.instagram.com/oauth/authorize?client_id=185483479189128&redirect_uri=https://www.devgenesis.com/&scope=user_profile&response_type=code','_blank')
        const code = 'AQA1rLxFKkXHu4LPvlNjAOx1ILno-lx_4YQ8XncIpxYnbjxKtfhdMUjeVQ8_VDnhZFYI19RD7_qCsUBk9V4Rn-lBC4qu9GWlTfFng6JrEikO_oKvNjR_wiXrl9m8IvrmmWJTzfKYbQ7hJTXBIbbc3hV3FQDjr4c_tzH1p79FjlQLpDFxBKb4tPyIW4pFeu0IfNrxhIZgTG9hX9I8gpFEvoISQDtlHJDBtyRPEyGuRtzGmg'
        const data = new FormData()
        data.append('client_id', process.env.instagram_client_id);
        data.append('client_secret', process.env.instagram_client_secret_id);
        data.append('grant_type', 'authorization_code');
        data.append('redirect_uri', 'https://www.devgenesis.com/');
        data.append('code', code);

        fetch('https://api.instagram.com/oauth/access_token', {
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(response => console.log('response', response))
            .catch(err => console.log('error', err))
    }


    render() {
        return (
            <button onClick={this.handleInstaClick} className="btn btn-block btn-outline-light border py-4 h-100" type="button">
                <img className="icon mb-3" src="assets/img/arisen/instagram.png" alt="instagram" />
                <span className="h6 mb-0 d-block">Instagram</span>
            </button>
        )
    }
}