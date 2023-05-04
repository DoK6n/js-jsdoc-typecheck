import { Get, JsonController } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
// import { UsersService } from './users.service';
// import Container, { Inject, Service } from 'typedi';
import { users } from '../db/data';

@JsonController('/users')
// @Service()
export class UserController {
  // #usersService;

  // constructor(/** @type {UsersService} */ @Inject() usersService) {
  //   this.#usersService = usersService;
  // }

  @Get('/')
  @OpenAPI({
    summary: '유저 리스트 조회',
    description: '가입된 유저들의 리스트를 가져옵니다.',
    tags: ['users'],
  })
  findAllUsers() {
    return users;
  }
}
