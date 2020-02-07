import React from 'react';
// import TelegramLoginButton from 'react-telegram-login';


export default class Telegram extends React.Component {
    constructor(props) {
        super(props);
        this.handleTelegramResponse = this.handleTelegramResponse.bind(this);
    }

    componentDidMount() {
        window.TelegramLoginWidget = {
            dataOnauth: user => this.handleTelegramResponse(user)
        };

        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-widget.js?4';
        script.setAttribute('data-telegram-login', 'ArisenIO_bot');
        script.setAttribute('data-size', 'large');
        script.setAttribute('data-request-access', "write");
        script.setAttribute('data-userpic', false);
        script.setAttribute('data-onauth', 'TelegramLoginWidget.dataOnauth(user)');
        script.async = true;
        this.instance.appendChild(script);
    }

    handleTelegramResponse(response) {
        console.log(response);
    };

    render() {
        return (
            <a className="btn btn-outline-light border">
                {/* <img className="icon mb-3" src="assets/img/arisen/telegram.png" alt="google" />
            <span className="h6 mb-0 d-block">Telegram Community</span> */}
                <div
                    className={this.props.className}
                    ref={component => {
                        this.instance = component;
                    }}
                >
                    {this.props.children}
                </div>
                {/* <TelegramLoginButton dataOnauth={this.handleTelegramResponse} botName="ArisenIO_bot" /> */}
            </a>
        )
    }
}