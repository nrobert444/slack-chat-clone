class Namespace {
  constructor(id, nstTitle, img, endpoint) {
    this.id = id
    this.nstTitle = nstTitle
    this.img = img
    this.endpoint = endpoint
    this.rooms = []
  }
  addRoom(roomObj) {
    this.rooms.push(roomObj)
  }
}

module.exports = Namespace
