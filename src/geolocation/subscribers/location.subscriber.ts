import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
} from 'typeorm';
import { LocationEntity } from '../entities';
import { LanguageService } from '../services';

@EventSubscriber()
export class LocationSubscriber
  implements EntitySubscriberInterface<LocationEntity>
{
  constructor(
    public readonly connection: Connection,
    private readonly _languageService: LanguageService,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return LocationEntity;
  }

  async afterLoad(location: LocationEntity): Promise<void> {
    location.languages = await this._languageService.getLanguages({ location });
  }
}
