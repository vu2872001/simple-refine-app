import {
  Req,
  Get,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { LoginDTO } from '../dtos/login.dto';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { RegisterDTO } from '../dtos/register.dto';
import { AuthService } from '../services/auth.service';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';
import { UserService } from '../../user/services/user.service';
// import { PermissionGuard } from './../guards/permission.guard';
// import Permission from 'src/common/constants/permission.constant';
import { JwtAuthenticationGuard } from '../guards/jwt-authentication.guard';
import { LocalAuthenticationGuard } from '../guards/localAuthentication.guard';
import { RequestWithUser } from '../../../common/interface/requestWithUser.interface';

@Controller('auth')
@ApiTags('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('/register')
  async register(@Body() registrationData: RegisterDTO) {
    return this.authService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('/login')
  @ApiBody({ type: LoginDTO })
  async logIn(@Req() request: RequestWithUser) {
    const { user } = request;
    const accessTokenCookie =
      await this.authService.getCookieWithJwtAccessToken(user.id);
    const { cookie: refreshTokenCookie, token: refreshToken } =
      await this.authService.getCookieWithJwtRefreshToken(user.id);
    await this.userService.setCurrentRefreshToken(refreshToken, user.id);
    await request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);
    return {
      access: accessTokenCookie.split(';')[0].split('=')[1],
      refresh: refreshToken,
    };
  }

  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Post('logout')
  async logOut(@Req() request: RequestWithUser) {
    await this.userService.removeRefreshToken(request.user.id);
    request.res.setHeader('Set-Cookie', this.authService.getCookieForLogout());
  }

  @UseGuards(JwtRefreshGuard)
  // @UseGuards(PermissionGuard(Permission.RefreshToken))
  @Get('refresh')
  async refresh(@Req() request: RequestWithUser) {
    const accessTokenCookie =
      await this.authService.getCookieWithJwtAccessToken(request.user.id);
    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return request.user;
  }
}
