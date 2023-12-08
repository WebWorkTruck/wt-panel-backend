import { Controller, Get, Query } from '@nestjs/common'
import { LocationsService } from './locations.service'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import {
    ReqCitiesByRegionDto,
    ReqRegionsByCountryDto,
    ResCountriesDto,
} from './dto/countries.dto'

@ApiTags('locations')
@Controller('locations')
export class LocationsController {
    constructor(private readonly locationsService: LocationsService) {}

    @Get('countries')
    @ApiOkResponse({
        type: [ResCountriesDto],
    })
    @ApiOperation({
        summary: 'Получение списка стран',
    })
    getCountries() {
        return this.locationsService.getCountries()
    }
    @Get('region-by-country')
    @ApiOkResponse({
        type: [ResCountriesDto],
    })
    @ApiOperation({
        summary: 'Получение списка регионов для определённой страны',
    })
    getRegionsByCountry(@Query() query: ReqRegionsByCountryDto) {
        return this.locationsService.getRegionsByCountry(query)
    }
    @Get('cities-by-region')
    @ApiOkResponse({
        type: [ResCountriesDto],
    })
    @ApiOperation({
        summary: 'Получение списка городов для определённого региона',
    })
    getCitiesByRegion(@Query() query: ReqCitiesByRegionDto) {
        return this.locationsService.getCitiesByRegion(query)
    }
}
