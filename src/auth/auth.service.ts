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

    private ONE_C_URL = process.env.URL_ONE_C

    async signInOneC(phone: string, password: string) {
        const url = `${this.ONE_C_URL}/sign-in`
        const data = {
            phone,
            password,
        }
        try {
            const response = await firstValueFrom(
                this.httpService.post(url, data)
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
            console.log(
                `🆘🆘🆘 Ошибка при авторизации при помощи 1С - ${error.response?.data.errorMessage}`
            )
            throw new UnauthorizedException(
                error.response?.data?.errorMessage ||
                    'Технические проблемы, попробуйте позже'
            )
        }
    }
}
