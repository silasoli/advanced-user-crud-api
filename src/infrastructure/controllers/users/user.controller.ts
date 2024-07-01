import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { CreateUserUseCases } from '../../../usecases/users/createUser.usecases';
import { CreateUserDto } from '../../../shared/user/dtos/create-user.dto';
import { UserResponseDto } from '../../../shared/user/responses/user-response.dto';
import { FindUserUseCases } from '../../../usecases/users/findUser.usecases';
import { FindOneUserUseCases } from '../../../usecases/users/findOneUser.usecases';
import { IDQueryDTO } from '../../../shared/user/dtos/id-query.dto';
import { UpdateUserDto } from '../../../shared/user/dtos/update-user.dto';
import { UpdateOneUserUseCases } from '../../../usecases/users/updateOneUser.usecases';
import { DeleteOneUserUseCases } from '../../../usecases/users/deleteOneUser.usecases';

@ApiTags('Users')
@Controller('users')
@ApiResponse({
  status: 401,
  description: 'No authorization token was found',
})
@ApiResponse({ status: 500, description: 'Internal error' })
export class UserController {
  constructor(
    @Inject(UsecasesProxyModule.CREATE_USER_USECASES_PROXY)
    private readonly createUserUsecaseProxy: UseCaseProxy<CreateUserUseCases>,
    @Inject(UsecasesProxyModule.FIND_USER_USECASES_PROXY)
    private readonly findUserUseCases: UseCaseProxy<FindUserUseCases>,
    @Inject(UsecasesProxyModule.FIND_ONE_USER_USECASES_PROXY)
    private readonly findOneUserUseCases: UseCaseProxy<FindOneUserUseCases>,
    @Inject(UsecasesProxyModule.UPDATE_ONE_USER_USECASES_PROXY)
    private readonly updateOneUserUseCases: UseCaseProxy<UpdateOneUserUseCases>,
    @Inject(UsecasesProxyModule.DELETE_ONE_USER_USECASES_PROXY)
    private readonly deleteOneUserUseCases: UseCaseProxy<DeleteOneUserUseCases>,

    // @Inject(UsecasesProxyModule.LOGOUT_USECASES_PROXY)
    // private readonly logoutUsecaseProxy: UseCaseProxy<LogoutUseCases>,
    // @Inject(UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY)
    // private readonly isAuthUsecaseProxy: UseCaseProxy<IsAuthenticatedUseCases>,
  ) {}

  @Post()
  @ApiOperation({ description: 'Create User' })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ type: UserResponseDto })
  async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    return this.createUserUsecaseProxy.getInstance().execute(dto);
  }

  @Get()
  @ApiOperation({ description: 'List Users' })
  @ApiOkResponse({ type: [UserResponseDto] })
  async findAll(): Promise<UserResponseDto[]> {
    return this.findUserUseCases.getInstance().execute();
  }

  @Get('/:id([0-9]+)')
  @ApiParam({
    type: () => IDQueryDTO,
    name: '',
  })
  @ApiOperation({ description: 'Find User By ID' })
  @ApiOkResponse({ type: UserResponseDto })
  async findOne(@Param() param: IDQueryDTO): Promise<UserResponseDto> {
    return this.findOneUserUseCases.getInstance().execute(param.id);
  }

  @Patch('/:id([0-9]+)')
  @ApiOperation({ description: 'Update User By ID' })
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({ type: UserResponseDto })
  async updateOne(
    @Param() param: IDQueryDTO,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.updateOneUserUseCases.getInstance().execute(param.id, dto);
  }

  @Delete('/:id([0-9]+)')
  @HttpCode(204)
  @ApiOperation({ description: 'Delete User By ID' })
  async deleteOne(@Param() param: IDQueryDTO): Promise<void> {
    await this.deleteOneUserUseCases.getInstance().execute(param.id);
  }
}
