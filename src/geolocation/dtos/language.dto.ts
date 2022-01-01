import { ApiProperty } from '@nestjs/swagger';

export class LanguageDto {
  @ApiProperty()
  readonly code: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly native: string;
}
