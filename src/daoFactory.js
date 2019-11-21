const RoomDao = require('./daos/room');
const MapDao = require('./daos/map');

module.exports = {
  room: new RoomDao,
  mapDao: new MapDao
};