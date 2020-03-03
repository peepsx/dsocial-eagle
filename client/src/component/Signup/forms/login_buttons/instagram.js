import React from 'react';

class Instagram extends React.Component {
    state = {
        instaStatus: false
    }


    handleInstaClick = () => {
        window.open('/instagramLogin', 'instaClick', 'width=400, height=500,left=200,top=50')
    }

    render() {
        return (
            <button
                onClick={this.handleInstaClick}
                id="instagramBtn"
                className="btn btn-block btn-outline-light border py-4 h-100"
                type="button"
                disabled={!(this.props.nextBtnStatus === 'Instagram')}
            >
                <img className="icon mb-3" src="assets/img/arisen/instagram.png" alt="instagram" />
                <span className="h6 mb-0 d-block">Instagram</span>
                {this.props.instaStatus && <p className="h6 mt-2 mb-0 color-grey">Logged in</p>}
            </button>
        )
    }
}

export default Instagram;