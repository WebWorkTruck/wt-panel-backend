import { ApiProperty } from '@nestjs/swagger'

export class AvatarDto {
    @ApiProperty()
    avatar: string
}
