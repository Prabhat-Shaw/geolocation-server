import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, map, Observable } from 'rxjs';
import { GeolocationDto } from '../dtos';

@Injectable()
export class ClientService {
  private _API_IPSTACK_URL = 'http://api.ipstack.com/';

  constructor(
    private readonly _httpService: HttpService,
    private readonly _configService: ConfigService,
  ) {}

  public async getData(ipAddress: string): Promise<GeolocationDto> {
    return this._handleData(ipAddress);
  }

  private async _handleData(ipAddress: string): Promise<GeolocationDto> {
    const observable = this._fetchData(ipAddress);

    return lastValueFrom(observable);
  }

  private _fetchData(ipAddress: string): Observable<GeolocationDto> {
    const API_URL = `${
      this._API_IPSTACK_URL
    }${ipAddress}?access_key=${this._configService.get('IPSTACK_ACCESS_KEY')}`;

    return this._httpService
      .get(API_URL)
      .pipe(map((response) => response.data));
  }
}
