import React from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom' 

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
        console.log("Clicked")
            e.preventDefault();
            axios.get(`https://nv6khovry9.execute-api.us-east-1.amazonaws.com/dev/lookup/${this.state.arisen_username}`)
                    .then(user => {
                        window.location.hash = "#second";
                    })
                    .catch(e => {
                        this.setState({error: e.response.data.error})
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