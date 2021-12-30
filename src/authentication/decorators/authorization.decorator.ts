import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiSecurity, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthenticationGuard } from '../guards';

export function Authorization() {
  return applyDecorators(
    UseGuards(JwtAuthenticationGuard),
    ApiSecurity('Authentication'),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
