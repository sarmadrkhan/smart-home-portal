class User {
  constructor(id, name, surname, email, phoneNumber, homeRefs) {
    this.id = id || '';
    this.name = name || '';
    this.surname = surname || '';
    this.email = email || '';
    this.phoneNumber = phoneNumber || '';
    this.homeRefs = homeRefs || []
  }
}

export default User;
