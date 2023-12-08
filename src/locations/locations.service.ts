import { Injectable, UnauthorizedException } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import {
    ReqCitiesByRegionDto,
    ReqRegionsByCountryDto,
} from './dto/countries.dto'

@Injectable()
export class LocationsService {
    constructor(private readonly httpService: HttpService) {}
    private ONE_C_URL = process.env.URL_ONE_C

    async getCountries() {
        const countriesUrl = `get-countries`

        try {
            const response = await firstValueFrom(
                this.httpService.get(`${this.ONE_C_URL}/${countriesUrl}`)
            )
            return response.data
        } catch (error) {
            console.log(
                `🆘🆘🆘 Ошибка при получении городов - ${error.response?.data}`
            )
            throw new UnauthorizedException(
                error.response?.data?.text ||
                    'Технические проблемы, попробуйте позже'
            )
        }
    }
    async getRegionsByCountry(query: ReqRegionsByCountryDto) {
        const regionsUrl = `get-region-country/${query.id}`

        try {
            const response = await firstValueFrom(
                this.httpService.get(`${this.ONE_C_URL}/${regionsUrl}`)
            )
            return response.data
        } catch (error) {
            console.log(
                `🆘🆘🆘 Ошибка при получении регионов для города - ${error.response?.data}`
            )
            throw new UnauthorizedException(
                error.response?.data?.text ||
                    'Технические проблемы, попробуйте позже'
            )
        }
    }
    async getCitiesByRegion(query: ReqCitiesByRegionDto) {
        const citiesUrl = `get-city-region/${query.id}`

        try {
            const response = await firstValueFrom(
                this.httpService.get(`${this.ONE_C_URL}/${citiesUrl}`)
            )
            return response.data
        } catch (error) {
            console.log(
                `🆘🆘🆘 Ошибка при получении городов для региона - ${error.response?.data}`
            )
            throw new UnauthorizedException(
                error.response?.data?.text ||
                    'Технические проблемы, попробуйте позже'
            )
        }
    }
}
