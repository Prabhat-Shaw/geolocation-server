import { GeolocationEntity } from 'src/geolocation/entities';
import { UserEntity } from 'src/user/entities';

export const mockedUser: UserEntity = {
  id: 1,
  uuid: 'd3fc9322-fc38-4bd8-868b-33ccf67c3ddd',
  createdAt: new Date(),
  updatedAt: new Date(),
  geolocations: [new GeolocationEntity()],
  authentication: {
    id: 1,
    uuid: 'd3fc9325-fc38-4bd8-868b-33ccf67c3ddd',
    email_address: 'kontakt.adrian71@gmail.com',
    password: 'hash',
    createdAt: new Date(),
    updatedAt: new Date(),
    user: new UserEntity(),
  },
};
