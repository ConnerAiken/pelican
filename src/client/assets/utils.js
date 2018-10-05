import AuthService from './../services/Auth';
import toastr from "toastr"; 
import './../../../node_modules/toastr/build/toastr.css';    

export default {  
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