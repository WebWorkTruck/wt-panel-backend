import { Module } from '@nestjs/common'
import { SalesService } from './sales.service'
import { SalesController } from './sales.controller'
import { HttpModule } from '@nestjs/axios'

@Module({
    imports: [HttpModule],
    controllers: [SalesController],
    providers: [SalesService],
})
export class SalesModule {}
