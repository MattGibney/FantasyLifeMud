/* eslint-env node, mocha */
const assert = require('assert');
const sinon = require('sinon');

const Player = require('../../src/models/player');

describe('Class: Player', function() {

  describe('Function: instruction', function() {

    describe('Understands Look', function() {
      it('understands the basic command', function() {
        const logStub = sinon.stub();
        const player = new Player({}, {}, {}, { log: logStub });
        sinon.stub(player, 'getCurrentRoom').returns({ commands: [] });

        const lookStub = sinon.stub(player, 'commandLook');

        player.instruction('look');
        assert.ok(lookStub.called);

        assert.deepEqual(
          logStub.getCall(0).args[0],
          {
            level: 'info',
            message: { command: 'look' }
          }
        );
      });
    });

    describe('Understands Move', function() {
      it('understands the basic command', function() {
        const logStub = sinon.stub();
        const player = new Player({}, {}, {}, { log: logStub });
        sinon.stub(player, 'getCurrentRoom').returns({ commands: [] });

        const moveStub = sinon.stub(player, 'commandMove');

        player.instruction('move');
        assert.ok(moveStub.called);

        assert.deepEqual(
          logStub.getCall(0).args[0],
          {
            level: 'info',
            message: { command: 'move' }
          }
        );
      });
      it('understands direction arguments', function() {
        const logStub = sinon.stub();
        const player = new Player({}, {}, {}, { log: logStub });
        sinon.stub(player, 'getCurrentRoom').returns({ commands: [] });

        const moveStub = sinon.stub(player, 'commandMove');

        player.instruction('move u');
        assert.equal(moveStub.getCall(0).args[0], 'u');

        player.instruction('move d');
        assert.equal(moveStub.getCall(1).args[0], 'd');

        assert.deepEqual(
          logStub.getCall(0).args[0],
          {
            level: 'info',
            message: { command: 'move u' }
          }
        );

        assert.deepEqual(
          logStub.getCall(1).args[0],
          {
            level: 'info',
            message: { command: 'move d' }
          }
        );
      });
    });
  });

  describe('Function: commandLook', function() {
    it('displays description for current room', function() {
      const player = new Player({}, {});
      sinon.stub(player, 'getCurrentRoom').returns({
        name: 'Test Room',
        description: 'This is a test Room',
        exits: []
      });
      const sendMessageStub = sinon.stub(player, 'sendMessage');

      player.commandLook();

      assert.equal(
        sendMessageStub.args[0],
`
                                   \u001b[36mTest Room\u001b[39m
This is a test Room`
      );
    });

    it('displays exits under the description', function() {
      const player = new Player({}, {});
      // player.isAuthenticated = true;
      sinon.stub(player, 'getCurrentRoom').returns({
        name: 'Test Room',
        description: 'This is a test Room',
        exits: [ { direction: 'N', id: 1 } ]
      });
      const sendMessageStub = sinon.stub(player, 'sendMessage');

      player.commandLook();

      assert.equal(
        sendMessageStub.args[0],
`
                                   \u001b[36mTest Room\u001b[39m
This is a test Room
Exits: \u001b[33mN \u001b[39m
`
      );
    });
  });

  describe('Function: sendMessage', function() {
    it('adds the prompt to the end of all messages', function() {
      const writeStub = sinon.stub();
      const player = new Player(
        {
          write: writeStub
        }, 
        {}
      );

      player.sendMessage('THIS IS A TEST');

      assert.equal(writeStub.args[0], `THIS IS A TEST
[] `);
    });
  });

  describe('Function: getCurrentRoom', function() {
    it('gets the correct room object for users current location', function() {;
      const mockRooms = [
        { id: 1 },
        { id: 2 },
      ];
      const mockGame = {
        maps: [
          {
            id: 'login',
            rooms: mockRooms
          }
        ]
      };
      const player = new Player({}, mockGame, { roomId: 1 });

      assert.deepEqual(player.getCurrentRoom(), mockRooms[0]);

      player.roomId = 2;
      assert.deepEqual(player.getCurrentRoom(), mockRooms[1]);
    });
  });

});