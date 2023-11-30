import { Controller, Get, Query } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { TimeControlService } from './time-control.service'
import { AvatarDto } from './dto/avatar.dto'
import { WorkTimesInfo } from './dto/work.time.dto'

@ApiTags('time-control')
@Controller('time-control')
export class TimeControlController {
    constructor(private readonly timeControlService: TimeControlService) {}

    @Get('avatar-by-user-id')
    @ApiOkResponse({ type: AvatarDto })
    @ApiOperation({ summary: 'Получение фотографии пользователя' })
    async getAvatarByUserId(@Query('userId') userId: string) {
        const UID = await this.timeControlService.getInfoUser(userId)
        if (UID) {
            return this.timeControlService.getAvatarByUserId(UID)
        }
    }

    @Get('work-time')
    @ApiOkResponse({ type: WorkTimesInfo })
    @ApiOperation({ summary: 'Получение информации о рабочем времени' })
    async getUserWorkTime(
        @Query('userId') userId: string,
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string
    ) {
        const UID = await this.timeControlService.getInfoUser(userId)
        if (UID) {
            return this.timeControlService.getTimeWorkUser(
                UID,
                startDate,
                endDate
            )
        }
    }
}
