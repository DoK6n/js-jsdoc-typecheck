import 'reflect-metadata';
import express from 'express';
import { IpAddress } from './common/utils';
import bodyParser from 'body-parser';
import { getMetadataArgsStorage, useContainer, useExpressServer } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import * as swaggerUiExpress from 'swagger-ui-express';
// import Container from 'typedi';

export class Server {
  #PORT;
  /** @type {express.Application} */
  app;
  #routingControllersOptions;

  constructor() {
    this.#PORT = process.env.PORT || 3000;
    this.app = express();
    this.#routingControllersOptions = {
      cors: true,
      routePrefix: '/api/v1',
      controllers: [__dirname + '/**/*.controller{.ts,.js}'],
      // middlewares: [__dirname + '/common/middlewares/**/*{.ts,.js}'],
    };
    // useContainer(Container);
    useExpressServer(this.app, this.#routingControllersOptions);
    this.#setMiddlewares();
  }

  /**
   * 등록된 라우터 경로 배열 반환
   *
   * @return {string[]}
   * */
  get paths() {
    return this.app._router.stack
      .filter(layer => layer.name === 'bound dispatch' && layer.route)
      .map(l => l.route.path);
  }

  /**
   * 미들웨어 등록
   */
  #setMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));

    const storage = getMetadataArgsStorage();
    const spec = routingControllersToSpec(storage, this.#routingControllersOptions);
    this.app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(spec));
  }

  async bootstrap() {
    await this.app.listen(this.#PORT, () => {
      const HOST_URL = process.env.HOST_URL || `http://localhost:${this.#PORT}`;
      console.log(
        `

              🚀 Server ready at: ${IpAddress.current}:${this.#PORT}
              📗 URL for OpenAPI: ${HOST_URL}/api-docs
              🌐 URL for HOST : ${HOST_URL}
        `,
      );
    });
  }
}

if (process.env.NODE_ENV !== 'test') {
  const app = new Server();
  app.bootstrap();
}
