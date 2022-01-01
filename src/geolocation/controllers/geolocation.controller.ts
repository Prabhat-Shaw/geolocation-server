import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Authorization } from 'src/authentication/decorators';
import { RequestWithUser } from 'src/authentication/interfaces';
import { ApiPaginatedResponse } from 'src/common/decorators';
import { PageDto, PageOptionsDto } from 'src/common/dtos';
import {
  CreateGeolocationDto,
  GeolocationDto,
  RemoveGeolocationDto,
} from '../dtos';
import { GeolocationEntity } from '../entities';
import { GeolocationService } from '../services';

@Controller('Geolocation')
@ApiTags('Geolocation')
export class GeolocationController {
  constructor(private readonly _geolocationService: GeolocationService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Authorization()
  @ApiPaginatedResponse(GeolocationDto)
  async getGeolocations(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<GeolocationEntity>> {
    return this._geolocationService.getGeolocations(pageOptionsDto);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @Authorization()
  @ApiOkResponse({
    type: GeolocationDto,
    description: 'Successfully created geolocation data',
  })
  async createGeolocation(
    @Req() { user }: RequestWithUser,
    @Body() createGeolocationDto: CreateGeolocationDto,
  ): Promise<GeolocationEntity> {
    return this._geolocationService.createGeolocation(
      createGeolocationDto,
      user,
    );
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.OK)
  @Authorization()
  @ApiOkResponse({
    type: GeolocationDto,
    description: 'Successfully removed geolocation data',
  })
  async removeGeolocations(
    @Req() { user }: RequestWithUser,
    @Param() removeGeolocationDto: RemoveGeolocationDto,
  ): Promise<GeolocationEntity> {
    return this._geolocationService.removeGeolocations(
      removeGeolocationDto,
      user,
    );
  }
}
