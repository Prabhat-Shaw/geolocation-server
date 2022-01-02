import { HttpModule } from '@nestjs/axios';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeolocationController } from './controllers';
import {
  GeolocationRepository,
  LanguageRepository,
  LocationLanguageRepository,
  LocationRepository,
} from './repositories';
import {
  CacheService,
  ClientService,
  GeolocationService,
  LanguageService,
  LocationLanguageService,
  LocationService,
} from './services';
import { GeolocationSubscriber, LocationSubscriber } from './subscribers';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    CacheModule.register(),
    TypeOrmModule.forFeature([
      GeolocationRepository,
      LocationLanguageRepository,
      LanguageRepository,
      LocationRepository,
    ]),
  ],
  providers: [
    ClientService,
    GeolocationService,
    LocationLanguageService,
    LocationService,
    LanguageService,
    CacheService,
    LocationSubscriber,
    GeolocationSubscriber,
  ],
  controllers: [GeolocationController],
})
export class GeolocationModule {}
