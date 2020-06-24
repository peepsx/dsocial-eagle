import React from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import { PrivateKey, PublicKey } from '@arisencore/ecc';
const ethers = require('ethers');
import { toast } from 'react-toastify';

///

// master = PrivateKey.fromSeed(Mnemonic_List) 
// ownerPrivate = master.getChildKey('owner')
// activePrivate = ownerPrivate.getChildKey('active')



// console.log(ownerPrivate.toString()," ",PrivateKey.fromString(ownerPrivate.toWif()).toPublic().toString(),"   ",activePrivate.toString() , PrivateKey.fromString(activePrivate.toWif()).toPublic().toString())
///
class NewUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            arisen_username: '',
            passPhrase: [],

        }
        this.handleTransaction = this.handleTransaction.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    
    handleTransaction = (e) => {
        console.log("Clicked")
            e.preventDefault();
            if(/^[^a-z][1-5]+$/.test(this.state.arisen_username)) {
                toast("A PeepsID must be up to 12 characters", {
                type: 'error',
                autoClose: 3000,
            })
            return;
        }

            axios.get(`https://nv6khovry9.execute-api.us-east-1.amazonaws.com/dev/lookup/${this.state.arisen_username}`)
                    .then(user => {
                        this.props.errorOn();
                    })
                    .catch(e => {
                        console.log("error", e.response)
                        let wallet = ethers.Wallet.createRandom();
                         let Mnemonic_List = wallet.mnemonic
                         this.setState({passPhrase: Mnemonic_List.split(" ")})
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
            this.state.passPhrase.length !== 12 ? <div className="form-group mb-3">
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
                            'Proceed'
                    }
                </button>
        </div>
         :  <div id="fourth">
        <div className="p-0 d-flex bg-white align-items-lg-center">
            <div className="row no-gutters flex-fill justify-content-center">
                <div className="col-11 col-md-8 col-lg-6 col-xl-6 py-4 p-3 custom-border mt-4 mb-4 gradient-color">
                    <div className="random-mnemonic">
                        <span>{"1." +this.state.passPhrase[0]}</span>
                        <span>{"2." +this.state.passPhrase[1]}</span>
                        <span>{"3." +this.state.passPhrase[2]}</span>
                        <span>{"4." +this.state.passPhrase[3]}</span>
                        <span>{"5." +this.state.passPhrase[4]}</span>
                        <span>{"6." +this.state.passPhrase[5]}</span>
                        <span>{"7." +this.state.passPhrase[6]}</span>
                        <span>{"8." +this.state.passPhrase[7]}</span>
                        <span>{"9." +this.state.passPhrase[8]}</span>
                        <span>{"10." +this.state.passPhrase[9]}</span>
                        <span>{"11." +this.state.passPhrase[10]}</span>
                        <span>{"12." +this.state.passPhrase[11]}</span>
                    </div>
                </div>
                    <button className="btn btn-block btn-lg btn-custom br-dot2">Show Me The Keys</button>
                    <button className="btn btn-block btn-lg btn-custom br-dot2">Proceed To Next Step</button>
            </div>
        </div>
    </div>
            
            )
    }
}

export default NewUser;