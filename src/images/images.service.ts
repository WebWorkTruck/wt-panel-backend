import { HttpService } from '@nestjs/axios'
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import * as sharp from 'sharp'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { ReqStatisticsOfPhotos } from './dto/statistics-of-photos.dto'
@Injectable()
export class ImagesService {
    constructor(
        private readonly httpService: HttpService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
    ) {}

    private IMAGE_SERVICE_URL = process.env.IMAGE_SERVICE_URL

    async compressImage(buffer: Buffer) {
        try {
            // Получите размер исходного буфера в мегабайтах
            const originalSizeMB = (buffer.length / (1024 * 1024)).toFixed(2)

            const compressedBuffer = await sharp(buffer)
                .resize({ width: 1920, height: 1080 })
                .toBuffer()

            // Получите размер сжатого буфера в мегабайтах
            const compressedSizeMB = (
                compressedBuffer.length /
                (1024 * 1024)
            ).toFixed(2)

            // Выведите информацию о размерах в мегабайтах
            console.log(
                `Original Size: ${originalSizeMB} MB, Compressed Size: ${compressedSizeMB} MB`
            )

            return compressedBuffer
        } catch (error) {
            // Обработка ошибки
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

        const formData = new FormData()

        for (const file of files) {
            const isImage = file.mimetype.startsWith('image/')
            if (!isImage) {
                throw new UnauthorizedException(
                    `Файл ${file.originalname} не являеться фотографией.`
                )
            }
            const compressedBuffer = await this.compressImage(file.buffer)

            const blob = new Blob([compressedBuffer], {
                type: file.mimetype,
            })

            formData.append(`file${file.size}`, blob)
        }
        try {
            const response = await firstValueFrom(
                this.httpService.post(url, formData)
            )
            const keys = await this.cacheManager.store.keys()
            const productKeys = keys.filter(key => key.startsWith('products'))
            productKeys.forEach(async key => {
                await this.cacheManager.del(key)
            })

            return response.data
        } catch (error) {
            const currentDate = new Date()
            const formattedDate = `${currentDate.getDate()}.${
                currentDate.getMonth() + 1
            }.${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}`

            console.error(
                `⛔ Ошибка при добавлении фотографий ${formattedDate}:`,
                error.response.data
            )
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
                const keys = await this.cacheManager.store.keys()
                const productKeys = keys.filter(key =>
                    key.startsWith('products')
                )
                productKeys.forEach(async key => {
                    await this.cacheManager.del(key)
                })
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
    async getStatisticOfPhotos(query: ReqStatisticsOfPhotos) {
        const statisticOfPhotosUrl = `${this.IMAGE_SERVICE_URL}/v1/stats/${query.year}/${query.month}`

        try {
            const response = await firstValueFrom(
                this.httpService.get(statisticOfPhotosUrl)
            )
            return response.data
        } catch (error) {
            console.log(
                `🆘🆘🆘 Ошибка при получении статистики о фотографиях - ${error.response?.data}`
            )
            throw new UnauthorizedException(
                error.response?.data?.text ||
                    'Технические проблемы, попробуйте позже'
            )
        }
    }
}
