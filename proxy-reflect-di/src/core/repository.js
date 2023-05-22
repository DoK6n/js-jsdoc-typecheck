class Repository {
  #database;
  /**
   * @template {Array} T
   * @param {T} database */
  constructor(database) {
    this.#database = database;
  }

  async findMany() {
    return this.#database;
  }

  async create({ data }) {
    return this.#database.push(data);
  }

  async findUnique({ where: { id } }) {
    return this.#database.find((u) => u.id === id);
  }
}

module.exports = { Repository };
