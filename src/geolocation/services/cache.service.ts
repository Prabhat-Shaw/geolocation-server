import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { GET_GEOLOCATION_CACHE_KEY } from '../constants';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly _cacheManager: Cache) {}

  public async clearCache() {
    const keys: string[] = await this._cacheManager.store.keys();

    keys.forEach((key) => {
      if (key.startsWith(GET_GEOLOCATION_CACHE_KEY)) {
        this._cacheManager.del(key);
      }
    });
  }
}
