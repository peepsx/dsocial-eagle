import React from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import { API } from '../js/api_list';
import { toast } from 'react-toastify';

class AlreadyHave extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            arisen_username: '',
            error: ''
        }
        this.handleTransaction = this.handleTransaction.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    
    handleTransaction = (e) => {
        
        this.setState({loading: true})
            e.preventDefault();
            if(!/^[a-z1-5_]+$/.test(this.state.arisen_username) || this.state.arisen_username.length !== 12) {
                toast("A PeepsID must be up to 12 characters", {
                type: 'error',
                autoClose: 3000,
            })
            this.setState({loading: false})
            return;
        }
            axios.get(`https://nv6khovry9.execute-api.us-east-1.amazonaws.com/dev/lookup/${this.state.arisen_username}`)
                    .then(user => {
                        this.setState({loading: false})
                        // window.location.hash = "#second";
                        axios.post(API.registerUser, {username: this.state.arisen_username})
                        .then(user_res => {
                            localStorage.setItem('token', user_res.data.token)
                            localStorage.setItem('username', this.state.arisen_username)
                            window.location.hash = "#second"
                        })
                        .catch(err => {
                            if (err.response && err.response.status === 403) {
                                toast("this id is already been used", {
                                    type: 'warning',
                                    autoClose: 3000,
                                })
                            }
                            console.log("ERROR", e)
                            window.location.hash = '/'
                        })
                    })
                    .catch(e => {
                        this.setState({loading: false})
                        console.log('ERROR', e)
                        // this.setState({error: e.response.data.error})
                        this.props.errorOn();
                    })

    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            error: false,
        })
    }

    render() {
        
        return (
        <div className="form-group mb-3">
            <div className="d-flex justify-content-between">
                <label htmlFor="password" className="text-dark">PeepsID:</label>
            </div>
            <input
                name="arisen_username"
                id="username"
                type="text"
                className="form-control b-none"
                placeholder="Enter your PeepsID or Arisen username"
                value={this.state.arisen_username}
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
                            'Proceed To Next Step'
                    }
                </button>
        </div>
        )
    }
}

export default AlreadyHave;