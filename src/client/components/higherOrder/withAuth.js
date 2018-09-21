import React, { Component } from 'react';
import AuthService from './../../services/Auth';

// https://hptechblogs.com/using-json-web-token-react/
export default function withAuth(AuthComponent) {
    const Auth = new AuthService('http://localhost:8080');
    
    return class AuthWrapped extends Component {
        constructor() {
            super();
            this.state = {
                user: null
            }
        } 

        componentWillMount() {
            if (!Auth.loggedIn()) {
                this.props.history.replace('/login')
            }
            else {
                try {
                    const profile = Auth.getProfile();

                    console.log(profile);

                    this.setState({
                        user: profile
                    })

                    if (Auth.loggedIn() && !profile.verified) {
                        this.props.history.replace('/verify') 
                    }
                }
                catch(err){
                    Auth.logout()
                    this.props.history.replace('/login')
                }
            }
        }
    
        render() { 
            if (this.state.user) {
                return (
                    <AuthComponent history={this.props.history} user={this.state.user} />
                )
            }
            else {
                return null
            }
        } 
    } 
    
 }