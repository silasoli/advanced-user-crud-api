import { IBcryptService } from '../../domain/adapters/bcrypt.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { UserM } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/userRepository.interface';

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

  async execute(dto: {
    name: string;
    email: string;
    password: string;
  }): Promise<UserM> {
    this.logger.log('Create User UseCases execute', `DTO: ${dto}`);

    await this.transformBody(dto);

    const created = await this.userRepository.create({ ...dto });

    return created;
  }
}
