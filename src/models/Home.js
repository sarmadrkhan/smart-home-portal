class Home {
  constructor(id, name, description, city, roomRefs) {
    this.id = id || '';
    this.name = name || '';
    this.description = description || '';
    this.city = city || '';
    this.roomRefs = roomRefs || []
  }
}

export default Home;