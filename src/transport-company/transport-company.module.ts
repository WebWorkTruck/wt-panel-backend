import { Module } from '@nestjs/common'
import { TransportCompanyService } from './transport-company.service'
import { TransportCompanyController } from './transport-company.controller'
import { HttpModule } from '@nestjs/axios'

@Module({
    imports: [HttpModule],
    controllers: [TransportCompanyController],
    providers: [TransportCompanyService],
})
export class TransportCompanyModule {}
