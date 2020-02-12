import React from 'react';
import { env } from '../../../config/config';
import Axios from 'axios';
import { API } from '../../../js/api_list';

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
            const codeLink = link.slice(link.indexOf('code=') + 5, (link.length) - 2);
            this.setState({ instaCode: codeLink });
            this.instaUserDataCall(codeLink);
        }
    }

    handleInstaClick = () => {
        if (this.state.instaCode === "") {
            window.open(`https://api.instagram.com/oauth/authorize?client_id=${env.instagram_client_id}&redirect_uri=https://air.arisen.network/&scope=user_profile&response_type=code`, "insta","height=`600,width=400")
        }
    }

    instaUserDataCall = (code) => {
        const data = new FormData()
        data.append('client_id', env.instagram_client_id);
        data.append('client_secret', env.instagram_client_secret_id);
        data.append('grant_type', 'authorization_code');
        data.append('redirect_uri', 'https://air.arisen.network/');
        data.append('code', code);
        if (code !== "") {
            fetch('https://api.instagram.com/oauth/access_token', {
                method: 'POST',
                body: data
            })
                .then(res => res.json())
                .then(response => this.instaUserName(response))
                .catch(err => console.log('error', err))
        }
    }

    instaUserName = (response) => {
        console.log('response', response)
        fetch(`https://graph.instagram.com/${response.user_id}?fields=username,id&access_token=${response.access_token.replace(/"/, "")}`)
            .then(res => res.json())
            .then(res => this.instagramDataSave(res))
    }

    instagramDataSave = (res) => {
        console.log('instagram data username',res)
        Axios({
            url:API.instagram_detail,
            method:'POST',
            data:{
                username:res.username,
                id : res.id
            }
        }).then(res => console.log('response',res))
        .catch(err => console.error('Error:',err))
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