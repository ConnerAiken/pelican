export default { 
    decodeToken(token) {
        const components = token.split('.');
        const base64url = components[1];
        console.log(components);
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
    initializeComponent(utils) { 
        if(!this.state) this.state = {};

        this.state.pendingRequest = false;
        this.state.user = this.state.user ? this.state.user : {};  
        Object.assign(this.state.user, localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : {});  
        Object.assign(this.state.user, localStorage.getItem("token") ? utils.decodeToken(localStorage.getItem("token")) : {});  
    
        this.opts = { 
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'token': localStorage.getItem('token')
          }
        };
        
        console.log(this.state);
    }
}