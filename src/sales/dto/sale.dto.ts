import { ApiProperty } from '@nestjs/swagger'

class Application {
    @ApiProperty()
    id: string

    @ApiProperty()
    date: number
}

class SaleDto {
    @ApiProperty()
    name: string

    @ApiProperty()
    position: number

    @ApiProperty()
    cost: string

    @ApiProperty()
    count: string

    @ApiProperty()
    sum: string

    @ApiProperty()
    issued: string

    @ApiProperty()
    code: string

    @ApiProperty()
    id: string

    @ApiProperty()
    place: string

    @ApiProperty()
    photos: string[]

    @ApiProperty()
    state: string

    @ApiProperty()
    article: string

    @ApiProperty()
    availability_in_k_warehouse: number
}

class SaleInfo {
    @ApiProperty()
    id: string

    @ApiProperty()
    date: number

    @ApiProperty()
    client: number

    @ApiProperty()
    application: Application

    @ApiProperty()
    processing: string

    @ApiProperty()
    status: string

    @ApiProperty()
    store_keeper: string

    @ApiProperty()
    responsible: string

    @ApiProperty()
    sum: string

    @ApiProperty()
    sub_processing: string

    @ApiProperty()
    recorded_track_number: boolean
}

export class SaleResponseDto {
    @ApiProperty({ type: SaleInfo })
    info: SaleInfo

    @ApiProperty({ type: [SaleDto] })
    data: SaleDto[]
}
export class SaleAddTrackNumberReq {
    @ApiProperty()
    saleId: string

    @ApiProperty()
    trackNumber: string
}
