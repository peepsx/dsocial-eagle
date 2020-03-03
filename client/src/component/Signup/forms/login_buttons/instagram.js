import React from 'react';
import { toast } from 'react-toastify';

class Instagram extends React.Component {
    state = {
        instaStatus: false,
        msg:'',
    }

    localInterval;

    componentDidMount() {
        this.localInterval = setInterval(()=> {
            const instaStatus = localStorage.getItem('instastatus')
            const msg = localStorage.getItem('instaMsg');
            if(instaStatus && msg){
                console.log('inside main',instaStatus,msg)
                this.setState({instaStatus:true,msg})   
                toast(msg, {
                    autoClose: 1500,
                    type:"success"
                })
                this.props.handleNextShowBtn('Google');
            }
        },300)
    }

    handleInstaClick = () => {
        window.open('/instagramLogin', 'instaClick', 'width=400, height=500,left=200,top=200')
    }

    render() {
        if(this.state.instaStatus) {
            clearInterval(this.localInterval);
        }
        console.log('props valiue',this.props)
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
                {this.state.instaStatus && <p className="h6 mt-2 mb-0 color-grey">Logged in</p>}
            </button>
        )
    }
}

export default Instagram;