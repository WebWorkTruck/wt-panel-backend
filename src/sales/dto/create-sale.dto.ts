import { ApiProperty } from '@nestjs/swagger'

export class CreateSaleDto {
    @ApiProperty()
    id: string

    @ApiProperty()
    org: string

    @ApiProperty()
    bill: string

    @ApiProperty()
    date: string
}
