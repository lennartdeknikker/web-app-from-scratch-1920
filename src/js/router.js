// Error handling and other steps to build this router were obtained from https://dev.to/kodnificent/how-to-build-a-router-with-vanilla-javascript-2a18.

export class Router {
  constructor() {
    this.routes = [];
  }
  get(uri, callback) {
    
    if(!uri || !callback) throw new Error('uri or callback must be given');

        // ensure that the parameters have the correct types
        if(typeof uri !== "string") throw new TypeError('typeof uri must be a string');
        if(typeof callback !== "function") throw new TypeError('typeof callback must be a function');
        // throw an error if the route uri already exists to avoid confilicting routes
        this.routes.forEach(route=>{
            if(route.uri === uri) throw new Error(`the uri ${route.uri} already exists`);
        });

        const route = {
          uri,
          callback
        }
        this.routes.push(route);
  }
  init(){
    this.routes.some(route=> {
      let regEx = new RegExp(`^${route.uri}`);
      let path = window.location.pathname;

      if(path.match(regEx)) {
        let req = { path }
        return route.callback.call(this, req);
      }
    })
  }
}
