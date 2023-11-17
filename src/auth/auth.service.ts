import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception'
import { JwtService } from '@nestjs/jwt'
import { firstValueFrom } from 'rxjs'
import { User } from './dto/user.dto'

@Injectable()
export class AuthService {
    constructor(
        private readonly httpService: HttpService,
        private readonly jwtService: JwtService
    ) {}

    private ONE_C_URL_SIGN_IN = 'http://192.168.0.223/test/hs/wt_panel/sign-in'

    async signInOneC(phone: string, password: string): Promise<any> {
        const data = {
            phone,
            password,
        }
        try {
            const response = await firstValueFrom(
                this.httpService.post(this.ONE_C_URL_SIGN_IN, data)
            )

            const user: User = response.data

            const accessToken = await this.jwtService.signAsync({
                id: user.id,
                name: user.name,
                company: user.company,
                post: user.post,
                birth_date: user.birth_date,
                personal_phone: user.personal_phone,
                work_phone: user.work_phone,
                roles: user.roles,
            })

            return { accessToken }
        } catch (error) {
            throw new UnauthorizedException(error.response?.data?.text)
        }
    }
}
