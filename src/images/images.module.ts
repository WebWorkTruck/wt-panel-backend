import { Module } from '@nestjs/common'
import { ImagesService } from './images.service'
import { HttpModule } from '@nestjs/axios'
import { ImagesController } from './images.controller'

@Module({
    imports: [HttpModule],
    controllers: [ImagesController],
    providers: [ImagesService],
})
export class ImagesModule {}
