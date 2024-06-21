import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserM } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/userRepository.interface';
import { User } from '../entities/user.entity';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userEntityRepository: Repository<User>,
  ) {}

  async getUserById(id: number): Promise<UserM> {
    const user = await this.userEntityRepository.findOne({
      where: { id },
    });

    if (!user) return null;

    return this.toUser(user);
  }

  async updateRefreshToken(id: number, refresh_token: string): Promise<void> {
    await this.userEntityRepository.update({ id }, { refresh_token });
  }

  private toUser(userEntity: User): UserM {
    const user: UserM = { ...userEntity };

    return user;
  }

  // private toUserEntity(adminUser: UserM): User {
  //   const adminUserEntity: User = new User();

  //   adminUserEntity.username = adminUser.username;
  //   adminUserEntity.password = adminUser.password;
  //   adminUserEntity.last_login = adminUser.lastLogin;

  //   return adminUserEntity;
  // }
}
