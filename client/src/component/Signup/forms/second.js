import React from 'react';
import axios from 'axios';
// import TwitterLogin from "react-twitter-login";
// import TwitterLogin from "react-twitter-auth";
import gold from '../../assets/img/gold_img.png'
// import Twitter from './login_buttons/twitter';
// import Instagram from './login_buttons/instagram'
// import Telegram from './login_buttons/telegram';
// import { env } from '../../config/config';
import { API } from '../../js/api_list';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';

export default class First extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileNumber: '',
            amount: 0,
            code: '',
            twitStatus: false,
            nextBtnStatus: '',
            loading: false,
        }
        this.onChangeHandle= this.onChangeHandle.bind(this);
        this.onCodeHandle= this.onCodeHandle.bind(this);
        this.onVerificationCode= this.onVerificationCode.bind(this);
        this.onVerification= this.onVerification.bind(this);
        this.handleNextShowBtn= this.handleNextShowBtn.bind(this);

    }

    onChangeHandle (e) {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onCodeHandle (e){
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onVerificationCode (e) {
        e.preventDefault();
        this.setState({loading: true})
        if(!this.state.code) {
            toast("Please enter a code", {
                type: 'error',
                autoClose: 3000,
            })
            this.setState({loading: false})

            return;
        } else {
            let amt = 1;
            axios({
                url: API.mobile_verify,
                method: 'POST',
                data: {
                    code: this.state.code,
                    amount: `${amt.toFixed(4)} RIX`
                },
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                    let toastType = "error";
                    this.setState({loading: false})

                    if (response.data.success) {
                        this.setState({ twitStatus: true, loading: false})
                        let amt = this.state.amount +parseInt(localStorage.getItem('emailReward'))+ 500;
                        this.setState({amount: amt});
                        localStorage.setItem('totalReward', amt)
                        toastType = "success";
                        window.location.hash = '#fourth'
                    }
                
                    toast(response.data.message, {
                        type: toastType,
                        autoClose: 3000,
                    })
                })
                .catch(err => {
                    if (err.response && err.response.status === 403) {
                        this.setState({loading: false})
                        toast("User already registered !!!", {
                            type: 'warning',
                            autoClose: 3000,
                        })
                    }
                })
        }
    }
    onVerification (e) {
        e.preventDefault();
            this.setState({loading: true})
            axios({
                url: API.mobile_verifier,
                method: 'POST',
                data: {
                    mobile: this.state.mobileNumber,
                    username: localStorage.getItem('username')
                },
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                if(response.data.count == 3){
                    this.setState({
                        count : 3
                    })
                }
                    localStorage.setItem('mobileNumber', this.state.mobileNumber);
                    let toastType = "error";
                    if (response.data.success) {
                        this.setState({ twitStatus: true, loading: false})
                        toastType = "success";

                        toast("SMS sent please check your Mobile inbox", {
                            type: toastType,
                            autoClose: 3000,
                        })
                    }
                    else{
                        this.setState({ loading: false})

                        toast(response.data.message, {
                            type: toastType,
                            autoClose: 3000,
                        })
                    }
                    
                })
                .catch(err => {
                    if (err.response && err.response.status === 403) {
                        this.setState({loading: false})
                        toast("User already registered !!!", {
                            type: 'warning',
                            autoClose: 3000,
                        })
                    }
                })
        
    }
 

    handleNextShowBtn (status){
        this.setState({
            nextBtnStatus: status
        })
    }
    // onFailed = (error) => {
    //     alert(error);
    //   };
      
    render() {

        return localStorage.getItem('username') ? 
            <div className="col-11 col-md-8 col-lg-6 col-xl-6 py-4 p-3 custom-border mt-4 gradient-color" style={{margin: "auto"}}>
                <div className="card-body py-4">
                {this.state.twitStatus ?   <div className="mb-4 text-center">
                    <span style={{"fontFamily": 'sans-serif'}}>You have earned:</span>
                    <img src={gold} alt='gold' width="15 px" height="auto"></img> <span>{ localStorage.getItem('emailReward') } RIX</span>
                    <span className="h4 d-block">Enter SMS verification code</span>
                    <p className="mb-3">
                    We just sent you a text message to number {localStorage.getItem('mobileNumber')}, with a verification code. Please enter it below.
                    </p>
                    {/* <span>Email: </span> */}
                    <form className="form-group mb-3" onSubmit={this.onVerificationCode}>
                    <input className="mb-3 text-center form-control b-none" name="code" value={this.state.code} onChange={this.onCodeHandle} />
                    <button className="btn btn-block btn-lg btn-custom br-dot2" type='submit'>
                    {
                        this.state.loading ?
                            <Loader
                                type="TailSpin"
                                className=""
                                color="#fff"
                                height={30}
                                width={30}
                            />
                            :
                            'Verify Code'
                    }
                    </button>
                    </form>
                    {this.state.count != 3 ?<div style={{marginTop : "15px"}} className="Resend-box" onClick={this.onVerification}>
                        <a href="">I didn't receive the text, please resend</a>
                        </div> : null}
                </div> :   <div className="mb-4 text-center">
                    <span style={{"fontFamily": 'sans-serif'}}>You have earned:</span>
                    <img src={gold} alt='gold' width="15 px" height="auto"></img> <span>{ localStorage.getItem('emailReward') } RIX</span>
                    <span className="h4 d-block">Enter your mobile phone number</span>
                    <p className="mb-3">
                    Please enter your mobile phone number below in a format eg. +1xxxxxxxxxx (country code and number)
                    </p>
                    {/* <span>Email: </span> */}
                    <form className="form-group mb-3" onSubmit={this.onVerification}>
                    <input className="mb-3 text-center form-control b-none" name="mobileNumber" value={this.state.mobileNumber} onChange={this.onChangeHandle} />
                    <button className="btn btn-block btn-lg btn-custom br-dot2" type='submit'>
                    {
                        this.state.loading ?
                            <Loader
                                type="TailSpin"
                                className=""
                                color="#fff"
                                height={30}
                                width={30}
                            />
                            :
                            'Verify Number'
                    }
                    </button>
                    </form>
                    
                </div>
                }
                <div className="mt-3">
                    <p className="small text-center noteStyle m-auto width-fit-content">NOTE :- Make sure your browser didn't block popups.</p>
                </div>
            </div>
            </div>
            : <div>Please complete last step</div>
}
}