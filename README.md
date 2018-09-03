NosTale login server proxy library
==================================
[![npm version](https://img.shields.io/npm/v/nostale-login-proxy.svg)](https://npmjs.com/package/nostale-login-proxy)
[![dependencies](https://img.shields.io/david/imxeno/nostale-login-proxy.svg)](https://david-dm.org/imxeno/nostale-login-proxy)
![license](https://img.shields.io/npm/l/nostale-login-proxy.svg)
[![paypal](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://www.paypal.me/devxeno/0usd)

A Node.js implementation of a login server proxy for NosTale which can do whatever you want in an easy way.

Installation
-------------
```
npm i nostale-login-proxy --save
```

Examples
--------
Practical usage of both authentication and response middlewares is presented in [examples](https://github.com/imxeno/nostale-login-proxy/tree/master/examples).  
The `clientVersionSpoofer.js` file shows how to spoof client version by modifying authentication request.  
The `glacernonChannelInjector.js` file shows how to inject additional channels into the server list by modifying the response from a real login server.  

Constructor
-----------
```javascript
const NosTaleLoginProxy = require('nostale-login-proxy');
const proxy = new NosTaleLoginProxy('79.110.84.75', 4004);
```
### new NosTaleLoginProxy(ip, port)

In order to create a proxy server, you need to instantiate a new object of NosTaleLoginProxy.
By default, the proxy is set up with stub middlewares `(data) => data`.

Parameters:
* `ip` is the IP address of a real login server to which we will proxy requests
* `port` is the port of a real login server to which we will proxy requests

Methods
-------

List of all available methods for NosTaleLoginProxy.

#### listen(ip, port[, callback])
Tells the proxy to listen on passed ip and port.

Parameters: 
* `ip` is the IP address to which we will bind our proxy server
* `port` is the port to which we will bind our proxy server
* `callback` (optional) is passed as a callback to net.Server.listen

#### close([callback])
Tells the proxy to shutdown its socket.

Parameters: 
* `callback` (optional) is passed as a callback to net.Server.close

#### setAuthMiddleware(fn)
Sets an authentication 'middleware' for the proxy server which will process every login request from the client. 

Parameters: 
* `fn` is a function that should accept one string parameter which is the decrypted payload sent from the client to the server, and returns a packet which will be sent to the real login server

#### setResponseMiddleware(fn)
Sets a response 'middleware' for the proxy server which will process every response from the real login server.

Parameters: 
* `fn` is a function that should accept one string parameter which is the decrypted payload sent from the server in response to authentication packet, and returns a packet which will be sent to client

License
-------
ISC License

Copyright (c) 2018, Piotr Adamczyk

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.