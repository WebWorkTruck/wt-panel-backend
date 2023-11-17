import { ApiProperty } from '@nestjs/swagger'

export class Org {
    @ApiProperty()
    id: string
    @ApiProperty()
    name: string
}

export class OrgsInfo {
    @ApiProperty()
    count: number

    @ApiProperty({ type: [Org] })
    data: Org[]
}

export class Bill {
    @ApiProperty()
    id: string

    @ApiProperty()
    name: string
}

export class BillsInfo {
    @ApiProperty()
    count: number

    @ApiProperty({ type: [Bill] })
    data: Bill[]
}

export class OrgsBills {
    @ApiProperty({ type: OrgsInfo })
    orgs: OrgsInfo

    @ApiProperty({ type: BillsInfo })
    bills: BillsInfo
}
