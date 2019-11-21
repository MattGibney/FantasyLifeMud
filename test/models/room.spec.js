/* eslint-env node, mocha */
const assert = require('assert');
const sinon = require('sinon');

const Room = require('../../src/models/room');

describe('Class: Room', function() {
  describe('Function: getRoomInDirection', function() {
    it('returns null when the room has no exits', function() {
      const room = new Room({}, {}, {}, {});

      assert.equal(
        room.getRoomInDirection('N'),
        null
      );
    });
    it('returns null when the direction is not a valid exit', function() {
      const room = new Room({}, {}, {}, { exits: [ { direction: 'S', id: 1 } ] });

      assert.equal(
        room.getRoomInDirection('N'),
        null
      );
    });
    it('returns the id of the room at a given exit', function() {
      const fetchRoomStub = sinon.stub().returns('TEST');

      const fetchMapStub = sinon.stub().returns({
        fetchRoom: fetchRoomStub
      });
      const mockExits = [
        { direction: 'S', id: 1 },
        { direction: 'N', id: 2 }
      ];

      const room = new Room(
        { mapModel: { fetchMap: fetchMapStub } },
        {},
        {},
        { exits: mockExits }
      );

      assert.equal(
        room.getRoomInDirection('N'),
        'TEST'
      );
    });
  });
});