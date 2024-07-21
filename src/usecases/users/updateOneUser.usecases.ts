import {
  IBcryptService,
  IHashPassword,
} from '../../domain/adapters/bcrypt.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { UserM } from '../../domain/model/user';
import {
  ICreateUser,
  UserRepository,
} from '../../domain/repositories/userRepository.interface';
import { UpdateUserDto } from '../../shared/user/dtos/update-user.dto';
import { UserResponseDto } from '../../shared/user/responses/user-response.dto';

export class UpdateOneUserUseCases {
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

  async execute(id: number, dto: UpdateUserDto): Promise<UserResponseDto> {
    this.logger.log('Update User UseCases execute', `ID: ${id}, DTO: ${dto}`);

    const raw = { ...dto } as Partial<ICreateUser>;

    if (dto.password) {
      const hashedPassword = await this.getSaltAndHashedPassword(dto.password);
      raw.password = hashedPassword.hash;
      raw.salt = hashedPassword.salt;
    }

    await this.userRepository.updateById(id, {
      ...raw,
    });

    const user = await this.userRepository.findOneById(id);

    return new UserResponseDto(user);
  }
}
