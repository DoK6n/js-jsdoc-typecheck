import { IsNumber, IsString } from 'class-validator';

export class CreateUserResponseDto {
  /** @type {number} */
  @IsNumber()
  id;
  /** @type {string} */
  @IsString()
  name;
}
