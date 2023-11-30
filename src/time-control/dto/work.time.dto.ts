import { ApiProperty } from '@nestjs/swagger'

class WorkTime {
    @ApiProperty()
    day: string

    @ApiProperty({ required: false })
    startTime?: string

    @ApiProperty({ required: false })
    endTime?: string
}

export class WorkTimesInfo {
    @ApiProperty()
    workDaysCount: number

    @ApiProperty()
    totalWorkHours: number

    @ApiProperty({ type: [WorkTime] })
    workTimes: WorkTime[]

    @ApiProperty()
    absencesCount: number

    @ApiProperty()
    lateArrivalsCount: number

    @ApiProperty()
    overtimesCount: number
}
