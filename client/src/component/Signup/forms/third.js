import React from 'react'
import { env } from '../../config/config';
import { connect } from 'react-redux';
import Axios from 'axios';
import { API } from '../../js/api_list';
import Swal from 'sweetalert2';

class Third extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fbPostResponse: '',
        }
    }

    handleShare = () => {
        window.FB.ui({
            appID: env.facebook_client_id,
            method: 'feed',
            quote: 'Get 500 free #ArisenCoin (RSN) and learn more about the #blockchain that defied all odds.',
            link: 'https://air.arisen.network/',
        }, (response) => {
            console.log('facebook facebook response', response);
            this.setState({ fbPostResponse: response });
        });

    }

    handleTweet = () => {
        const text = 'Get 500 free %23ArisenCoin (RSN) and learn more about the %23blockchain that defied all odds. https://air.arisen.network'
        window.open(`https://twitter.com/intent/tweet?&text=${text}`, '_blank', 'height=500,width=400')
    }

    handleNextStep = (e) => {
        e.preventDefault();
        console.log('props value', this.props.storeData[0], "and statet",this.state.fbPostResponse)
        Axios({
            method: 'POST',
            url: API.user_share_validation,
            data: {
                status: this.state.fbPostResponse,
                screenname: this.props.storeData[0]
            }
        })
        .then(res => {
            console.log('Validation response', res);        
            if(res.status === 200) {
                Swal.fire({
                    title: res.data.message,
                    icon: res.data.success ? 'success' : 'warning',
                    showCancelButton: false,
                    confirmButtonText: 'Next',
                }).then(() => {
                    if (res.data.success) {
                        window.open(env.liveStatus + '/#fourth', '_self');
                    }
                })
            }
        })
            .catch(err => console.error('Error', err))
    }

    render() {
        return (
            <div className="card-body py-4">
                <div className="mb-4 text-center">
                    {/* <span className="h3 d-block">How can we contact you?</span> */}
                    <p className="lead">Share with your friends</p>
                </div>
                <div className="row justify-content-center">
                    <div className="col-xl-8 col-lg-8">
                        <div className="list-group">
                            <a onClick={this.handleShare} className="mb-2 b-1 list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <img src="assets/img/icons/icon13.svg" alt="assets/img/icons/icon01.svg" className="d-block mr-3 icon" />
                                    <span className="mb-0 h6 mb-0">Share with Facebook friends</span>
                                </div>
                                <i className="fas fa-chevron-right"/>
                            </a>
                            <a onClick={this.handleTweet} id="fakeTweetBtn" className="mt-2 mb-2 b-1 list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <img src="assets/img/icons/icon57.svg" alt="assets/img/icons/icon02.svg" className="d-block mr-3 icon" />
                                    <span className="mb-0 h6 mb-0">Share with Twitter followers </span>
                                </div>
                                <i className="fas fa-chevron-right"/>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center pb-0 pt-3">
                    <button className="btn btn-primary" onClick={this.handleNextStep}>Next Step</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (storeData) => {
    return {
        storeData: storeData.userAccountReducer
    }
}
const StoreThird = connect(mapStateToProps, {})(Third);

export default StoreThird;