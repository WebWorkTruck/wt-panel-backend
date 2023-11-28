import { ApiProperty } from '@nestjs/swagger'

class ResponsibleDto {
    @ApiProperty()
    id: string

    @ApiProperty()
    name: string

    @ApiProperty()
    phone: string
}

class PorterDto {
    @ApiProperty()
    id: string

    @ApiProperty()
    name: string

    @ApiProperty()
    phone: string
}

class DataDto {
    @ApiProperty()
    id: string

    @ApiProperty()
    client: string

    @ApiProperty({ type: ResponsibleDto })
    responsible: ResponsibleDto

    @ApiProperty()
    processing: string

    @ApiProperty()
    sub_processing: string

    @ApiProperty({ type: PorterDto })
    porter: PorterDto

    @ApiProperty()
    flag: number

    @ApiProperty()
    tk: string
}

class InfoDto {
    @ApiProperty()
    pages: number

    @ApiProperty()
    count: number
}

export class ApplicationSaleDto {
    @ApiProperty({ type: InfoDto })
    info: InfoDto

    @ApiProperty({ type: [DataDto] })
    data: DataDto[]
}

export class ReqFailuresDto {
    @ApiProperty()
    page: string

    @ApiProperty()
    count: string
}
export class ReqReturnsDto {
    @ApiProperty()
    page: string

    @ApiProperty()
    count: string
}
export class ReqMissedCalls {
    @ApiProperty()
    page: string

    @ApiProperty()
    count: string
}
export class ReqApplicationSaleDto {
    @ApiProperty()
    title: string

    @ApiProperty()
    type: string

    @ApiProperty()
    page: string

    @ApiProperty()
    count: string

    @ApiProperty()
    text: string
}
export class MoveApplicationSaleDto {
    @ApiProperty()
    id: string

    @ApiProperty()
    processing: string

    @ApiProperty()
    sub_processing: string

    @ApiProperty()
    type: string

    @ApiProperty()
    move_myself: boolean
}
export class CreateSaleDto {
    @ApiProperty()
    id: string

    @ApiProperty()
    org: string

    @ApiProperty()
    bill: string
}
export class ReqRefusalDto {
    @ApiProperty()
    id: string
}
