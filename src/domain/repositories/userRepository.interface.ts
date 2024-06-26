import { UserM } from '../model/user';

export interface UserRepository {
  create(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<UserM>;
  updateById(id: number, data: UserM): Promise<void>;
  findOneById(id: number): Promise<UserM>;
  find(): Promise<UserM[]>;
  deleteOneById(id: number): Promise<void>;
}
