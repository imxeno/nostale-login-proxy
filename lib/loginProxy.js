const net = require('net');
const nosCrypto = require('./crypto');
const proxyAuthRequest = require('./loginClient');

module.exports = class NosTaleLoginProxy {
    constructor(ip, port) {
        this._ip = ip;
        this._port = port;
        this._constructServer();
    }
    setAuthMiddleware(fn) {
        this._authMiddleware = fn;
        return this;
    }
    setResponseMiddleware(fn) {
        this._responseMiddleware = fn;
        return this;
    }
    _authMiddleware(data) {
        return data;
    }
    _responseMiddleware(data) {
        return data;
    }
    _constructServer() {
        this._server = new net.createServer((socket) => {
            socket.on('data', async (data) => {
                const decryptedAuth = nosCrypto.decryptAuth(data);
                const processedAuth = this._authMiddleware(decryptedAuth);
                const encryptedAuth = nosCrypto.encryptAuth(processedAuth);
                const realResponse = await proxyAuthRequest(this._ip, this._port, encryptedAuth);
                const decryptedResponse = nosCrypto.decryptResponse(realResponse);
                const processedResponse = this._responseMiddleware(decryptedResponse);
                const encryptedResponse = nosCrypto.encryptResponse(processedResponse);
                socket.write(encryptedResponse);
            })
        });
    }
    listen(ip, port, callback) {
        this._server.listen(port, ip, callback);
    }
    close(callback) {
        this._server.close(callback);
    }
}