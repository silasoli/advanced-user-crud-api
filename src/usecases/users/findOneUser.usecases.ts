import { ILogger } from '../../domain/logger/logger.interface';
import { UserM } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/userRepository.interface';

export class FindOneUserUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: number): Promise<UserM> {
    this.logger.log('Find One User UseCases execute', `ID: ${id}`);

    return this.userRepository.findOneById(id);
  }
}
