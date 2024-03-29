import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, map, Observable } from 'rxjs';
import { ErrorResponseDto, GeolocationDto } from '../dtos';
import {
  InvalidIpAddressException,
  MonthlyLimitReachedException,
} from '../exceptions';

@Injectable()
export class ClientService {
  private _API_IPSTACK_URL = 'http://api.ipstack.com/';

  constructor(
    private readonly _httpService: HttpService,
    private readonly _configService: ConfigService,
  ) {}

  public async getData(ipAddress: string): Promise<GeolocationDto> {
    const data = await this._handleData(ipAddress);

    if ((data as ErrorResponseDto)?.success === false) {
      switch ((data as ErrorResponseDto)?.error?.code) {
        case 106: {
          throw new InvalidIpAddressException();
        }

        case 104: {
          throw new MonthlyLimitReachedException();
        }

        default: {
          throw new InternalServerErrorException();
        }
      }
    }

    return data as GeolocationDto;
  }

  private async _handleData(
    ipAddress: string,
  ): Promise<GeolocationDto | ErrorResponseDto> {
    const observable = this._fetchData(ipAddress);

    return lastValueFrom(observable);
  }

  private _fetchData(
    ipAddress: string,
  ): Observable<GeolocationDto | ErrorResponseDto> {
    const API_URL = `${
      this._API_IPSTACK_URL
    }${ipAddress}?access_key=${this._configService.get('IPSTACK_ACCESS_KEY')}`;

    return this._httpService
      .get(API_URL)
      .pipe(map((response) => response.data));
  }
}
