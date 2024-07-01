import { ILogger } from '../../domain/logger/logger.interface';
import { UserRepository } from '../../domain/repositories/userRepository.interface';
import { UserResponseDto } from '../../shared/user/responses/user-response.dto';

export class FindUserUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(): Promise<UserResponseDto[]> {
    this.logger.log('Find User UseCases execute', ``);

    const users = await this.userRepository.find();

    return users.map((user) => new UserResponseDto(user));
  }
}
