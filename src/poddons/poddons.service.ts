import { HttpService } from '@nestjs/axios'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { ReqPoddonDto } from './dto/one-poddon.dto'

@Injectable()
export class PoddonsService {
    constructor(private readonly httpService: HttpService) {}

    private ONE_C_URL = process.env.URL_ONE_C

    async getOnePoddon(query: ReqPoddonDto) {
        const url = `${this.ONE_C_URL}/list-in-pod/${query.id}/${query.page}/${query.count}`

        try {
            const response = await firstValueFrom(this.httpService.get(url))
            return response.data
        } catch (error) {
            console.log(
                `🆘🆘🆘 Ошибка при получении одной поддона - ${error.response?.data}`
            )
            throw new UnauthorizedException(
                error.response?.data?.text ||
                    'Технические проблемы, попробуйте позже'
            )
        }
    }
}
