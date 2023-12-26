import { ApiProperty } from '@nestjs/swagger'

export class ReqFindCartUserDto {
    @ApiProperty()
    id: string
    @ApiProperty()
    page: string
    @ApiProperty()
    count: string
}

class CartData {
    @ApiProperty()
    name: string
    @ApiProperty()
    article: string
    @ApiProperty()
    cost: string
    @ApiProperty()
    comment: string
    @ApiProperty()
    place: string
    @ApiProperty()
    sklad: string
    @ApiProperty()
    pk: string
    @ApiProperty()
    indcode: string
    @ApiProperty()
    poddon: string

    @ApiProperty()
    photos: [string]
}

class CartInfo {
    @ApiProperty()
    ids: string[]
    @ApiProperty()
    pages: number
    @ApiProperty()
    count: number
}

export class ResCartDto {
    @ApiProperty({ type: CartInfo })
    info: CartInfo

    @ApiProperty({ type: [CartData] })
    data: CartData[]
}
