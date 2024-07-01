import { DynamicModule, Module } from '@nestjs/common';
import { IsAuthenticatedUseCases } from '../../usecases/auth/isAuthenticated.usecases';
import { LoginUseCases } from '../../usecases/auth/login.usecases';
import { LogoutUseCases } from '../../usecases/auth/logout.usecases';

import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';

import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { BcryptService } from '../services/bcrypt/bcrypt.service';
import { JwtModule } from '../services/jwt/jwt.module';
import { JwtTokenService } from '../services/jwt/jwt.service';
import { RepositoriesModule } from '../repositories/repositories.module';

import { DatabaseUserRepository } from '../repositories/user.repository';

import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { UseCaseProxy } from './usecases-proxy';
import { CreateUserUseCases } from '../../usecases/users/createUser.usecases';
import { FindUserUseCases } from '../../usecases/users/findUser.usecases';
import { FindOneUserUseCases } from '../../usecases/users/findOneUser.usecases';
import { UpdateOneUserUseCases } from '../../usecases/users/updateOneUser.usecases';
import { DeleteOneUserUseCases } from '../../usecases/users/deleteOneUser.usecases';

@Module({
  imports: [
    LoggerModule,
    JwtModule,
    BcryptModule,
    EnvironmentConfigModule,
    RepositoriesModule,
    ExceptionsModule,
  ],
})
export class UsecasesProxyModule {
  // Auth
  static LOGIN_USECASES_PROXY = 'LoginUseCasesProxy';
  static IS_AUTHENTICATED_USECASES_PROXY = 'IsAuthenticatedUseCasesProxy';
  static LOGOUT_USECASES_PROXY = 'LogoutUseCasesProxy';

  // User
  static CREATE_USER_USECASES_PROXY = 'CreateUserUseCasesProxy';
  static FIND_USER_USECASES_PROXY = 'FindUserUseCasesProxy';
  static FIND_ONE_USER_USECASES_PROXY = 'FindOneUserUseCasesProxy';
  static UPDATE_ONE_USER_USECASES_PROXY = 'UpdateOneUserUseCasesProxy';
  static DELETE_ONE_USER_USECASES_PROXY = 'DeleteOneUserUseCasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [
            LoggerService,
            JwtTokenService,
            EnvironmentConfigService,
            DatabaseUserRepository,
            BcryptService,
          ],
          provide: UsecasesProxyModule.LOGIN_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            jwtTokenService: JwtTokenService,
            config: EnvironmentConfigService,
            userRepo: DatabaseUserRepository,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new LoginUseCases(
                logger,
                jwtTokenService,
                config,
                userRepo,
                bcryptService,
              ),
            ),
        },
        {
          inject: [DatabaseUserRepository],
          provide: UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
          useFactory: (userRepo: DatabaseUserRepository) =>
            new UseCaseProxy(new IsAuthenticatedUseCases(userRepo)),
        },
        {
          inject: [],
          provide: UsecasesProxyModule.LOGOUT_USECASES_PROXY,
          useFactory: () => new UseCaseProxy(new LogoutUseCases()),
        },
        //USER
        {
          inject: [LoggerService, DatabaseUserRepository, BcryptService],
          provide: UsecasesProxyModule.CREATE_USER_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepo: DatabaseUserRepository,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new CreateUserUseCases(logger, userRepo, bcryptService),
            ),
        },
        {
          inject: [LoggerService, DatabaseUserRepository],
          provide: UsecasesProxyModule.FIND_USER_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepo: DatabaseUserRepository,
          ) => new UseCaseProxy(new FindUserUseCases(logger, userRepo)),
        },
        {
          inject: [LoggerService, DatabaseUserRepository],
          provide: UsecasesProxyModule.FIND_ONE_USER_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepo: DatabaseUserRepository,
          ) => new UseCaseProxy(new FindOneUserUseCases(logger, userRepo)),
        },
        {
          inject: [LoggerService, DatabaseUserRepository, BcryptService],
          provide: UsecasesProxyModule.UPDATE_ONE_USER_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepo: DatabaseUserRepository,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new UpdateOneUserUseCases(logger, userRepo, bcryptService),
            ),
        },
        {
          inject: [LoggerService, DatabaseUserRepository],
          provide: UsecasesProxyModule.DELETE_ONE_USER_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepo: DatabaseUserRepository,
          ) => new UseCaseProxy(new DeleteOneUserUseCases(logger, userRepo)),
        },
      ],
      exports: [
        UsecasesProxyModule.LOGIN_USECASES_PROXY,
        UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
        UsecasesProxyModule.LOGOUT_USECASES_PROXY,
        //USER
        UsecasesProxyModule.CREATE_USER_USECASES_PROXY,
        UsecasesProxyModule.FIND_USER_USECASES_PROXY,
        UsecasesProxyModule.FIND_ONE_USER_USECASES_PROXY,
        UsecasesProxyModule.UPDATE_ONE_USER_USECASES_PROXY,
        UsecasesProxyModule.DELETE_ONE_USER_USECASES_PROXY,
      ],
    };
  }
}
