import { BadRequestError, HttpError } from 'routing-controllers';
import { Service } from 'typedi';
import { users, asyncUsers } from '../db/data';

@Service()
export class UsersService {
  async findAllUsers() {
    // throw new HttpError(404, 'Not Found');
    // throw new BadRequestError('Not Found');

    // return await users;
    return await asyncUsers();
  }
}
