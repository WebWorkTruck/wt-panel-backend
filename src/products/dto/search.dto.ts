import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'

export class QueryRequestDto {
    @ApiProperty({ required: false })
    @IsOptional()
    q?: string

    @ApiProperty()
    page: string
    @ApiProperty()
    count: string
}
export class IssueProductInSaleReq {
    @ApiProperty()
    id: string
    @ApiProperty()
    pose: string[]
}
export class ChangeProductInAppSale {
    @ApiProperty()
    id: string
    @ApiProperty()
    type: string
    @ApiProperty()
    indCode: string
    @ApiProperty()
    pose: string
}
