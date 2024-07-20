import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  IBcryptService,
  IHashPassword,
} from '../../../domain/adapters/bcrypt.interface';

@Injectable()
export class BcryptService implements IBcryptService {
  rounds: number = 10;

  async hash(hashString: string): Promise<string> {
    return bcrypt.hash(hashString, this.rounds);
  }

  async compare(password: string, hashPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashPassword);
  }

  async hashPassword(password: string): Promise<IHashPassword> {
    const salt = await bcrypt.genSalt(this.rounds);
    const combined = salt + '123' + password;
    const hash = await this.hash(combined);
    return { salt, hash };
  }

  async comparePassword(
    storedHash: string,
    storedSalt: string,
    providedPassword: string,
  ): Promise<boolean> {
    const combined = storedSalt + '123' + providedPassword;
    return this.compare(combined, storedHash);
  }
}
