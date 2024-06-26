import { IBcryptService } from '../../domain/adapters/bcrypt.interface';
import {
  IJwtService,
  IJwtServicePayload,
} from '../../domain/adapters/jwt.interface';
import { JWTConfig } from '../../domain/config/jwt.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { UserRepository } from '../../domain/repositories/userRepository.interface';

export class LoginUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly jwtTokenService: IJwtService,
    private readonly jwtConfig: JWTConfig,
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,
  ) {}

  // async getCookieWithJwtToken(username: string) {
  //   this.logger.log(
  //     'LoginUseCases execute',
  //     `The user ${username} have been logged.`,
  //   );
  //   const payload: IJwtServicePayload = { username: username };
  //   const secret = this.jwtConfig.getJwtSecret();
  //   const expiresIn = this.jwtConfig.getJwtExpirationTime() + 's';
  //   const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
  //   return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtExpirationTime()}`;
  // }

  // async getCookieWithJwtRefreshToken(username: string) {
  //   this.logger.log(
  //     'LoginUseCases execute',
  //     `The user ${username} have been logged.`,
  //   );
  //   const payload: IJwtServicePayload = { username: username };
  //   const secret = this.jwtConfig.getJwtRefreshSecret();
  //   const expiresIn = this.jwtConfig.getJwtRefreshExpirationTime() + 's';
  //   const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
  //   await this.setCurrentRefreshToken(token, username);
  //   const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtRefreshExpirationTime()}`;
  //   return cookie;
  // }

  async validateUserForLocalStragtegy(id: number, pass: string) {
    const user = await this.userRepository.findOneById(id);

    if (!user) return null;

    const match = await this.bcryptService.compare(pass, user.password);

    if (user && match) return { ...user, password: undefined };

    return null;
  }

  async validateUserForJWTStragtegy(id: number) {
    const user = await this.userRepository.findOneById(id);

    if (!user) return null;

    return user;
  }

  async setCurrentRefreshToken(id: number, refreshToken: string) {
    const currentRefreshToken = await this.bcryptService.hash(refreshToken);

    // await this.userRepository.updateRefreshToken(id, currentRefreshToken);
  }

  async getUserIfRefreshTokenMatches(id: number, refreshToken: string) {
    const user = await this.userRepository.findOneById(id);

    if (!user) return null;

    const isRefreshTokenMatching = await this.bcryptService.compare(
      refreshToken,
      user.refresh_token,
    );

    if (isRefreshTokenMatching) return user;

    return null;
  }
}
