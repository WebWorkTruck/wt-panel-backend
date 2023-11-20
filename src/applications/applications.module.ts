import { Module } from '@nestjs/common'
import { ApplicationsService } from './applications.service'
import { ApplicationsController } from './applications.controller'
import { HttpModule } from '@nestjs/axios'

@Module({
    imports: [HttpModule],
    controllers: [ApplicationsController],
    providers: [ApplicationsService],
})
export class ApplicationsModule {}
