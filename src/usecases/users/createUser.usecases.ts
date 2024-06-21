import { ILogger } from '../../domain/logger/logger.interface';
import { UserM } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/userRepository.interface';

export class createUserUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
  ) {}

  //   async execute(content: string): Promise<UserM> {
  //     const todo = new UserM();
  //     todo.content = content;
  //     todo.isDone = false;
  //     const result = await this.todoRepository.insert(todo);
  //     this.logger.log('addTodoUseCases execute', 'New todo have been inserted');
  //     return result;
  //   }
}
