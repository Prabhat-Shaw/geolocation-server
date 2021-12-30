import { ApiProperty } from '@nestjs/swagger';
import { AuthenticationDto } from 'src/authentication/dtos';
import { AbstractDto } from 'src/common/dtos';

export class UserDto extends AbstractDto {
  @ApiProperty({ type: () => AuthenticationDto })
  readonly authentication: AuthenticationDto;
}
