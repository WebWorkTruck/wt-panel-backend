import { ApiProperty } from '@nestjs/swagger'

class Application {
    @ApiProperty()
    id: string

    @ApiProperty()
    date: number
}

class ApplicationDto {
    @ApiProperty()
    name: string

    @ApiProperty()
    position: string

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

class ApplicationInfo {
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
    porter: string

    @ApiProperty()
    numCheck: string
}

export class ApplicationResponseDto {
    @ApiProperty({ type: ApplicationInfo })
    info: ApplicationInfo

    @ApiProperty({ type: [ApplicationDto] })
    data: ApplicationDto[]
}
