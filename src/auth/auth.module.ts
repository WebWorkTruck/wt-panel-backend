import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { CookieService } from './cookie.service'

@Module({
    imports: [
        HttpModule,
        JwtModule.register({
            global: true,
            secret: 'secret-key',
            signOptions: { expiresIn: '1d' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, CookieService],
})
export class AuthModule {}
