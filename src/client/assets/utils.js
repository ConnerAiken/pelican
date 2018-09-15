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
    }
}