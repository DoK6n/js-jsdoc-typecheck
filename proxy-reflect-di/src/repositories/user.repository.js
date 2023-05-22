const { Repository } = require('../core/repository');

class UserRepository extends Repository {
  constructor() {
    super([
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
      { id: 3, name: 'John Smith' },
    ]);
  }

  async findAllUsers() {
    return await this.findMany();
  }

  async findUserById(id) {
    return await this.findUnique({
      where: {
        id,
      },
    });
  }

  async createUser(data) {
    return await this.create({
      data,
    });
  }
}

module.exports = { UserRepository };
