import { User } from '../entities/user.model';

export class UserReturn {
  readonly id: number;
  readonly age: number;
  readonly role: string;
  readonly name: string;
  readonly email: string;
  readonly username: string;

  constructor(user: User) {
    this.id = user.id;
    this.age = user.age;
    this.role = user.role.role;
    this.name = user.name;
    this.email = user.email;
    this.username = user.username;
  }
}
