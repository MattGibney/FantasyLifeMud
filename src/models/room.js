class Room {
  constructor(ModelFactory, DaoFactory, mapObj, roomDetail) {
    this.ModelFactory = ModelFactory;
    this.DaoFactory = DaoFactory;

    this.id = roomDetail.id;
    this.name = roomDetail.name;
    this.description = roomDetail.description;
    this.exits = roomDetail.exits || [];
    this.commands = roomDetail.commands || [];

    this.mapObj = mapObj;
  }

  /**
   * Returns the room id of an exit in a given direction.
   * @param {string} direction a cardinal direction [N, S, E, W]
   * @returns {number} Identifier of a room
   */
  getRoomInDirection(direction) {
    if(this.exits.length < 1) {
      return null;
    }

    const exit = this.exits
      .find(exit => exit.direction === direction);

    if(!exit) {
      return null;
    }

    const exitMapId = exit.mapId || this.mapObj.id;

    const newMap = this.ModelFactory.mapModel.fetchMap(
      this.ModelFactory,
      this.DaoFactory,
      exitMapId
    );
    return newMap.fetchRoom(exit.roomId);
  }
}

module.exports = Room;