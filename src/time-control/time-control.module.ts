import { Module } from '@nestjs/common'
import { TimeControlController } from './time-control.controller'
import { HttpModule } from '@nestjs/axios'
import { TimeControlService } from './time-control.service'

@Module({
    imports: [HttpModule],
    controllers: [TimeControlController],
    providers: [TimeControlService],
})
export class TimeControlModule {}
