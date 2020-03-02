import React from 'react'
import { env } from '../../config/config';
// import { env } from '../../config/config'

export default class Fifth extends React.Component {

    doneTransaction = () => {
        localStorage.clear();
        window.open(env.liveStatus,'self');
    }

    handleCopy = () => {
        const textField = document.createElement('textarea')
        textField.innerText = localStorage.getItem('transaction_id');
        console.log(textField.innerText)
        document.body.appendChild(textField)
        textField.select();
        document.execCommand("copy");
        textField.remove();
    }

    render() {
        const arisenMessage = localStorage.getItem('a_user');
        const transaction = localStorage.getItem('transaction_id')
        if (!transaction && !arisenMessage) {
            return (
                <div className="card-body p-4 px-lg-5">
                    <div className="mb-4 text-center">
                        <div className="column justify-content-center mb-3">
                            <img src="/assets/img/arisen/alert.svg" className="w-15 mb-2" alt="warning"/>
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
                        <h2 className="mt-auto mb-auto ml-2">Congratulations</h2>
                    </div>
                    <span className="h5 d-block">{arisenMessage}</span>
                    <span className="h6 d-block">Transaction ID: {transaction} <i className="far fa-copy" onClick={this.handleCopy}/></span>
                    <a className="d-block mb-2 mt-2" href="https://data.arisen.network">Click here to see your transaction.</a>
                    <span className="h4 d-block">Thanks for providing your details.</span>
                    <hr />
                    <button className="btn btn-custom">Done</button>
                </div>
            </div>
        )
    }
}