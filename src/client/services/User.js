import AuthService from "./Auth";
import _ from "lodash";
 
export default class UserService {
    // Initializing important variables
    constructor() { 
        this.domain = window.NODE_ENV == "development" ? 'http://localhost:8080' : 'https://pelican.fittedtech.com'; // API server domain
        this.Auth = new AuthService(); 
        this.toggleAcceptingOrders = this.toggleAcceptingOrders.bind(this);
    }
 
    toggleAcceptingOrders(state) {
        // Get a token from api server using the fetch api 
        return this.Auth.fetch(`${this.domain}/api/v1/user/isAcceptingOrders`, {
            method: 'POST',
            body: JSON.stringify({
                isAcceptingOrders: state.isAcceptingOrders
            })
        })
    } 
     
}
