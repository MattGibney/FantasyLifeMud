class TelnetSocket {
  constructor(socket) {
    this.socket = socket;
  }

  write(message) {
    this.socket.write(message);// + '\r\n'.repeat(2) + '[] ');
  }

  on(protocol, callback) {
    this.socket.on(protocol, callback);
  }

  terminate() {
    return this.socket.end();
  }
}

module.exports = TelnetSocket;