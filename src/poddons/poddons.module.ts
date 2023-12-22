import { Module } from '@nestjs/common'
import { PoddonsService } from './poddons.service'
import { PoddonsController } from './poddons.controller'
import { HttpModule } from '@nestjs/axios'

@Module({
    imports: [HttpModule],

    controllers: [PoddonsController],
    providers: [PoddonsService],
})
export class PoddonsModule {}
