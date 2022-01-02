export const mockedConfigService = {
  get(key: string) {
    switch (key) {
      case 'IPSTACK_ACCESS_KEY':
        return '9000';
      case 'POSTGRES_HOST':
        return 'localhost';
      case 'POSTGRES_PORT':
        return '5432';
      case 'POSTGRES_USERNAME':
        return 'pietrzakadrian';
      case 'POSTGRES_PASSWORD':
        return '';
      case 'POSTGRES_DB_NAME':
        return 'nestjs-sofomo2';
      case 'JWT_SECRET':
        return '99976dsldsald21';
      case 'JWT_EXPIRATION_TIME':
        return '3600';
    }
  },
};
