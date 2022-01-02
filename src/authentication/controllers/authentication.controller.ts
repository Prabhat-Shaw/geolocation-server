import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/user/dtos';
import { UserEntity } from 'src/user/entities';
import { Authorization } from '../decorators';
import { LoginDto, RegistrationDto } from '../dtos';
import { LocalAuthenticationGuard } from '../guards';
import { RequestWithUser } from '../interfaces';
import { AuthenticationService } from '../services';

@Controller('Authentication')
@ApiTags('Authentication')
export class AuthenticationController {
  constructor(private readonly _authenticationService: AuthenticationService) {}

  @Post('registration')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserDto, description: 'Successfully registered' })
  async registration(
    @Body() registrationDto: RegistrationDto,
  ): Promise<UserEntity> {
    return this._authenticationService.registration(registrationDto);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  @ApiOkResponse({ type: UserDto, description: 'Successfully logged' })
  @ApiBody({ type: LoginDto })
  async login(@Req() request: RequestWithUser): Promise<UserEntity> {
    const accessTokenCookie = this._authenticationService.getCookieWithJwtToken(
      request.user.uuid,
    );

    request.res.setHeader('Set-Cookie', accessTokenCookie);

    return request.user;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Get('logout')
  @Authorization()
  logout(@Req() request: RequestWithUser): void {
    request.res.setHeader(
      'Set-Cookie',
      this._authenticationService.getCookiesForLogout(),
    );
  }
}
