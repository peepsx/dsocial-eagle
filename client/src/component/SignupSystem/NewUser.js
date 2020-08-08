import React from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import { PrivateKey } from '@arisencore/ecc';
import { toast } from 'react-toastify';
import { API } from '../js/api_list';
import { CopyToClipboard } from 'react-copy-to-clipboard'

class NewUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            arisen_username: '',
            passPhrase: [],
            openKey: false,
            ownerPriv: '',
            ownerPub: '',
            activePriv: '',
            activePub: '',
            copied: false,
        }
        this.handleTransaction = this.handleTransaction.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.openKeysBox = this.openKeysBox.bind(this)
        this.registerUser = this.registerUser.bind(this)
    }
    
    handleTransaction = (e) => {
        console.log("Clicked")
            e.preventDefault();
            if(!/^[a-z1-5_]+$/.test(this.state.arisen_username) || this.state.arisen_username.length !== 12) {
                toast("A PeepsID must be up to 12 characters", {
                type: 'error',
                autoClose: 3000,
            })
            return;
        }
            this.setState({loading: true});
            axios.get(`https://nv6khovry9.execute-api.us-east-1.amazonaws.com/dev/lookup/${this.state.arisen_username}`)
                    .then(user => {
                        this.setState({loading: false});
                        this.props.errorOn();
                    })
                    .catch(async e => {
                        let response = await axios.get(API.passPhrase);
                         let master = PrivateKey.fromSeed(response.data.Mnemonic_List);
                         let ownerPrivate = master.getChildKey('owner');
                         let activePrivate = ownerPrivate.getChildKey('active');
                            this.setState({passPhrase: response.data.Mnemonic_List.split(" "), loading: false, ownerPriv: ownerPrivate.toString(),ownerPub: PrivateKey.fromString(ownerPrivate.toWif()).toPublic().toString(),activePriv: activePrivate.toString(), activePub: PrivateKey.fromString(activePrivate.toWif()).toPublic().toString()});

                            this.props.errorOn("Your Backup Phrase and Keys", "You must save the following backup phrase, as it is used to import your PeepsID on other devices and other Peeps apps like dSocial. Your keys are not displayed for security.", this.state.passPhrase)
                    })

    }
    registerUser = async (e) => {
            e.preventDefault();
            try {
                this.setState({loading: true});
                let register = await axios(`https://nv6khovry9.execute-api.us-east-1.amazonaws.com/dev/newuser/${this.state.arisen_username}/${this.state.ownerPub}/${this.state.activePub}`)
                if(register) {
                    this.setState({loading: false})
                    axios.post(API.registerUser, {username: this.state.arisen_username})
                    .then(user_res => {
                        localStorage.setItem('token', user_res.data.token)
                        localStorage.setItem('username', this.state.arisen_username)
                        window.location.hash = "#second"
                    })
                    .catch(err => {
                        if (err.response && err.response.status === 403) {
                            toast("This id is already been used", {
                                type: 'warning',
                                autoClose: 3000,
                            })
                        }
                        this.setState({loading: true});    
                        window.location.hash = '/'
                    })
                }
                else {
                    this.setState({loading: true});
                    window.location.hash = "/"
                }

            } catch (e) {
                this.setState({loading: true});
                this.props.errorOn("User not register", "User is not registered");
            }
    }
    openKeysBox = (e) => {
            e.preventDefault()
            this.setState({openKey: true})
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            error: false,
        })
    }
    textCopy = (text) => {

        if(text) {
            this.setState({copied: text})
            setTimeout(() => {
                this.setState({copied: false})
            }, 2000)
        }
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
         :  !this.state.openKey ? <div id="fourth">
         <div className="p-0 d-flex bg-white align-items-lg-center">
             <div className="row no-gutters flex-fill justify-content-center">
                 <div className="col-11 col-md-11 col-lg-11 col-xl-11 py-4 p-3 custom-border gradient-color">
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
                     <button className="btn btn-block btn-lg btn-custom br-dot2" onClick={this.openKeysBox}>Show Me The Keys</button>
                     <button className="btn btn-block btn-lg btn-custom br-dot2" onClick={this.registerUser}>
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
         </div>
    </div> :  <div className="p-0 d-flex bg-white align-items-lg-center">
                <div className="row no-gutters flex-fill justify-content-center">
                    <div className="col-11 col-md-11 col-lg-11 col-xl-11 py-4 p-3 custom-border gradient-color">
                        <div className="key-container">
                            <h5>owner public key &nbsp;<CopyToClipboard text={"PUBLIC_KEY - " + this.state.ownerPub + " , PRIVATE_KEY - " + this.state.ownerPriv}
                              onCopy={(text,result) => {
                                this.textCopy(text)
                            }}>
                                <span><i className="fa fa-copy"></i></span>
                            </CopyToClipboard>
                            {"PUBLIC_KEY - " + this.state.ownerPub + " , PRIVATE_KEY - " + this.state.ownerPriv === this.state.copied ? <span style={{color: 'red', fontSize: 14, marginLeft: 10}}>Public & Private Key Copied</span> : null}
                            </h5>
                                <div className="spacer"></div>
                                <div className="key-input">
                                    <input type="text" placeholder="" defaultValue={this.state.ownerPub}/>
                                </div>
                                <div className="green-label-input">
                                    <div className="green-label">
                                        <i className="fa fa-key key"></i>
                                    </div>
                                    <input type="text" placeholder="" defaultValue={this.state.ownerPriv}/>
                                </div>
                        </div>
                        <div className="key-container">
                            <h5>active public key &nbsp;<CopyToClipboard text={"PUBLIC_KEY - " + this.state.activePub + " , PRIVATE_KEY - " + this.state.activePriv}
                              onCopy={(text,result) => {
                                this.textCopy(text)
                            }}>
                                <span><i className="fa fa-copy"></i></span>
                            </CopyToClipboard>
                            {"PUBLIC_KEY - " + this.state.activePub + " , PRIVATE_KEY - " + this.state.activePriv === this.state.copied ? <span style={{color: 'red', fontSize: 14, marginLeft: 10}}>Public & Private Key Copied</span> : null}
                            </h5>
                                <div className="spacer"></div>
                                <div className="key-input">
                                    <input type="text" placeholder="" defaultValue={this.state.activePub}/>
                                </div>
                                <div className="green-label-input">
                                    <div className="green-label">
                                        <i className="fa fa-key key"></i>
                                    </div>
                                    <input type="text" placeholder="" defaultValue={this.state.activePriv}/>
                                </div>
                        </div>
                        <button className="btn btn-block btn-lg btn-custom br-dot2" onClick={this.registerUser}>
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
                </div>
            </div>
            )
    }
}

export default NewUser;