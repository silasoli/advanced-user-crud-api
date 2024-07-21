import {
  IBcryptService,
  IHashPassword,
} from '../../domain/adapters/bcrypt.interface';
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

  private async getSaltAndHashedPassword(
    password: string,
  ): Promise<IHashPassword> {
    return this.bcryptService.hashPassword(password);
  }

  async execute(dto: CreateUserDto): Promise<UserResponseDto> {
    this.logger.log('Create User UseCases execute', `DTO: ${dto}`);

    const { hash, salt } = await this.getSaltAndHashedPassword(dto.password);

    const created = await this.userRepository.create({
      ...dto,
      password: hash,
      salt,
    });

    return new UserResponseDto(created);
  }
}
