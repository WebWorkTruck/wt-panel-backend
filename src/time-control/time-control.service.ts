import { HttpService } from '@nestjs/axios'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class TimeControlService {
    constructor(private readonly httpService: HttpService) {}

    private TIME_CONTROL_URL = 'http://192.168.0.190:5053/api'
    private TC_LOGIN = '123'
    private TC_PASS = '123'

    async getImageByUserId(userId: string): Promise<any> {
        const url = 'persons/getfoto?userid='
        const tc = btoa(`${this.TC_LOGIN}:${this.TC_PASS}`)

        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Basic ${tc}`,
        }
        try {
            const response = await firstValueFrom(
                this.httpService.get(
                    `${this.TIME_CONTROL_URL}/${url}${userId}`,
                    {
                        headers,
                    }
                )
            )
            console.log(response.data)

            const image: any = response.data
            return image
        } catch (error) {
            throw new UnauthorizedException(error.response?.data?.text)
        }
    }
}
