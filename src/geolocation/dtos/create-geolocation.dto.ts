import { ApiProperty } from '@nestjs/swagger';

export class CreateGeolocationDto {
  @ApiProperty()
  readonly ipAddress: string;
}
