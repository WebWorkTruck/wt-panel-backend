import { Module } from '@nestjs/common'
import { CartService } from './cart.service'
import { CartController } from './cart.controller'
import { HttpModule } from '@nestjs/axios'

@Module({
    imports: [HttpModule],

    controllers: [CartController],
    providers: [CartService],
})
export class CartModule {}
