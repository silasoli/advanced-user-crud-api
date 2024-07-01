import { ILogger } from '../../domain/logger/logger.interface';
import { UserRepository } from '../../domain/repositories/userRepository.interface';
import { UserResponseDto } from '../../shared/user/responses/user-response.dto';

export class FindOneUserUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: number): Promise<UserResponseDto> {
    this.logger.log('Find One User UseCases execute', `ID: ${id}`);

    const user = await this.userRepository.findOneById(id);

    return new UserResponseDto(user);
  }
}
