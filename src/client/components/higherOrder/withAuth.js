import React, { Component } from 'react';
import AuthService from './../../services/Auth';
import { connect } from "react-redux";

const mapStateToProps = state => { 
    return state;
};
  
// https://hptechblogs.com/using-json-web-token-react/
export default function withAuth(AuthComponent) {
    const Auth = new AuthService('http://localhost:8080');
    
    class AuthWrapped extends Component {
        constructor() {
            super();
            this.state = {
                user: null
            }
        } 

        componentWillMount() {
            if (!Auth.loggedIn()) {
                this.props.history.push('/login')
            }
            else {
                try {
                    const profile = Auth.getProfile();
 

                    this.setState({
                        user: profile
                    })

                    if (Auth.loggedIn() && !profile.verified) {
                        this.props.history.push('/verify') 
                    }
                }
                catch(err){
                    Auth.logout()
                    this.props.history.push('/login')
                }
            }
        }
    
        render() { 
            if (this.state.user) {
                return (
                    <AuthComponent {...this.props}/>
                )
            }
            else {
                return null
            }
        } 
    } 
    
    AuthWrapped = connect(mapStateToProps)(AuthWrapped);

    return AuthWrapped;
 }