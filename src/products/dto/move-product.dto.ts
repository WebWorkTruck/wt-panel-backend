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
