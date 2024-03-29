import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dtos';

export class AuthenticationDto extends AbstractDto {
  @ApiProperty()
  readonly email_address: string;
}
