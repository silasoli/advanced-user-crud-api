import { UserM } from '../model/user';

export interface UserRepository {
  create(data: UserM): Promise<UserM>;
  updateById(id: number, data: UserM): Promise<void>;
  findOneById(id: number): Promise<UserM>;
  deleteOneById(id: number): Promise<void>;
  updateRefreshToken(id: number, refreshToken: string): Promise<void>;
}
