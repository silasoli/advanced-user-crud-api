import { UserM, UserWithoutPassword } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/userRepository.interface';

export class IsAuthenticatedUseCases {
  constructor(private readonly adminUserRepo: UserRepository) {}

  async execute(id: number): Promise<UserWithoutPassword> {
    const user: UserM = await this.adminUserRepo.findOneById(id);
    const { ...info } = user;
    return info;
  }
}
