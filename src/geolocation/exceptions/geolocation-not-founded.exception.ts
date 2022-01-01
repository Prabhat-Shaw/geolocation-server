import { NotFoundException } from '@nestjs/common';

export class GeolocationNotFoundedException extends NotFoundException {
  constructor(error?: string) {
    super('Geolocation not founed', error);
  }
}
