import { ApiProperty } from '@nestjs/swagger';
import { LanguageDto } from './language.dto';

export class LocationDto {
  @ApiProperty()
  readonly geoname_id: number;

  @ApiProperty()
  readonly capital: string;

  @ApiProperty({ isArray: true, type: () => LanguageDto })
  readonly languages: LanguageDto[];

  @ApiProperty()
  readonly country_flag: string;

  @ApiProperty()
  readonly country_flag_emoji: string;

  @ApiProperty()
  readonly country_flag_emoji_unicode: string;

  @ApiProperty()
  readonly calling_code: string;

  @ApiProperty()
  readonly is_eu: boolean;
}
