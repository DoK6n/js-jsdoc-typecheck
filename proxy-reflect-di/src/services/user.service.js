class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async findAllUsers() {
    return await this.userRepository.findAllUsers();
  }

  async findUserById(id) {
    return await this.userRepository.findUserById(id);
  }

  async createUser(user) {
    return await this.userRepository.createUser(user);
  }
}

module.exports = { UserService };
