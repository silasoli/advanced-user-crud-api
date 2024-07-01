export class UserWithoutPassword {
  id: number;
  name: string;
  email: string;
  salt: string;
  access_token?: string;
  refresh_token?: string;
  role?: string;
  expires_at?: Date;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

export class UserM extends UserWithoutPassword {
  password: string;
}
