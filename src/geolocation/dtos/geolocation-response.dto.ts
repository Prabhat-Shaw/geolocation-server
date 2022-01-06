import { IntersectionType, PartialType } from '@nestjs/swagger';
import { ErrorResponseDto, GeolocationDto } from '.';

export class GeolocationResponseDto extends PartialType(
  IntersectionType(GeolocationDto, ErrorResponseDto),
) {}
