class HomeObject {

  static VALID_TYPES = ['light', 'socket', 'shutter'];
  static VALID_STATES = [0, 1, 2];

  constructor(id, name, state, type) {
    this.id = id || '';
    this.name = name || '';

    if (HomeObject.VALID_STATES.includes(state)) {
      this.state = state;
    } else {
      throw new Error(`Invalid state: ${state}. Valid states are ${HomeObject.VALID_STATES.join(', ')}.`);
    }

    if (HomeObject.VALID_TYPES.includes(type)) {
      this.type = type;
    } else {
      throw new Error(`Invalid type: ${type}. Valid types are ${HomeObject.VALID_TYPES.join(', ')}.`);
    }
  }
}

export default HomeObject;
