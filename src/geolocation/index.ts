import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
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
  ClientService,
  GeolocationService,
  LanguageService,
  LocationLanguageService,
  LocationService,
} from './services';
import { LocationSubscriber } from './subscribers';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
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
    LocationSubscriber,
  ],
  controllers: [GeolocationController],
})
export class GeolocationModule {}
