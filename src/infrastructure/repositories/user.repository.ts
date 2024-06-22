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
    private readonly repository: Repository<User>,
  ) {}

  async create(data: UserM): Promise<UserM> {
    const user = this.repository.create(data);
    return this.repository.save(user);
  }

  async updateById(id: number, data: Partial<UserM>): Promise<void> {
    await this.repository.update({ id }, { ...data });
  }

  async deleteOneById(id: number): Promise<void> {
    await this.repository.delete({ id });
  }


  async findOneById(id: number): Promise<UserM> {
    const user = await this.repository.findOne({
      where: { id },
    });

    if (!user) return null;

    return user;
  }

  async updateRefreshToken(id: number, refresh_token: string): Promise<void> {
    await this.repository.update({ id }, { refresh_token });
  }
}
