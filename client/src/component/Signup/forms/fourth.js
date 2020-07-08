import React from 'react'
import Axios from 'axios';

import { API } from '../../js/api_list';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import Loader from 'react-loader-spinner';
import AlreadyHave from '../../SignupSystem/AlreadyHave';
import NewUser from '../../SignupSystem/NewUser';

export default class Fourth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arisen_username: '',
            error: false,
            title: 'Your Account',
            description: 'A dSocial account is known as a PeepsID and you will need to create one or enter an already existant account, in order to proceed.',
            ip: {
                v4: '',
                v6: ''
            },
            loading: false,
            isOpenModal: false,
            isOpenForNewUser: false,
        }
    }

    handleAdd = (e) => {
        e.preventDefault()
        this.setState({isOpenModal: true, title: "Enter Your PeepsID", description: "We're glad to hear you already have a PeepsID. Please enter it below."})
    }
    handleForNewOne = (e) => {
        e.preventDefault()
        this.setState({isOpenForNewUser: true, title: "Create An Account", description: "Enter a username below to proceed. A PeepsID must be up to 12 characters, lowercase and can only use a-z and 1-5. No special characters are allowed."})
    }
    handleError = (e) => {
        this.setState({title: "Username Doesn't Exist!", description: "That username is not registered. Please try again."})
    }
    handleErrorForNewOne = (title = "Username Taken!", description = "The username is taken. Please try again.") => {
        this.setState({title: title, description: description})
    }
    async componentDidMount() {

        const ip = { v4: '', v6: '' }
        await fetch('https://api.ipify.org/')
            .then(res => res.text())
            .then(res => ip.v4 = res)

        await fetch('https://api6.ipify.org/')
            .then(res => res.text())
            .then(res => ip.v6 = res)
        this.setState({ ip });
    }

    handleSignup = (e) => {
        e.preventDefault();
        window.open('https://signup.peepsid.com', '_blank', 'width=400,height=600')
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            error: false,
        })
    }

    handleTransaction = (e) => {
        e.preventDefault();
        const email = localStorage.getItem('googleEmail');
        if (localStorage.getItem('s3')) {
            this.setState({ loading: true })
            if (email && this.state.arisen_username !== '') {
                this.setState({ error: false })
                Axios({
                    method: 'post',
                    url: API.arisen_user_detail,
                    data: {
                        arisen_username: this.state.arisen_username,
                        email: email,
                        ip: this.state.ip,
                        userDetails: {
                            fbUserId: localStorage.getItem('fbUserId'),
                            googleEmail: localStorage.getItem('googleEmail'),
                            instaUserId: localStorage.getItem('instaUserId'),
                            teleUserId: localStorage.getItem('teleUserId'),
                            twitterScreenName: localStorage.getItem('twitterName'),
                            username: localStorage.getItem('username')
                        }
                    },
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                    .then(res => {
                        this.setState({ loading: false })
                        if (res.data) {
                            if (res.data.success) {
                                localStorage.clear();
                                localStorage.setItem('s4', true);
                                localStorage.setItem('message', res.data.message)
                                localStorage.setItem('username', this.state.arisen_username)
                                window.location.hash = '#fifth'
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

    formValidation = () => {
        if (this.state.arisen_username === '') {
            toast("PeepsID missing !!", {
                type: 'error',
                autoClose: 3000,
            })
        }
    }

    render() {

        return (
            <div className="p-0 d-flex bg-white align-items-lg-center">
                <div className="row no-gutters flex-fill justify-content-center">
                    <div className="col-11 col-md-8 col-lg-6 col-xl-6 py-4 p-3 custom-border mt-4 mb-4 gradient-color">
                        <h1 className="h4 text-center">{this.state.title}</h1>
                        <p className="small text-center noteStyle">{this.state.description}</p>
                        {this.state.isOpenModal ?
                            <AlreadyHave errorOn={this.handleError}/> : (<form autoComplete="off">
                            {
                                this.state.isOpenForNewUser ? <NewUser errorOn={this.handleErrorForNewOne}/> : <div className="form-group mb-3">
                                <button className="btn btn-block btn-lg btn-custom br-dot2" onClick={this.handleForNewOne}>
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
                                                'Create New PeepsID'
                                        }
                                    </button>
                                </div>
                            }
                            {
                               !this.state.isOpenForNewUser &&  <div className="form-group">
                               <button className="btn btn-block btn-lg btn-custom br-dot2" onClick={this.handleAdd}>
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
                                           'I Already Have A PeepsID'
                                   }
                               </button>
                           </div>
                            }
                        </form>)
                        }
                    </div>
                </div>
            </div>
        )
    }
}