const { Controller } = require('../core/controller');

class UserController extends Controller {
  constructor(userService) {
    super();
    this.userService = userService;
    this.router.get('/', this.findAllUsers.bind(this));
    this.router.get('/:id', this.findUserById.bind(this));
    this.router.post('/', this.createUser.bind(this));
  }

  async findAllUsers(req, res) {
    return await this.userService.findAllUsers();
  }

  async findUserById(req, res) {
    return await this.userService.findUserById(req.params.id);
  }

  async createUser(req, res) {
    return await this.userService.createUser(req.body);
  }
}

module.exports = { UserController };
