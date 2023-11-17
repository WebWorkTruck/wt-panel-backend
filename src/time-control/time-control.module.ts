import { Module } from '@nestjs/common'
import { TimeControlService } from './time-control.service'
import { TimeControlController } from './time-control.controller'
import { HttpModule } from '@nestjs/axios'

@Module({
    imports: [HttpModule],
    controllers: [TimeControlController],
    providers: [TimeControlService],
})
export class TimeControlModule {}
