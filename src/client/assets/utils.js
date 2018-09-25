import AuthService from './../services/Auth';
import toastr from "toastr"; 
import './../../../node_modules/toastr/build/toastr.css';   

export default { 
    decodeToken(token) {
        const components = token.split('.');
        const base64url = components[1]; 
        try {
            //Convert base 64 url to base 64
            var base64 = base64url.replace('-', '+').replace('_', '/')
            //atob() is a built in JS function that decodes a base-64 encoded string
            var utf8 = atob(base64)
            //Then parse that into JSON
            var json = JSON.parse(utf8)
            //Then make that JSON look pretty
            var json_string = JSON.stringify(json, null, 4)
        } catch (err) {
            json_string = "Bad Section.\nError: " + err.message
        }
        return json
    },
    setUserStorage(response) {  
        localStorage.setItem('user', JSON.stringify(response.data.payload));
        localStorage.setItem('token', response.data.token);
    },
    alert(text, type) {

        if(type == 1) {
            toastr.success(text);
        }else if(type == 2) {
            toastr.warning(text);
        }else if(type == 3) {
            toastr.error(text);
        }else {
            toastr.info(text);
        }

    },
    initializeProtectedComponent(utils) {  
        if(!this.state) this.state = {};
 
        this.Auth = new AuthService();
        this.state.pendingRequest = false;
        this.state.user = this.Auth.getProfile();
        this.state.user.profileImage = this.Auth.getProfileImage(); 

        this.componentWillMount = () => {
            if(!this.Auth.loggedIn())
                this.props.history.push('/login');
        }
        

        this.opts = { 
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'token': localStorage.getItem('token')
          }
        };
         
    }
}