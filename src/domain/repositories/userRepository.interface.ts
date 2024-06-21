import { UserM } from '../model/user';

export interface UserRepository {
  getUserById(id: number): Promise<UserM>;
  updateRefreshToken(id: number, refreshToken: string): Promise<void>;
}
