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
import {
  ApiBody,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserDto } from 'src/user/dtos';
import { UserEntity } from 'src/user/entities';
import { LoginDto, RegistrationDto } from '../dtos';
import { JwtAuthenticationGuard, LocalAuthenticationGuard } from '../guards';
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
  @Post('log-in')
  @ApiOkResponse({ type: UserDto, description: 'Successfully logged' })
  @ApiBody({ type: LoginDto })
  async login(@Req() request: RequestWithUser): Promise<UserEntity> {
    const accessTokenCookie = this._authenticationService.login(request.user);

    request.res.setHeader('Set-Cookie', accessTokenCookie);

    return request.user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Get('log-out')
  @ApiSecurity('Authentication')
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  logout(@Req() request: RequestWithUser): void {
    request.res.setHeader(
      'Set-Cookie',
      this._authenticationService.getCookiesForLogout(),
    );
  }
}
