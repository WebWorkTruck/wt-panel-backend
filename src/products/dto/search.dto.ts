import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'

export class QueryRequestDto {
    @ApiProperty({ required: false })
    @IsOptional()
    q?: string

    @ApiProperty({ required: false })
    @IsOptional()
    addPart?: string

    @ApiProperty()
    page: string
    @ApiProperty()
    count: string

    @ApiProperty({ required: false })
    @IsOptional()
    pk?: number
}
export class IssueProductInSaleReq {
    @ApiProperty()
    id: string
    @ApiProperty()
    pose: number
}
export class ChangeProductInAppSale {
    @ApiProperty()
    id: string
    @ApiProperty()
    type: string
    @ApiProperty()
    indCode: string
    @ApiProperty()
    pose: number
}
