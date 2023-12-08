import { HttpService } from '@nestjs/axios'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class TransportCompanyService {
    constructor(private readonly httpService: HttpService) {}
    private ONE_C_URL = process.env.URL_ONE_C

    async getAllTransportCompanies() {
        const transportCompaniesUrl = `get-tk`

        try {
            const response = await firstValueFrom(
                this.httpService.get(
                    `${this.ONE_C_URL}/${transportCompaniesUrl}`
                )
            )
            return response.data
        } catch (error) {
            console.log(error)

            console.log(
                `🆘🆘🆘 Ошибка при получении транспортных компаний - ${error.response?.data}`
            )
            throw new UnauthorizedException(
                error.response?.data?.text ||
                    'Технические проблемы, попробуйте позже'
            )
        }
    }
}
