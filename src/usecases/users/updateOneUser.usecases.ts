import { IBcryptService } from '../../domain/adapters/bcrypt.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { UserM } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/userRepository.interface';
import { UpdateUserDto } from '../../shared/user/dtos/update-user.dto';

export class UpdateOneUserUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,
  ) {}

  public async transformBody(dto: UpdateUserDto) {
    if (dto.password)
      dto.password = await this.bcryptService.hash(dto.password);
  }

  async execute(id: number, dto: UpdateUserDto): Promise<UserM> {
    this.logger.log('Update User UseCases execute', `ID: ${id}, DTO: ${dto}`);

    await this.transformBody(dto);

    await this.userRepository.updateById(id, {
      ...dto,
    });

    return this.userRepository.findOneById(id);
  }
}
