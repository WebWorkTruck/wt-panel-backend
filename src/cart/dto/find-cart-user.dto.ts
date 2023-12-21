import { ApiProperty } from '@nestjs/swagger'

export class ReqFindCartUserDto {
    @ApiProperty()
    id: string
    @ApiProperty()
    name: string
}
