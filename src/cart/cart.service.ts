import { HttpService } from '@nestjs/axios'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { ReqFindCartUserDto } from './dto/cart.dto'

@Injectable()
export class CartService {
    constructor(private readonly httpService: HttpService) {}

    private ONE_C_URL = process.env.URL_ONE_C

    async getCart(query: ReqFindCartUserDto) {
        const url = `${this.ONE_C_URL}/list-in-pod/${query.id}/${query.page}/${query.count}`

        try {
            const response = await firstValueFrom(this.httpService.get(url))
            return response.data
        } catch (error) {
            console.log(
                `🆘🆘🆘 Ошибка при получении корзины - ${error.response?.data}`
            )
            throw new UnauthorizedException(
                error.response?.data?.text ||
                    'Технические проблемы, попробуйте позже'
            )
        }
    }
}
