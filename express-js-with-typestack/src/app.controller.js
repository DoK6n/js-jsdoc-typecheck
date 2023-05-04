import { Controller, Get } from 'routing-controllers';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello() {
    return 'Hello World!';
  }
}
