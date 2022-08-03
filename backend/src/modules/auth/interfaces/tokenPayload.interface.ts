class TempUser {
  id: number;
  age: number;
  role: string;
  name: string;
  email: string;
  username: string;
}

export interface TokenPayload {
  user: TempUser;
}
