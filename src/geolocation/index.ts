import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  GeolocationRepository,
  LanguageRepository,
  LocationLanguageRepository,
  LocationRepository,
} from './repositories';

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
  providers: [],
  exports: [],
  controllers: [],
})
export class GeolocationModule {}
