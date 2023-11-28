import { FilesInterceptor } from '@nestjs/platform-express'
import {
    Controller,
    Post,
    Delete,
    Query,
    UseInterceptors,
    UploadedFiles,
    Body,
} from '@nestjs/common'
import { ImagesService } from './images.service'
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'

@ApiTags('images')
@Controller('images')
export class ImagesController {
    constructor(private readonly imagesService: ImagesService) {}

    @Post()
    @UseInterceptors(FilesInterceptor('files', 10)) // '10' - максимальное количество файлов
    @ApiConsumes('multipart/form-data') // Указывает, что запрос использует форму для передачи данных
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                productId: { type: 'string', format: 'string' },
                files: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
        },
    })
    async uploadImages(
        @UploadedFiles() files: Express.Multer.File[],
        @Body() body: any
    ) {
        return this.imagesService.addImages(body.productId, files)
    }

    @Delete()
    deletImage(
        @Query('productId') productId: string,
        @Query('image') images: string[]
    ) {
        return this.imagesService.deleteImage(productId, images)
    }
}
