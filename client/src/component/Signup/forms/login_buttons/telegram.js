import React from 'react';

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
        console.log(response);
        this.props.getTelegramValue(response.id);
    };

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