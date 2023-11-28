import { ApiProperty } from '@nestjs/swagger'

export class AddImageReq {
    @ApiProperty()
    productId: string

    @ApiProperty({
        type: 'array',
        items: {
            type: 'string',
            format: 'binary',
            description: 'Image file',
        },
    })
    images: Express.Multer.File[]
}
