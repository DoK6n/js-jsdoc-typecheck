const { Controller } = require('../core/controller');

class UserController extends Controller {
  userService;
  constructor(userService) {
    super();
    this.userService = userService;
    this.init();
  }

  init() {
    this.router.get('/', this.findAllUsers);
    this.router.get('/:id', this.findUserById);
    this.router.post('/create', this.createUser);
    // this.router.get('/', this.findAllUsers.bind(this));
    // this.router.get('/:id', this.findUserById.bind(this));
    // this.router.post('/create', this.createUser.bind(this));
  }

  async findAllUsers(req, res) {
    console.log(`[${this}]`, 'findAllUsers');
    const result = await this.userService.findAllUsers();
    return result;

    // return await this.userService.findAllUsers();
  }

  async findUserById(req, res) {
    console.log(`[${this.name}]`, 'findUserById');
    const result = await this.userService.findUserById(req.params.id);
    return result;

    // return await this.userService.findUserById(req.params.id);
  }

  async createUser(req, res) {
    const result = await this.userService.createUser(req.body);
    return result;
    // return await this.userService.createUser(req.body);
  }
}

module.exports = { UserController };
