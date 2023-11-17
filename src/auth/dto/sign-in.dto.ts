import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class SignInRequestDto {
    @ApiProperty({ example: '+79129656125' })
    @IsNotEmpty()
    @IsString()
    phone: string

    @ApiProperty({ example: 'Сергеев121' })
    @IsNotEmpty()
    @IsString()
    password: string
}
