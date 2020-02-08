import React from 'react';

export default class Instagram extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            instaCode: '',
        }
    }
    componentDidMount() {
        const link = window.location.href;
        if (link.includes('code=')) {
            const codeLink = link.slice(link.indexOf('code=') + 1, link.length - 2);
            this.setState({ instaCode: codeLink });
        }
        console.log('link from instagram', link)
    }

    handleInstaClick = () => {
        window.open('https://api.instagram.com/oauth/authorize?client_id=185483479189128&redirect_uri=https://air.arisen.network/&scope=user_profile&response_type=code', "_self")
        const code = this.state.instaCode;
        console.log('code instagram',code)
        const data = new FormData()
        data.append('client_id', process.env.instagram_client_id);
        data.append('client_secret', process.env.instagram_client_secret_id);
        data.append('grant_type', 'authorization_code');
        data.append('redirect_uri', 'https://www.devgenesis.com/');
        data.append('code', code);
        if (this.state.instaCode !== "") {
            fetch('https://api.instagram.com/oauth/access_token', {
                method: 'POST',
                body: data
            })
                .then(res => res.json())
                .then(response => console.log('response in access', response))
                .catch(err => console.log('error', err))
        }
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