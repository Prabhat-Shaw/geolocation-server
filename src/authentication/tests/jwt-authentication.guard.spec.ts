import { JwtAuthenticationGuard } from '../guards/jwt-authentication.guard';

describe('JwtAuthenticationGuard', () => {
  let guard: JwtAuthenticationGuard;

  beforeEach(() => {
    guard = new JwtAuthenticationGuard();
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
