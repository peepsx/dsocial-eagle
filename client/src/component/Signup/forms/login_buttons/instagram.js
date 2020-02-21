import React from 'react';
import Axios from 'axios';

import { env } from '../../../config/config';
import { API } from '../../../js/api_list';
import { toast } from 'react-toastify';

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
        if (localStorage.getItem('fbUserId')) {
            if (this.state.instaCode === "") {
                window.open(`https://api.instagram.com/oauth/authorize?client_id=${env.instagram_client_id}&redirect_uri=https://air.arisen.network/&scope=user_profile&response_type=code`, "_self")
            }
        } else {
            alert('Please login with facebook first');
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
        console.log('instagram data username', res)
        localStorage.setItem('instaUserId', res.id);
        Axios({
            url: API.instagram_detail,
            method: 'POST',
            data: {
                username: res.username,
                id: res.id
            }
        }).then(response => {
            console.log('response insta datasave', response);
            window.open('https://www.instagram.com/arisencoin/', '_blank', "toolbar=yes,scrollbars=yes,resizable=yes,width=400, height=600")
            // toast(response.data.message, {
            //     type: 'success',
            //     autoClose: 3000,
            //     onClose: this.props.handleNextShowBtn('fs')
            // })
        })
            .catch(err => {
                console.error('Error:', err)
                // if (err.message.includes('status code 403')) {
                //     toast("User already registered", {
                //         type: 'warning',
                //         autoClose: 3000,
                //         onClose: this.props.handleNextShowBtn('fs')
                //     })
                // }
            })
    }

    render() {
        return (
            <button
                onClick={this.handleInstaClick}
                className="btn btn-block btn-outline-light border py-4 h-100"
                type="button"
            // disabled={!(this.props.nextBtnStatus === 'fs')}
            >
                <img className="icon mb-3" src="assets/img/arisen/instagram.png" alt="instagram" />
                <span className="h6 mb-0 d-block">Follow us Instagram</span>
            </button>
        )
    }
}