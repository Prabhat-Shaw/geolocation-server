import { NotFoundException } from '@nestjs/common';

export class GeolocationNotSpecifiedException extends NotFoundException {
  constructor(error?: string) {
    super('Geolocation not specified for this user', error);
  }
}
