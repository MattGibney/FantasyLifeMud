const PlayerModel = require('./models/player');
const RoomModel = require('./models/room');
const MapModel = require('./models/map');

module.exports = {
  player: PlayerModel,
  room: RoomModel,
  mapModel: MapModel
};