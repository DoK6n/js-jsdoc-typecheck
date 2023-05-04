import { IsString } from 'class-validator';

export class CreateUserRequestDto {
  /** @type {string} */
  @IsString()
  name;
}
