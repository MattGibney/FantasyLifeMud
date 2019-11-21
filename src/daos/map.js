class MapDao {
  fetchMapById(mapId) {
    const mapData = require('../../maps/' + mapId);
    if(!mapData) {
      return null;
    }
    return mapData;
  }
}

module.exports = MapDao;