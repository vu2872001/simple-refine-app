import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { LoginDTO } from '../dtos/login.dto';
import { RegisterDTO } from '../dtos/register.dto';
import { UserService } from '../../user/services/user.service';
import { TokenPayload } from '../interfaces/tokenPayload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async register(registrationData: RegisterDTO) {
    try {
      const userExist = await this.userService.getUserByEmail(
        registrationData.email,
      );
      if (userExist) {
        throw new UnauthorizedException(
          `Email: ${registrationData.email} exists. Try with another email`,
        );
      }
      const hashedPassword = await bcrypt.hash(registrationData.password, 10);
      const user = await this.userService.create({
        ...registrationData,
        password: hashedPassword,
      });
      return user;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async getAuthenticatedUser(loginData: LoginDTO) {
    try {
      const userExist = await this.userService.getUserByEmail(loginData.email);
      if (userExist.isActivate === false) {
        throw new UnauthorizedException(
          `This account has been disabled by administrator. Please contact for more information.`,
        );
      }
      await this.verifyPassword(loginData.password, userExist.password);

      return userExist;
    } catch (error) {
      throw new UnauthorizedException(error.response);
    }
  }

  async getMyInfomation(id: number) {
    return this.userService.getDataById(id);
  }

  public async getCookieWithJwtAccessToken(userId: number) {
    const user = await this.userService.getDataById(userId);
    const payload: TokenPayload = { user };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
    )}`;
  }

  public async getCookieWithJwtRefreshToken(userId: number) {
    const user = await this.userService.getDataById(userId);
    const payload: TokenPayload = { user };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
    )}`;
    return {
      cookie: cookie,
      token: token,
    };
  }

  public getCookieForLogout() {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }

  private async verifyPassword(password: string, hashedPassword: string) {
    const isMatchingPassword = await bcrypt.compare(password, hashedPassword);
    if (!isMatchingPassword) {
      throw new UnauthorizedException('Wrong password');
    }
  }
}
