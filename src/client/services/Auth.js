import decode from 'jwt-decode';
import _ from "lodash";

// https://hptechblogs.com/using-json-web-token-react/
export default class AuthService {
    // Initializing important variables
    constructor() { 
        this.domain = window.NODE_ENV == "development" ? 'http://localhost:8080' : 'https://pelican.fittedtech.com'; // API server domain
        this.fetch = this.fetch.bind(this) // React binding stuff
        this.login = this.login.bind(this)
        this.getProfile = this.getProfile.bind(this)
    }
 
    login(email, password) {
        // Get a token from api server using the fetch api 
        return this.fetch(`${this.domain}/api/v1/user/login`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => { 
            this.setToken(res.token) // Setting the token in localStorage
            this.setProfileImage(res.profileImage);
            return Promise.resolve(res);
        })
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // GEtting token from localstorage 
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setProfileImage(base64String) { 
        // Saves user token to localStorage
        return localStorage.setItem('profileImage', base64String)
    }

    setToken(idToken) { 
        // Saves user token to localStorage
        return localStorage.setItem('token', idToken)
    }

    getProfileImage() { 
        // Saves user token to localStorage
        return localStorage.getItem('profileImage')
    }

    getToken() { 
        // Retrieves the user token from localStorage
        return localStorage.getItem('token')
    }

    logout() { 
        // Clear user token and profile data from localStorage
        return localStorage.clear();
    }

    getProfile() {
        // Using jwt-decode npm package to decode the token
        return decode(this.getToken());
    } 

    fetch(url, options) {
        // performs api calls sending the required authentication headers
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        } 

        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.loggedIn()) { 
            headers['Token'] = this.getToken()
        } 
 
        return fetch(url, {
            headers,
            ...options
        })
        .then(this._checkStatus)
        .then(response => response.json())
    }

    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}
