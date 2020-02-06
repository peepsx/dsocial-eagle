import React from 'react';

export default class Button extends React.Component {
    render() {
        return (
            <button onClick={this.handleTwitterClick} className="btn btn-block btn-outline-light border py-4 h-100" type="button">
                <img className="icon mb-3" src="assets/img/arisen/twitter.png" alt="twitter" />
                <span className="h6 mb-0 d-block">Twitter</span>
            </button>
        )
    }
}