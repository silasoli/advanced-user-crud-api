import { IBcryptService } from '../../domain/adapters/bcrypt.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { UserRepository } from '../../domain/repositories/userRepository.interface';
import { CreateUserDto } from '../../shared/user/dtos/create-user.dto';
import { UserResponseDto } from '../../shared/user/responses/user-response.dto';

export class CreateUserUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,
  ) {}

  public async transformBody(dto: { password: string }) {
    if (dto.password)
      dto.password = await this.bcryptService.hash(dto.password);
  }

  async execute(dto: CreateUserDto): Promise<UserResponseDto> {
    this.logger.log('Create User UseCases execute', `DTO: ${dto}`);

    await this.transformBody(dto);

    const created = await this.userRepository.create({ ...dto });

    return new UserResponseDto(created);
  }
}
