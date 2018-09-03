const net = require('net');

module.exports = (ip, port, payload) => {
    return new Promise((resolve) => {
        const socket = new net.Socket();
        socket.connect(port, ip);
        socket.on('connect', () => {
            socket.write(payload);
        });
        socket.on('data', (data) => {
            resolve(data);
        });
    });
}