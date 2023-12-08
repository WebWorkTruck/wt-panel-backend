import { ApiProperty } from '@nestjs/swagger'

export class ResCountriesDto {
    @ApiProperty()
    id: string
    @ApiProperty()
    name: string
}
export class ReqRegionsByCountryDto {
    @ApiProperty()
    id: string
}
export class ReqCitiesByRegionDto {
    @ApiProperty()
    id: string
}
