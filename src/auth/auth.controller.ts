import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Res,
    UseGuards,
} from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { AuthGuard } from './auth.guard'
import { AuthService } from './auth.service'
import { CookieService } from './cookie.service'
import { SessionInfoDto } from './dto/session.dto'
import { SignInRequestDto } from './dto/sign-in.dto'
import { SessionInfo } from './session-info.decorator'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly cookieService: CookieService
    ) {}

    @Post('sign-in-one-c')
    @ApiOperation({ summary: 'Авторизация при помощи 1C' })
    @ApiOkResponse()
    @HttpCode(HttpStatus.OK)
    async signInOneC(
        @Body() body: SignInRequestDto,
        @Res({ passthrough: true }) res: Response
    ) {
        const { accessToken } = await this.authService.signInOneC(
            body.phone,
            body.password
        )

        this.cookieService.setToken(res, accessToken)
    }

    @Post('sign-out')
    @ApiOkResponse()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Выход из сессии' })
    @UseGuards(AuthGuard)
    signOut(@Res({ passthrough: true }) res: Response) {
        this.cookieService.removeToken(res)
    }

    @Get('session-info')
    @ApiOkResponse({
        type: SessionInfoDto,
    })
    @ApiOperation({ summary: 'Получение информации о сессии' })
    @UseGuards(AuthGuard)
    getSessionInfo(@SessionInfo() session: SessionInfoDto) {
        return session
    }
}
