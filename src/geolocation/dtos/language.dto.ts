import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dtos';

export class LanguageDto extends AbstractDto {
  @ApiProperty()
  readonly code: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly native: string;
}
