import { ApiProperty } from '@nestjs/swagger';

export class RemoveGeolocationDto {
  @ApiProperty({ format: 'uuid' })
  readonly uuid: string;
}
