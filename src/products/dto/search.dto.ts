import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'

export class QueryRequestDto {
    @ApiProperty({ required: false })
    @IsOptional()
    q?: string

    @ApiProperty()
    page: string
    @ApiProperty()
    count: string
}
