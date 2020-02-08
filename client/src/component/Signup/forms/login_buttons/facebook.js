import React from 'react';
import Axios from 'axios';
import { API } from '../../../js/api_list'


class Facebook extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fbUserData: '',
        }

        // this.handleFbClick = this.handleFbClick.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleSave() {
        const userData = this.state.fbUserData;
        if (userData && userData.data) {
            Axios({
                url: API.facebook_detail,
                method: 'POST',
                data: {
                    fbUserURL: "dummy url",
                    fbPhoto: userData.data.picture.data.url,
                    fbUserName: userData.data.name,
                    fbUserLocation: 'noida'
                }
            })
                .then(response => {
                    console.log('Data save facebook', response);
                })
                .catch(err => {
                    console.error('Error', err);
                })
        }
    }

    handleFbClick = () => {
        if (window.FB) {
            window.FB.login((response) => {
                if (response.status === 'connected') {
                    const userId = response.authResponse.userID.replace(/"/, ""),
                        userAccessToken = response.authResponse.accessToken.replace(/"/, "");
                    Axios({
                        method: 'GET',
                        url: `https://graph.facebook.com/v5.0/${userId}?fields=name,email,link,picture,location{location{city,state,country}}&access_token=${userAccessToken}`
                    })
                        .then((fbData) => {
                            console.log('fb user data', fbData);
                            console.log('this console', this);
                            this.setState({
                                fbUserData: fbData
                            })
                        })
                        .catch(err => {
                            console.error('Error', err);
                        })
                } else {
                    alert('User Login failed')
                }
            }, {
                return_scoper: true,
            });
        }

    }



    render() {
        console.log('props value', this.state)
        return (
            <React.Fragment>
                <button onClick={this.handleFbClick} type="button" className="btn btn-block btn-outline-light border py-4 h-100">
                    <img className="icon mb-3" src="assets/img/arisen/facebook.png" alt="facebook" />
                    <span className="h6 mb-0 d-block">Facebook</span>
                </button>
                <button onClick={this.handleSave} type="button">Test click save</button>
            </React.Fragment>
        )
    }
}

export default Facebook;