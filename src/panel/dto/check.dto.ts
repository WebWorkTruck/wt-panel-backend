import { ApiProperty } from '@nestjs/swagger'

export class ReqGetCheck {
    @ApiProperty()
    id: string
}
export class ReqCreateCheck {
    @ApiProperty()
    id: string
    @ApiProperty()
    org: string
    @ApiProperty()
    bill: string
}

export class InvoiceInfo {
    @ApiProperty()
    num: string

    @ApiProperty()
    date: string

    @ApiProperty({ name: 'innorganization' })
    innOrganization: string

    @ApiProperty({ name: 'kpporganization' })
    kppOrganization: string

    @ApiProperty()
    bank: string

    @ApiProperty({ name: 'bikbank' })
    bikBank: string

    @ApiProperty({ name: 'schetbank' })
    schetBank: string

    @ApiProperty({ name: 'schetorganization' })
    schetOrganization: string

    @ApiProperty()
    organization: string

    @ApiProperty()
    provider: string

    @ApiProperty()
    buyer: string

    @ApiProperty()
    director: string

    @ApiProperty()
    buh: string

    @ApiProperty()
    sum: string

    @ApiProperty({ name: 'withnds' })
    withNds: string

    @ApiProperty({ name: 'allsum' })
    allSum: string
}

export class InvoiceItem {
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
}

export class ResCheck {
    @ApiProperty()
    info: InvoiceInfo

    @ApiProperty({ type: [InvoiceItem] })
    data: InvoiceItem[]
}
