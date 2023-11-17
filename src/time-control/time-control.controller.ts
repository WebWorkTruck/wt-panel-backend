import { Controller } from '@nestjs/common'
import { TimeControlService } from './time-control.service'

@Controller('time-control')
export class TimeControlController {
    constructor(private readonly timeControlService: TimeControlService) {}
}
