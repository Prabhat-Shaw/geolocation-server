export const mockedConnection = () => ({
  transaction: jest.fn(),
  createQueryRunner: jest.fn(),
  subscribers: jest.fn(),
});
