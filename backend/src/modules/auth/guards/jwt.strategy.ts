import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/services/user.service';
import { TokenPayload } from '../interfaces/tokenPayload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      // jwtFromRequest: ExtractJwt.fromExtractors([
      //   (request: Request) => {
      //     return request?.cookies?.Authentication;
      //   },
      // ]),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: TokenPayload) {
    try {
      if (!payload.user.id) {
        throw new UnauthorizedException(`You mush log in to system`);
      }
      const user = await this.userService.getDataById(Number(payload.user.id));
      const newUser = await this.userService.getUserByEmail(user.email);
      return newUser;
    } catch (error) {
      throw new UnauthorizedException(`You mush log in to system`);
    }
  }
}
