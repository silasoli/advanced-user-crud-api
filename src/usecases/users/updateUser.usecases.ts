import { IBcryptService } from '../../domain/adapters/bcrypt.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { UserM } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/userRepository.interface';

export class UpdateUserUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,
  ) {}

  public async transformBody(dto: UserM) {
    if (dto.password)
      dto.password = await this.bcryptService.hash(dto.password);
  }

  async execute(id: number, dto: UserM): Promise<UserM> {
    this.logger.log('Update User UseCases execute', `ID: ${id}, DTO: ${dto}`);

    await this.transformBody(dto);

    await this.userRepository.updateById(id, {
      ...dto,
      active: true,
    });

    return this.userRepository.findOneById(id);
  }
}
