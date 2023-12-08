import { ApiProperty } from '@nestjs/swagger'

export class ResTransportCompanyDto {
    @ApiProperty()
    id: string
    @ApiProperty()
    name: string
}
