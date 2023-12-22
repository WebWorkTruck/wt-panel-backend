import { ApiProperty } from '@nestjs/swagger'

export class ReqMoveProduct {
    @ApiProperty()
    id: string
    @ApiProperty()
    type: number
    @ApiProperty()
    place: string
}
export class ReqMovePallete {
    @ApiProperty()
    pallet: string
    @ApiProperty()
    place: string
}
export class ReqAssignMainPhoto {
    @ApiProperty()
    productId: string
    @ApiProperty()
    type: string
    @ApiProperty()
    imageUrl: string
}

export class ReqEditProduct {
    @ApiProperty()
    id: string
    @ApiProperty()
    comment: string
    @ApiProperty()
    cost: number
}
export class ReqSendToLost {
    @ApiProperty()
    ids: string[]
}
