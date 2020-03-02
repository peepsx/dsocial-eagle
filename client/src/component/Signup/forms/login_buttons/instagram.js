import React from 'react';

export default class Instagram extends React.Component {
    handleInstaClick = () => {
        window.open('/instagramLogin', 'instaClick', 'width=400, height=500')
    }

    render() {
        return (
            <button
                onClick={this.handleInstaClick}
                className="btn btn-block btn-outline-light border py-4 h-100"
                type="button"
                disabled={(this.props.nextBtnStatus === '')}
            >
                <img className="icon mb-3" src="assets/img/arisen/instagram.png" alt="instagram" />
                <span className="h6 mb-0 d-block">Instagram</span>
            </button>
        )
    }
}