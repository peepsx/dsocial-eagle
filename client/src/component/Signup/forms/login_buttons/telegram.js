import React from 'react';

export default class Telegram extends React.Component {
    constructor(props) {
        super(props);
        this.handleTelegramResponse = this.handleTelegramResponse.bind(this);
    }

    componentDidMount() {
        window.TelegramLoginWidget = {
            dataOnauth: user => {
                console.log('click')
                window.open('https://t.me/arisenio', '_blank');
                this.handleTelegramResponse(user)
            }
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

    handleClick = () => {
        const realBtn = document.getElementById('real_button');
        const fakeBtn = document.getElementById('fake_button');
        fakeBtn.addEventListener("click", () => {
            realBtn.click();
        })
    }

    handleTelegramResponse(response) {
        console.log(response);
    };

    render() {
        return (
            <React.Fragment>
                <a className="btn btn-block btn-outline-light border py-4 h-100" onClick={this.handleClick} id="fake_button">
                    <img className="icon mb-3" src="assets/img/arisen/telegram.png" alt="google" />
                    <span className="h6 mb-0 d-block">Telegram <br />Community</span>
                </a>
                <div
                    id="real_button"
                    hidden={true}
                    className={this.props.className}
                    ref={component => {
                        this.instance = component;
                    }}
                >
                    {this.props.children}
                </div>
            </React.Fragment>
        )
    }
}