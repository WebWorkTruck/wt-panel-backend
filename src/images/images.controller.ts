import { FilesInterceptor } from '@nestjs/platform-express'
import {
    Controller,
    Post,
    Delete,
    Query,
    UseInterceptors,
    UploadedFiles,
    Body,
    Get,
} from '@nestjs/common'
import { ImagesService } from './images.service'
import {
    ApiBody,
    ApiConsumes,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger'
import {
    ReqStatisticsOfPhotos,
    ResStatisticsOfPhotos,
} from './dto/statistics-of-photos.dto'

@ApiTags('images')
@Controller('images')
export class ImagesController {
    constructor(private readonly imagesService: ImagesService) {}

    @Post()
    @UseInterceptors(FilesInterceptor('files', 10))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                productId: { type: 'string', format: 'string' },
                userId: { type: 'string', format: 'string' },
                username: { type: 'string', format: 'string' },
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
        return this.imagesService.addImages(
            body.productId,
            body.userId,
            body.username,
            files
        )
    }

    @Delete()
    deletImage(
        @Query('productId') productId: string,
        @Query('image') images: string[]
    ) {
        return this.imagesService.deleteImage(productId, images)
    }

    @Get('statistics-of-photos')
    @ApiOkResponse({
        type: ResStatisticsOfPhotos,
    })
    @ApiOperation({
        summary: 'Получение списка всех транспортных компаний',
    })
    getStatustucsOfPhotos(@Query() query: ReqStatisticsOfPhotos) {
        return this.imagesService.getStatisticOfPhotos(query)
    }
}
