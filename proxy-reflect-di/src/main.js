const express = require('express');
const bodyParser = require('body-parser');
const { UserRepository } = require('./repositories/user.repository');
const { UserController } = require('./routes/user.controller');
const { UserService } = require('./services/user.service');
const { DIContainer, Module } = require('./core/di-container');

class Server {
  #PORT;
  /** @type {express.Application} */
  app;

  module;

  constructor() {
    this.#PORT = process.env.PORT || 8080;
    this.app = express();
    this.#setMiddlewares();

    // const container = new DIContainer();
    // container.register('userRepository', new UserRepository());
    // container.register('userService', new UserService(container.get('userRepository')));

    // this.userController = new UserController(container.get('userService'));

    this.module = Module({
      imports: [UserRepository],
      controllers: [UserController],
      providers: [UserService],
    });

    this.#setRoutes();
  }

  /**
   * 등록된 라우터 경로 배열 반환
   *
   * @return {string[]}
   * */
  get paths() {
    return this.app._router.stack
      .filter((layer) => layer.name === 'router')[0]
      .handle.stack.map((l) => l.name === 'bound dispatch' && l.route);
  }

  /**
   * 미들웨어 등록
   */
  #setMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));

    // this.app.use('/users', this.userController.router);
  }

  #setRoutes() {
    this.app.use('/user', this.userController.router);
  }

  async bootstrap() {
    await this.app.listen(this.#PORT, () => {
      const HOST_URL = process.env.HOST_URL || `http://localhost:${this.#PORT}`;
      console.log(
        `

              🚀 Server ready at: ${HOST_URL}
        `,
      );
    });
  }
}

if (process.env.NODE_ENV !== 'test') {
  const app = new Server();
  app.bootstrap();
  console.log(app.paths);
}
