import { UserM } from '../model/user';

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  salt: string;
}

export interface IUpdateUser extends Partial<ICreateUser> {}

export interface UserRepository {
  create(dto: ICreateUser): Promise<UserM>;
  updateById(id: number, dto: Partial<ICreateUser>): Promise<void>;
  findOneById(id: number): Promise<UserM>;
  find(): Promise<UserM[]>;
  deleteOneById(id: number): Promise<void>;
}
