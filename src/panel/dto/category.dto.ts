import { ApiProperty } from '@nestjs/swagger'

export class Category {
    @ApiProperty()
    count: number

    @ApiProperty()
    title: string

    @ApiProperty()
    type: string
}
