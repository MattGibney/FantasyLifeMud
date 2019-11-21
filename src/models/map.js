class MapModel {
  constructor(ModelFactory, DaoFactory, mapData) {
    this.ModelFactory = ModelFactory;
    this.DaoFactory = DaoFactory;

    this.id = mapData.id;
    this.rooms = mapData.rooms
      .map(room => new ModelFactory.room(
        ModelFactory, DaoFactory, this, room
      ));
  }

  static fetchMap(ModelFactory, DaoFactory, mapId) {
    const mapData = DaoFactory.mapDao.fetchMapById(mapId);
    if(!mapData) {
      return;
    }
    return new MapModel(ModelFactory, DaoFactory, mapData);
  }

  fetchRoom(roomId) {
    return this.rooms.find(room => room.id === roomId);
  }
}

module.exports = MapModel;