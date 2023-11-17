import { ApiProperty } from '@nestjs/swagger'

export class BadApplication {
    @ApiProperty()
    count: string

    @ApiProperty()
    state: string
}
