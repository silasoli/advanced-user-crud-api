import { IBcryptService } from '../../domain/adapters/bcrypt.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { UserM } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/userRepository.interface';

export class createUserUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,
  ) {}

  public async transformBody(dto: UserM) {
    if (dto.password)
      dto.password = await this.bcryptService.hash(dto.password);
  }

  async execute(dto: UserM): Promise<UserM> {
    // const todo = new UserM();
    // todo.content = content;
    // todo.isDone = false;
    // const result = await this.todoRepository.insert(todo);
    // this.logger.log('addTodoUseCases execute', 'New todo have been inserted');
    // return result;

    await this.transformBody(dto);

    const created = await this.userRepository.create({ ...dto, active: true });

    return created
  }
}
