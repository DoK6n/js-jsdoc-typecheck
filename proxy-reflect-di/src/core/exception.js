class Exception extends Error {
  constructor(type, message) {
    super(message);
    this.name = type;
  }
}

class ReadonlyException extends Exception {
  constructor(message) {
    super('ReadonlyException', message);
  }
}

module.exports = {
  ReadonlyException,
};
