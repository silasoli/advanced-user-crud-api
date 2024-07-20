export interface IHashPassword {
  salt: string;
  hash: string;
}

export interface IBcryptService {
  hash(hashString: string): Promise<string>;
  compare(password: string, hashPassword: string): Promise<boolean>;
  hashPassword(hashString: string): Promise<IHashPassword>;
  comparePassword(
    storedHash: string,
    storedSalt: string,
    providedPassword: string,
  ): Promise<boolean>;
}
