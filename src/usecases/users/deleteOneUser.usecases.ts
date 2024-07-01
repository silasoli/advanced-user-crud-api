import { ILogger } from '../../domain/logger/logger.interface';
import { UserRepository } from '../../domain/repositories/userRepository.interface';

export class DeleteOneUserUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: number): Promise<void> {
    this.logger.log('Delete User UseCases execute', `ID: ${id}`);

    await this.userRepository.deleteOneById(id);
  }
}
