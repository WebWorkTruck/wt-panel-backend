import { HttpService } from '@nestjs/axios'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { SaleAddTrackNumberReq, SaleResponseDto } from './dto/sale.dto'
import { CreateSaleDto } from './dto/create-sale.dto'

@Injectable()
export class SalesService {
    constructor(private readonly httpService: HttpService) {}
    private ONE_C_URL = process.env.URL_ONE_C

    async getSale(id: string) {
        const url = `${this.ONE_C_URL}/get-sale/${id}`

        try {
            const response = await firstValueFrom(this.httpService.get(url))
            const sale: SaleResponseDto = response.data
            return sale
        } catch (error) {
            console.log(
                `🆘🆘🆘 Ошибка при получении одной продажи - ${error.response?.data}`
            )
            throw new UnauthorizedException(
                error.response?.data?.text ||
                    'Технические проблемы, попробуйте позже'
            )
        }
    }
    async addTrackNumber(body: SaleAddTrackNumberReq) {
        const url = `${this.ONE_C_URL}/add-track-number/${body.saleId}`

        if (body.trackNumber.includes('[CDK]')) {
            body.trackNumber = body.trackNumber.replace('[CDK]', '')
        } else if (body.trackNumber.length === 24) {
            const tmp_id = body.trackNumber.slice(11, -2)
            const tmp_year = body.trackNumber.slice(-2)
            body.trackNumber = `${tmp_year}-${tmp_id}`
        } else if (body.trackNumber.length === 35) {
            body.trackNumber = body.trackNumber.substring(0, 12)
        }
        try {
            const response = await firstValueFrom(
                this.httpService.post(url, { track_number: body.trackNumber })
            )
            const sale: SaleResponseDto = response.data
            return sale
        } catch (error) {
            console.log(
                `🆘🆘🆘 Ошибка при добавлении трек номер к продаже - ${error.response?.data}`
            )
            throw new UnauthorizedException(
                error.response?.data?.text ||
                    'Технические проблемы, попробуйте позже'
            )
        }
    }
    async createSale(body: CreateSaleDto) {
        const createSaleUrl = 'create-sale'

        try {
            const response = await firstValueFrom(
                this.httpService.post(`${this.ONE_C_URL}/${createSaleUrl}`, {
                    id: body.id,
                    org: body.org,
                    bill: body.bill,
                    date: body.date.replace(/-/g, ''),
                })
            )
            const sale: string = response.data
            return sale
        } catch (error) {
            console.log(
                `🆘🆘🆘 Ошибка при создании продажи - ${error.response?.data}`
            )
            throw new UnauthorizedException(
                error.response?.data?.text ||
                    'Технические проблемы, попробуйте позже'
            )
        }
    }
}
