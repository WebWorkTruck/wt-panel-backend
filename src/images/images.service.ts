import { HttpService } from '@nestjs/axios'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import * as sharp from 'sharp'

@Injectable()
export class ImagesService {
    constructor(private readonly httpService: HttpService) {}

    private IMAGE_SERVICE_URL = process.env.IMAGE_SERVICE_URL

    async compressImage(buffer: Buffer) {
        try {
            const compressedBuffer = await sharp(buffer)
                .resize({ width: 1920, height: 1080 })
                .toBuffer()

            return compressedBuffer
        } catch (error) {
            const currentDate = new Date()
            const formattedDate = `${currentDate.getDate()}.${
                currentDate.getMonth() + 1
            }.${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}`

            console.error(
                `⛔ Ошибка при сжатии фотографии ${formattedDate}:`,
                error
            )

            throw new Error('Failed to compress image')
        }
    }
    async addImages(productId: string, files: Express.Multer.File[]) {
        const url = `${this.IMAGE_SERVICE_URL}/v1/images/${productId}`

        try {
            const formData = new FormData()

            for (const file of files) {
                const compressedBuffer = await this.compressImage(file.buffer)

                const blob = new Blob([compressedBuffer], {
                    type: file.mimetype,
                })

                formData.append(`file${file.size}`, blob)
            }

            const response = await firstValueFrom(
                this.httpService.post(url, formData)
            )
            return response.data
        } catch (error) {
            throw new UnauthorizedException(error.response?.data?.text)
        }
    }

    async deleteImage(productId: string, images: string[]) {
        images.forEach(async image => {
            const url = `${
                this.IMAGE_SERVICE_URL
            }/v1/images/${productId}/${image.split('/').pop()}`
            try {
                const response = await firstValueFrom(
                    this.httpService.delete(url)
                )
                return response.data
            } catch (error) {
                const currentDate = new Date()
                const formattedDate = `${currentDate.getDate()}.${
                    currentDate.getMonth() + 1
                }.${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}`

                console.error(
                    `⛔ Ошибка при удалении фотографий ${formattedDate}:`,
                    error.response.data
                )
                throw new UnauthorizedException(error.response?.data?.text)
            }
        })
    }
}
