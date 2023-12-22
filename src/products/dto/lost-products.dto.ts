import { ApiProperty } from '@nestjs/swagger'

export class ReqLostProductsDto {
    @ApiProperty()
    page: string
    @ApiProperty()
    count: string
}
