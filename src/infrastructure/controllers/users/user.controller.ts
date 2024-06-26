import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { LoginUseCases } from '../../../usecases/auth/login.usecases';
import { IsAuthenticatedUseCases } from '../../../usecases/auth/isAuthenticated.usecases';
import { LogoutUseCases } from '../../../usecases/auth/logout.usecases';
import { CreateUserUseCases } from '../../../usecases/users/createUser.usecases';
import { CreateUserDto } from './dtos/create-user.dto';

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
    // @Inject(UsecasesProxyModule.LOGOUT_USECASES_PROXY)
    // private readonly logoutUsecaseProxy: UseCaseProxy<LogoutUseCases>,
    // @Inject(UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY)
    // private readonly isAuthUsecaseProxy: UseCaseProxy<IsAuthenticatedUseCases>,
  ) { }



  @Post()
  // @UseGuards(LoginGuard)
  // @ApiBearerAuth()
  // @ApiBody({ type: AuthLoginDto })
  // @ApiOperation({ description: 'login' })
  async create(@Body() dto: CreateUserDto) {
    return this.createUserUsecaseProxy.getInstance().execute(dto);
  }
}
