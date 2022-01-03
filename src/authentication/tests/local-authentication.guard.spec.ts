import { LocalAuthenticationGuard } from '../guards/local-authentication.guard';

describe('LocalAuthenticationGuard', () => {
  let guard: LocalAuthenticationGuard;

  beforeEach(() => {
    guard = new LocalAuthenticationGuard();
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
