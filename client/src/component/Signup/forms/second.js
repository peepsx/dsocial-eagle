import React from 'react'
import { env } from '../../config/config'

export default class Second extends React.Component {

    handleClickLink = () => {
        window.open('https://www.instagram.com/ashutoshsingh174/','_blank',"toolbar=yes,scrollbars=yes,resizable=yes,width=500, height=600")
    }

    render() {
        return (
            <div className="card-body py-4">
                <div className="mb-4 text-center">
                    <span className="h4 d-block">Please follow Arisen with logged in accounts.</span>
                    <p className="h6">( All fields mandatory )</p>
                </div>
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-sm mb-3 mb-sm-0">
                            <button className="btn btn-block btn-outline-light border py-4 h-100 hover-white" type="button">
                                <img className="icon mb-3" src="assets/img/arisen/facebook.png" alt="facebook" />
                                <span className="h6 mb-0 d-block">Facebook Page</span>
                                <div
                                    className="fb-like mt-2"
                                    data-href="https://www.facebook.com/3DModels.48/"
                                    data-layout="button"
                                    data-action="like"
                                    data-size="large"
                                >
                                </div>
                            </button>
                        </div>
                        <div className="col-sm mb-3 mb-sm-0">
                            <button className="btn btn-block btn-outline-light border py-4 h-100 hover-white" type="button">
                                <img className="icon mb-3" src="assets/img/arisen/twitter.png" alt="twitter" />
                                <span className="h6 mb-0 d-block">Twitter Handle</span>
                                <div className="mt-2">
                                    <a href="https://twitter.com/ArisenCoin" className="twitter-follow-button"
                                        data-show-screen-name="false"
                                        data-show-count="false"
                                        data-size="large"
                                    ></a>
                                </div>
                            </button>
                        </div>
                        <div className="col-sm mb-3 mb-sm-0">
                            <button className="btn btn-block btn-outline-light border py-4 h-100 hover-white" type="button">
                                <img className="icon mb-3" src="assets/img/arisen/instagram.png" alt="instagram" />
                                <span className="h6 mb-0 d-block">Instagram Page</span>
                                <a onClick={this.handleClickLink} className="btn btn-sm btn-danger mt-2 hover-white" type="button">Follow</a>
                            </button>
                        </div>
                        <div className="col-sm mb-3 mb-sm-0">
                            <button className="btn btn-block btn-outline-light border py-4 h-100 hover-white" type="button">
                                <img className="icon mb-3" src="assets/img/arisen/youtube.png" alt="google" />
                                <span className="h6 mb-0 d-block">Youtube Channel</span>
                                <div className="mt-2 ">
                                    <a
                                        style={{ width: 85 }}
                                        className="g-ytsubscribe "
                                        data-channelid="UC2foi1ia54oj0TxlkDYXV9g"
                                        data-layout="default"
                                        data-count="hidden">
                                    </a>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center pb-0 pt-3">
                    <button className="btn btn-primary sw-btn-next" onClick={() => window.location.replace(`${env.callback_url}#third`)}>Next Step</button>
                </div>
            </div>
        )
    }
}