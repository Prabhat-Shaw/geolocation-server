import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dtos';
import { UserDto } from 'src/user/dtos';
import { LocationDto } from './location.dto';

export class GeolocationDto extends AbstractDto {
  @ApiProperty()
  readonly ip: string;

  @ApiProperty()
  readonly type: string;

  @ApiProperty()
  readonly continent_code: string;

  @ApiProperty()
  readonly continent_name: string;

  @ApiProperty()
  readonly country_code: string;

  @ApiProperty()
  readonly country_name: string;

  @ApiProperty()
  readonly region_code: string;

  @ApiProperty()
  readonly region_name: string;

  @ApiProperty()
  readonly city: string;

  @ApiProperty()
  readonly zip: string;

  @ApiProperty()
  readonly latitude: number;

  @ApiProperty()
  readonly longitude: number;

  @ApiProperty({ type: () => LocationDto })
  readonly location: LocationDto;

  @ApiProperty({ type: () => UserDto })
  readonly user: UserDto;
}
