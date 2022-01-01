import { ApiProperty } from '@nestjs/swagger';

export class CreateGeolocationDto {
  @ApiProperty()
  readonly ip_address: string;
}
