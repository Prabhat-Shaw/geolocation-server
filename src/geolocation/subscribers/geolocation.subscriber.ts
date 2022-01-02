import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
} from 'typeorm';
import { GeolocationEntity } from '../entities';
import { CacheService } from '../services';

@EventSubscriber()
export class GeolocationSubscriber
  implements EntitySubscriberInterface<GeolocationEntity>
{
  constructor(
    public readonly connection: Connection,
    private readonly _cacheService: CacheService,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return GeolocationEntity;
  }

  async afterInsert(): Promise<void> {
    await this._cacheService.clearCache();
  }

  async afterRemove(): Promise<void> {
    await this._cacheService.clearCache();
  }
}
