import React from 'react'

export default class Fifth extends React.Component {

    componentWillUnmount() {
        setTimeout(() => {
            localStorage.clear();
        }, 2000);
    }

    render() {
        const arisenMessage = localStorage.getItem('message');
        const username = localStorage.getItem('username');
        const respCode = localStorage.getItem('respCode');
        if (!localStorage.getItem('email') || !localStorage.getItem('username') || !localStorage.getItem('mobileNumber')) { 
            return (
                <div className="card-body p-4 px-lg-5">
                    <div className="mb-4 text-center">
                        <div className="column justify-content-center mb-3">
                            <img src="/assets/img/arisen/alert.svg" className="w-15 mb-2" alt="warning" />
                            <h2 className="mt-auto mb-auto ml-2">Error</h2>
                        </div>
                        <span className="h4 d-block">Please Complete Previous The Steps First</span>
                    </div>
                </div>
            )
        }
        if (respCode == 1001) { 
            return (
                <div className="card-body p-4 px-lg-5">
                    <div className="mb-4 text-center">
                        <div className="column justify-content-center mb-3">
                            <img src="/assets/img/arisen/alert.svg" className="w-15 mb-2" alt="warning" />
                            <h2 className="mt-auto mb-auto ml-2">Error</h2>
                        </div>
                        <span className="h4 d-block">Unable to send Reward Please try Later</span>
                    </div>
                </div>
            )
        }
        if (respCode == 1002) { 
            return (
                <div className="card-body p-4 px-lg-5">
                    <div className="mb-4 text-center">
                        <div className="column justify-content-center mb-3">
                            <img src="/assets/img/arisen/alert.svg" className="w-15 mb-2" alt="warning" />
                            <h2 className="mt-auto mb-auto ml-2">Error</h2>
                        </div>
                        <span className="h4 d-block">You have already claimed</span>
                    </div>
                </div>
            )
        }
        if (respCode == 1003) { 
            return (
                <div className="card-body p-4 px-lg-5">
                    <div className="mb-4 text-center">
                        <div className="column justify-content-center mb-3">
                            <img src="/assets/img/arisen/alert.svg" className="w-15 mb-2" alt="warning" />
                            <h2 className="mt-auto mb-auto ml-2">Error</h2>
                        </div>
                        <span className="h4 d-block">You have to verify your email and phone number</span>
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
                    <p>{localStorage.getItem('a_user')}</p>
                    <span className="h5 d-block">{arisenMessage}</span>
                    <a className="d-block mb-2 mt-2" href={`https://data.arisen.network/accounts/${username || localStorage.getItem('username')}`} target="_blank" rel="noopener noreferrer">Click here to see your transaction</a>
                    <a className="d-block mb-2 mt-2" href="https://peepsx.com/dwallet" target="_blank" rel="noopener noreferrer">Manage your coins with dWallet</a>
                    <hr />
                    <span className="h4 d-block">Start Browsing The dWeb.</span>
                    <hr />
                    <button type="button" className="btn btn-custom m-1 h-2" onClick={() => window.open("https://peepsx.com/dwallet", '_blank')} >Download dWallet</button>
                    <button type="button" className="btn btn-custom m-1 h-2" onClick={() => window.open("https://peepsx.com/dbrowser", '_blank')} >Download dBrowser</button>
                </div>
            </div>
        )
    }
}