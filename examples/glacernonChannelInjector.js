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
// Here we are going to set a response middleware, because we want to change the response from
// the login server a little bit.

proxy.setResponseMiddleware((data) => {

    // Here you need to do your customizations to the data payload.
    // In this example, we are going to split the packet first by space character.

    let arr = data.split(' ');

    // Then, we will be checking if the response is an error, and if it is, we will just
    // return unmodified data payload.

    if(arr[0].indexOf('fail') !== -1)
        return data;

    // After we check if the response is not an error, we add another 4 servers (each
    // channel is a different server) to the list using splice, in order to insert them
    // just before the last one, which is a stub and indicates the end of the server list.

    arr.splice(arr.length - 1, 0,
        '79.110.84.174:4015:0:4.51.S4-Gryf(Nowy)',
        '79.110.84.254:4015:0:3.51.S3-Finesia',
        '79.110.84.253:4026:0:2.51.S2-Enigma',
        '79.110.84.132:4015:0:1.51.S1-Avalon'
    );

    // Then we use Array.join to construct a string from the array

    const joined = arr.join(' ');

    // ...and finally we're returning the modified packet.

    return joined;
    
});

// After setting up the proxy, we just need to tell it to listen on specified port and IP

proxy.listen('127.0.0.1', 4004);

// That's all! You're good to go. Try connecting to your new proxy using Xeno's Game Launcher.