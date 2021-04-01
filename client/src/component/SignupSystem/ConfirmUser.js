import React from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import { API } from '../js/api_list';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

class ConfirmUSer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            arisen_username: '',
            total_reward: 0,
            error: '',
            ip: {
                v4: '',
                v6: ''
            },
            confirm_reward_amount: 0
        }
        this.handleTransaction = this.handleTransaction.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    async componentDidMount() {

        const ip = { v4: '', v6: '' }
        
        await fetch('https://api.ipify.org/')
            .then(res => res.text())
            .then(async res => {
                if(res) {
                    return ip.v4 = res
                } else {
                    await fetch('https://api64.ipify.org/')
                    .then(res => res.text())
                    .then(res => ip.v6 = res)
                }
            })
        this.setState({ ip });
    }
    
    async handleTransaction (e) {
        e.preventDefault();
        this.setState({ loading: true })
        this.setState({arisen_username: localStorage.getItem('username')});
        let userValidation = await axios.get(`https://nv6khovry9.execute-api.us-east-1.amazonaws.com/dev/lookup/${localStorage.getItem('username')}`)
        
        if(!userValidation) return; 
                
        if (localStorage.getItem('username')) {
            // this.setState({ loading: true })
            if (this.state.arisen_username !== '') {
                this.setState({ error: false })
                let amt = parseInt(localStorage.getItem('login_reward') || 0) + parseInt(localStorage.getItem('like_reward') || 0) + parseInt(localStorage.getItem('share_reward') || 0);
                this.setState({total_reward: amt})
                axios({
                    method: 'post',
                    url: API.arisen_user_detail,
                    data: {
                        arisen_username: this.state.arisen_username,
                        ip: this.state.ip,
                        amount: `${amt.toFixed(4)} RIX`,
                        userDetails: {
                            fbUserId: localStorage.getItem('fbUserId'),
                            googleEmail: localStorage.getItem('googleEmail'),
                            twitterScreenName: localStorage.getItem('twitterName'),
                            username: localStorage.getItem('username')
                        }
                    },
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                    .then(res => {
                        window.location.hash = '#fifth'
                        this.setState({ loading: false })
                        if (res.data) {
                            if (res.data.success) {
                                localStorage.clear();
                                localStorage.setItem('s4', true);
                                localStorage.setItem('a_user', res.data.message)
                                localStorage.setItem('username', this.state.arisen_username)
                                window.location.hash = '#sixth'
                            } else {
                                Swal.fire({
                                    title: 'Error',
                                    text: res.data.message,
                                    icon: "error",
                                    showCancelButton: false,
                                    confirmButtonText: 'Okay',
                                })
                            }
                        }
                    })
                    .catch(err => {
                        this.setState({ loading: false })
                        if (err.response && err.response.status === 403) {
                            toast("Transfer already done to this Account !!", {
                                type: 'error',
                                autoClose: 3000,
                            })
                        }
                        console.error('Error :', err);
                    })
            } else {
                this.setState({ loading: false })
                this.formValidation();
            }
        } else {
            this.setState({ loading: false })
            Swal.fire({
                title: 'Error',
                text: 'Please complete step 3!!',
                icon: "error",
                showCancelButton: false,
                confirmButtonText: 'Okay',
            })
                .then(() => window.location.hash = '#third')
        }
    }

    handleChange (e){
        this.setState({
            [e.target.name]: e.target.value,
            error: false,
        })
    }

    render() {
        let confrim_reward = parseInt(localStorage.getItem('login_reward') || 0) + parseInt(localStorage.getItem('like_reward') || 0) + parseInt(localStorage.getItem('share_reward') || 0)
        // this.setState({confirm_reward_amount: confrim_reward})

        return localStorage.getItem('username') && (localStorage.getItem('twitterName') || localStorage.getItem('googleEmail') || localStorage.getItem('fbUserId')) ? (
            <div className="p-0 d-flex bg-white align-items-lg-center">
            <div className="row no-gutters flex-fill justify-content-center">
                <div className="col-11 col-md-8 col-lg-6 col-xl-6 py-4 p-3 custom-border mt-4 mb-4 gradient-color">
                    <h1 className="h4 text-center">Confirm your username is {localStorage.getItem('username')}</h1>
                    <p className="small text-center noteStyle">Confirm your username so we can get your some free RIX coins!</p>
                    <input
                        name="arisen_username"
                        id="username"
                        type="text"
                        className="form-control b-none"
                        placeholder="Enter your PeepsID or Arisen username"
                        value={localStorage.getItem("username")}
                        onChange={this.handleChange}
                    />
                    <br></br>
                    <button className="btn btn-block btn-lg btn-custom br-dot2" onClick={this.handleTransaction}>
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
                            `That's me. Send me ${confrim_reward.toFixed(4)} RIX`
                    }
                </button>
                </div>
            </div>
        </div>
        ) : (<div className="card-body p-4 px-lg-5">
        <div className="mb-4 text-center">
        <div className="column justify-content-center mb-3">
            <img src="/assets/img/arisen/alert.svg" className="w-15 mb-2" alt="warning" />
            <h2 className="mt-auto mb-auto ml-2">Error</h2>
        </div>
        <span className="h4 d-block">Please Complete Previous Step</span>
        </div>
        </div>
)
    }
}

export default ConfirmUSer;