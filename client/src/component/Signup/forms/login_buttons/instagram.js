import React from 'react';
import { toast } from 'react-toastify';

class Instagram extends React.Component {
    state = {
        instaStatus: false
    }

    componentDidMount() {
        window.addEventListener('message', event => {
            if (event.data.data.success) {
                console.log('listener value', event.data.data)
                this.setState({ instaStatus: true })
                localStorage.setItem('instaUserId', event.data.data.data.name);
                localStorage.setItem('inp', event.data.data.data.pass);
                toast.success(event.data.data.message, {
                    autoClose: 1500,
                    onClose: () => self.close()
                })
            }
        }, false)
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
                disabled={!this.state.instaStatus}
            >
                <img className="icon mb-3" src="assets/img/arisen/instagram.png" alt="instagram" />
                <span className="h6 mb-0 d-block">Instagram</span>
                {this.state.instaStatus && <p className="h6 mt-2 mb-0 color-grey">Logged in</p>}
            </button>
        )
    }
}

export default Instagram;