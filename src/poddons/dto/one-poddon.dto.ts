import { ApiProperty } from '@nestjs/swagger'

class PoddonData {
    @ApiProperty()
    name: string
    @ApiProperty()
    article: string
    @ApiProperty()
    cost: string
    @ApiProperty()
    comment: string
    @ApiProperty()
    place: string
    @ApiProperty()
    sklad: string
    @ApiProperty()
    pk: string
    @ApiProperty()
    indcode: string
    @ApiProperty()
    poddon: string

    @ApiProperty()
    photos: [string]
}

class PoddonInfo {
    @ApiProperty()
    ids: string[]
    @ApiProperty()
    pages: number

    @ApiProperty()
    count: number
}

export class ResPoddonDto {
    @ApiProperty({ type: PoddonInfo })
    info: PoddonInfo

    @ApiProperty({ type: [PoddonData] })
    data: PoddonData[]
}
export class ReqPoddonDto {
    @ApiProperty()
    id: string

    @ApiProperty()
    page: string

    @ApiProperty()
    count: string
}
