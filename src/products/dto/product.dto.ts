import { ApiProperty } from '@nestjs/swagger'

export class ProductDto {
    @ApiProperty()
    indcode: string

    @ApiProperty()
    name: string

    @ApiProperty()
    cost: string

    @ApiProperty()
    comment: string

    @ApiProperty()
    article: string

    @ApiProperty()
    photos: string[]

    @ApiProperty()
    sklad: string
}

class ProductInfo {
    @ApiProperty()
    pages: number

    @ApiProperty()
    count: number
}

export class ProductsResponse {
    @ApiProperty({ type: ProductInfo })
    info: ProductInfo

    @ApiProperty({ type: [ProductDto] })
    data: ProductDto[]
}
