const RoomData = require('../../maps/castele');

class RoomDao {
  fetchAllRooms() {
    return RoomData;
  }

  fetchRoom(roomId) {
    return RoomData.find(room => room.id === roomId);
  }
}

module.exports = RoomDao;