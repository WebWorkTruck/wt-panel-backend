import { ApiProperty } from '@nestjs/swagger'

export class SessionInfoDto {
    @ApiProperty()
    id: string

    @ApiProperty()
    name: string

    @ApiProperty()
    company: string

    @ApiProperty()
    post: string

    @ApiProperty()
    birth_date: string

    @ApiProperty()
    personal_phone: string

    @ApiProperty()
    work_phone: string

    @ApiProperty()
    cart: string

    @ApiProperty({ type: () => Role, isArray: true })
    roles: Role[]
}

export class Role {
    @ApiProperty()
    id: string

    @ApiProperty()
    title: string
}
