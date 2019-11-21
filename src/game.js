const Config = require('../config/environment');

class Game {
  constructor(ModelFactory, DaoFactory) {
    this.ModelFactory = ModelFactory;
    this.DaoFactory = DaoFactory;

    this.connectedPlayers = [];

    // this.rooms = ModelFactory.room
    //   .fetchAllRooms(ModelFactory, DaoFactory);

    this.maps = this._prepareMaps();
  }

  _prepareMaps() {
    const mapIds = Config.maps;
    return mapIds.map(mapId => this.ModelFactory.mapModel
      .fetchMap(this.ModelFactory, this.DaoFactory, mapId));
  }

}

module.exports = Game;