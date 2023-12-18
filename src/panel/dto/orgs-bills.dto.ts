import { ApiProperty } from '@nestjs/swagger'

export class Org {
    @ApiProperty()
    id: string
    @ApiProperty()
    name: string
}

export class Bill {
    @ApiProperty()
    id: string

    @ApiProperty()
    name: string
}

export class OrgsBills {
    @ApiProperty({ type: [Org] })
    orgs: Org[]

    @ApiProperty({ type: [Bill] })
    bills: Bill[]
}
