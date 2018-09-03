// Firstly, you need to require this library, however if you are not running inside
// /examples directory you should replace the '../' with 'nostale-login-proxy'

const NosTaleLoginProxy = require('../');

// Then, you need to create a new instance of NosTaleLoginProxy class
// The first argument passed to the constructor is the IP of the login server you want to
// proxy requests to. The second argument is the port of that login server.

const proxy = new NosTaleLoginProxy('79.110.84.75', 4004);

// Then you may set 'middlewares' for both authorization request and response, which will allow
// you to intercept the payload and change it to match your needs.
// A 'middleware' is just a function that accepts string data as its only parameter and returns
// that data (regardless if it was modified or not).
// Here we are going to set an auth middleware, because we want to change the authentication string
// that is sent from the client to the server.

proxy.setAuthMiddleware((data) => {

    // We'll replace the version string in the packet with a hardcoded one and return this modified packet.
    // This example somehow allows you to join the server with any client, just because the
    // client version specified here is one major version above the current one at the time of writing this.
    // HOWEVER if the client version is really old, it has a different authentication packet structure,
    // so you will need to do more modifications of the packet which won't be explained here.

    return data.replace(/\d+\.\d+\.\d+\.\d+/, '1.2.3.4567');

});

// After setting up the proxy, we just need to tell it to listen on specified port and IP

proxy.listen('127.0.0.1', 4004);

// That's all! You're good to go. Try connecting to your new proxy using Xeno's Game Launcher.