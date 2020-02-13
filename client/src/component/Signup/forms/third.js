import React from 'react'

export default class Third extends React.Component {
    componentDidMount() {
        if (document.getElementById('realTweetBtn')) {
            const real = document.getElementById('realTweetBtn');
            const fake = document.getElementById('fakeTweetBtn');
            fake.addEventListener('click',() => {
                real.click();
            })
        }
    }
    handleShare = () => {
        window.FB.ui({
            method: 'share',
            // appID
            description: 'Get 500 free #ArisenCoin (RSN) and learn more about the #blockchain that defied all odds. https://air.arisen.network',
            href: 'https://air.arisen.network/#third',
        }, (response) => { console.log('consloe', response) });

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
                                <i className="material-icons d-block">keyboard_arrow_right</i>
                            </a>
                            <a id="fakeTweetBtn" className="mt-2 mb-2 b-1 list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <img src="assets/img/icons/icon57.svg" alt="assets/img/icons/icon02.svg" className="d-block mr-3 icon" />
                                    <span className="mb-0 h6 mb-0">Share with Twitter followers </span>
                                </div>
                                <i className="material-icons d-block">keyboard_arrow_right</i>
                            </a>
                        </div>
                    </div>
                    <a href="https://twitter.com/share?ref_src=twsrc%5Etfw"
                        className="twitter-share-button"
                        data-size="large"
                        data-text="&quot;Get 500 free #ArisenCoin (RSN) and learn more about the #blockchain that defied all odds. https://air.arisen.network.&quot;"
                        data-url={false}
                        hidden={true}
                        id="realTweetBtn"
                        data-show-count="false"
                    >Tweet
                </a>
                </div>
                <div className="d-flex justify-content-center pb-0 pt-3">
                    <button className="btn btn-primary sw-btn-next">Next Step</button>
                </div>
            </div>
        )
    }
}