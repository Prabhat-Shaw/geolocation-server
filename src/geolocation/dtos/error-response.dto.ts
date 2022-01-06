import { ApiProperty } from '@nestjs/swagger';

class ErrorDto {
  @ApiProperty()
  readonly code: number;

  @ApiProperty()
  readonly type: string;

  @ApiProperty()
  readonly info: string;
}

export class ErrorResponseDto {
  @ApiProperty()
  readonly success: boolean;

  @ApiProperty({ type: () => ErrorDto })
  readonly error: ErrorDto;
}
