import React from 'react';
import Axios from 'axios';
import { API } from '../../../js/api_list';

export default class Telegram extends React.Component {
    constructor(props) {
        super(props);
        this.handleTelegramResponse = this.handleTelegramResponse.bind(this);
    }

    componentDidMount() {
        window.TelegramLoginWidget = {
            dataOnauth: user => {
                window.open('https://t.me/arisenio', '_blank');
                this.handleTelegramResponse(user)
            }
        };

        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-widget.js?4';
        script.setAttribute('data-telegram-login', 'ArisenIO_bot');
        script.setAttribute('data-size', 'medium');
        script.setAttribute('data-request-access', "write");
        script.setAttribute('data-userpic', false);
        script.setAttribute('data-onauth', 'TelegramLoginWidget.dataOnauth(user)');
        script.async = true;
        this.instance.appendChild(script);

    }

    handleTelegramResponse(response) {
        console.log('telegram',response);
        this.props.getTelegramValue(response.id);
        localStorage.setItem('teleUserId',response.id);
        this.teleDataSave(response);
    };

    teleDataSave = (userData) => {
        Axios({
            url:API.telegram_user_detail,
            method:'post',
            data: {
                id: userData.id, 
                first_name: userData.first_name, 
                last_name: userData.last_name
            },
            headers:localStorage.getItem('token')
        })
        .then(res => console.log('telegram dtata save',res))
        .catch(err => console.error(err))
    }

    render() {
        return (
            <a
                className={this.props.className}
                ref={component => {
                    this.instance = component;
                }}
            >
                {this.props.children}
            </a>
        )
    }
}