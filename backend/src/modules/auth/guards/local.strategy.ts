import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { LoginDTO } from '../dtos/login.dto';
import { User } from '../../user/entities/user.entity';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }
  async validate(email: string, password: string): Promise<User> {
    const userData: LoginDTO = {
      email: email,
      password: password,
    };
    const user = await this.authService.getAuthenticatedUser(userData);
    return user;
  }
}
