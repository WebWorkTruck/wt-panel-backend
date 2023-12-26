import { ApiProperty } from '@nestjs/swagger'

export class ReqAddToZakazNaryad {
    @ApiProperty()
    orderId: string
    @ApiProperty()
    productId: string
}
