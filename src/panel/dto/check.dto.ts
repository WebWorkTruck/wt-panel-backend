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
