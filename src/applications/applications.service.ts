import { HttpService } from '@nestjs/axios'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { ApplicationResponseDto } from './dto/application.dto'

@Injectable()
export class ApplicationsService {
    constructor(private readonly httpService: HttpService) {}

    private ONE_C_URL = 'http://192.168.0.223/test/hs/wt_panel'

    async getApplication(id: string): Promise<any> {
        const url = `${this.ONE_C_URL}/get-application/${id}`
        try {
            const response = await firstValueFrom(this.httpService.get(url))
            const application: ApplicationResponseDto = response.data
            return application
        } catch (error) {
            throw new UnauthorizedException(error.response?.data?.text)
        }
    }
}
