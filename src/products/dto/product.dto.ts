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

    @ApiProperty()
    poddon: string

    @ApiProperty()
    pk: boolean

    @ApiProperty()
    place: boolean
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

export class ProductsTypesResponse {
    @ApiProperty()
    id: number

    @ApiProperty()
    count: number

    @ApiProperty()
    title: string
}
