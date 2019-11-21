const assert = require('assert');

const Socket = require('../src/socket');

describe('Class: Socket', function() {

  describe('Function: terminate', function() {
    beforeEach(function() {
      this.mockSocket = {
        endCalled: false,
        end() {
          this.endCalled = true;
        }
      };
    });
    afterEach(function() {
      delete this.mockSocket;
    });
    it('Should kill the connection', function() {
      const client = new Socket(this.mockSocket);

      client.terminate();

      assert.equal(this.mockSocket.endCalled, true);
    });
  });

});