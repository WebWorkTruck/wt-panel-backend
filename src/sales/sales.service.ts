import { HttpService } from '@nestjs/axios'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { SaleResponseDto } from './dto/sale.dto'

@Injectable()
export class SalesService {
    constructor(private readonly httpService: HttpService) {}
    private ONE_C_URL = 'http://192.168.0.223/test/hs/wt_panel'

    async getSale(id: string): Promise<any> {
        const url = `${this.ONE_C_URL}/get-sale/${id}`

        try {
            const response = await firstValueFrom(this.httpService.get(url))
            const sale: SaleResponseDto = response.data
            return sale
        } catch (error) {
            throw new UnauthorizedException(error.response?.data?.text)
        }
    }
}
