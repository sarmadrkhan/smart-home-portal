class Room {
  constructor(id, name, homeObjectRefs) {
    this.id = id || '';
    this.name = name || '';
    this.homeObjectRefs = homeObjectRefs || []
  }
}

export default Room;
