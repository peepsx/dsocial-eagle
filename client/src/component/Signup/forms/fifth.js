import React from 'react'

export default class Fifth extends React.Component {

    componentWillUnmount() {
        localStorage.clear();
    }

    render() {
        const arisenMessage = localStorage.getItem('a_user');
        const username = localStorage.getItem('username');
        if (!arisenMessage) {
            return (
                <div className="card-body p-4 px-lg-5">
                    <div className="mb-4 text-center">
                        <div className="column justify-content-center mb-3">
                            <img src="/assets/img/arisen/alert.svg" className="w-15 mb-2" alt="warning" />
                            <h2 className="mt-auto mb-auto ml-2">Error</h2>
                        </div>
                        <span className="h4 d-block">Please Complete all the steps first.</span>
                    </div>
                </div>
            )
        }
        return (
            <div className="card-body p-4 px-lg-5">
                <div className=" text-center">
                    <div className="d-flex justify-content-center mb-3">
                        <div className="icon-rounded bg-success">
                            <i className="fas fa-check-circle color-white fs-20" />
                        </div>
                        <h2 className="mt-auto mb-auto ml-2">You Got Coins!</h2>
                    </div>
                    <span className="h5 d-block">{arisenMessage}</span>
                    <a className="d-block mb-2 mt-2" href={`https://explorer.arisen.network/account/${username}`} target="_blank">Click here to see your transaction.</a>
                    <span className="h4 d-block">Start Browsing The dWeb.</span>
                    <hr />
                        <a type="button" className="btn btn-custom m-1" href="https://dbrowser.com" target="_blank">Download dBrowser</a>
                        <a type="button" className="btn btn-custom2 m-1" href="https://fund.dpeeps.com" target="_blank">Help Fund The Revolution</a>
                </div>
            </div>
        )
    }
}