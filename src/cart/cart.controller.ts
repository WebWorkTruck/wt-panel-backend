import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { CartService } from './cart.service'

import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { ReqFindCartUserDto, ResCartDto } from './dto/cart.dto'

@ApiTags('cart')
@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Get('get-cart')
    @ApiOkResponse({
        type: ResCartDto,
    })
    getcart(@Query() query: ReqFindCartUserDto) {
        return this.cartService.getCart(query)
    }
}
