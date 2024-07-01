import { CreateUserDto } from '../../shared/user/dtos/create-user.dto';
import { UpdateUserDto } from '../../shared/user/dtos/update-user.dto';
import { UserM } from '../model/user';

export interface UserRepository {
  create(dto: CreateUserDto): Promise<UserM>;
  updateById(id: number, dto: UpdateUserDto): Promise<void>;
  findOneById(id: number): Promise<UserM>;
  find(): Promise<UserM[]>;
  deleteOneById(id: number): Promise<void>;
}
