import { Controller, Get, UseGuards } from '@nestjs/common'
import { CartService } from './cart.service'
import { AuthGuard } from 'src/auth/auth.guard'
import { SessionInfo } from 'src/auth/session-info.decorator'
import { SessionInfoDto } from 'src/auth/dto/session.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('cart')
@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Get()
    @UseGuards(AuthGuard)
    findCartUser(@SessionInfo() session: SessionInfoDto) {
        return session.id
    }
}
