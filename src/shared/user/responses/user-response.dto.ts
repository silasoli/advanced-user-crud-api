import { ApiProperty } from '@nestjs/swagger';
import { UserM } from '../../../domain/model/user';

export class UserResponseDto {
  constructor(user: UserM) {
    const { id, name, email, active, created_at, updated_at } = user;

    return { id, name, email, active, created_at, updated_at };
  }

  @ApiProperty({ required: true })
  id: number;

  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: true })
  active: boolean
  
  @ApiProperty({ required: true })
  created_at: Date;

  @ApiProperty({ required: true })
  updated_at: Date;
}