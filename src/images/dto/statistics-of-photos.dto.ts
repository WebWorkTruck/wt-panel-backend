import { ApiProperty } from '@nestjs/swagger'

export class ReqStatisticsOfPhotos {
    @ApiProperty()
    year: number
    @ApiProperty()
    month: number
}
export class Photographer {
    @ApiProperty()
    tabnum: string
    @ApiProperty()
    name: string
    @ApiProperty()
    count: number
}

export class Day {
    @ApiProperty()
    date: string
    @ApiProperty({ type: [Photographer] })
    photographers: Photographer[]
}
export class ResStatisticsOfPhotos {
    @ApiProperty({ type: [Day] })
    stat: Day
}
