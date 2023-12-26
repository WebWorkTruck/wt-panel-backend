import { HttpService } from '@nestjs/axios'
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import {
    ProductDto,
    ProductsResponse,
    ProductsTypesResponse,
} from './dto/product.dto'
import { ChangeProductInAppSale, QueryRequestDto } from './dto/search.dto'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import {
    ReqAssignMainPhoto,
    ReqEditProduct,
    ReqMovePallete,
    ReqMoveProduct,
    ReqSendToLost,
} from './dto/move-product.dto'
import { ReqLostProductsDto } from './dto/lost-products.dto'
import { SessionInfoDto } from 'src/auth/dto/session.dto'

@Injectable()
export class ProductsService {
    constructor(
        private readonly httpService: HttpService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
    ) {}
    private ONE_C_URL = process.env.URL_ONE_C
    private IMAGE_SERVICE_URL = process.env.IMAGE_SERVICE_URL

    async getProducts(query: QueryRequestDto) {
        const products = await this.cacheManager.get(
            `products ${query.q} ${query.page} ${query.count} ${query.pk}`
        )
        if (products) return products
        let url: string

        if (!query.q)
            url = `${this.ONE_C_URL}/list-products/ /${query.page}/${query.count}/${query.pk}`
        if (query.q)
            url = `${this.ONE_C_URL}/list-products/${query.q}/${query.page}/${query.count}/${query.pk}`

        try {
            const response = await firstValueFrom(this.httpService.get(url))
            const products: ProductsResponse = response.data
            await this.cacheManager.set(
                `products ${query.q} ${query.page} ${query.count} ${query.pk}`,
                products,
                1000 * 60 * 10
            )

            return products
        } catch (error) {
            console.log(
                `🆘🆘🆘 Ошибка при получении продуктов - ${error.response?.data}`
            )
            throw new UnauthorizedException(
                error.response?.data?.text ||
                    'Технические проблемы, попробуйте позже'
            )
        }
    }

    async getProduct(id: string): Promise<ProductDto> {
        const url = `${this.ONE_C_URL}/product/${id}`

        try {
            const response = await firstValueFrom(this.httpService.get(url))
            return response.data
        } catch (error) {
            console.log(
                `🆘🆘🆘 Ошибка при получении одного продукта - ${error.response?.data}`
            )
            throw new UnauthorizedException(
                error.response?.data?.text ||
                    'Технические проблемы, попробуйте позже'
            )
        }
    }

    async getTypesProducts(): Promise<[ProductsTypesResponse]> {
        const types: [ProductsTypesResponse] =
            await this.cacheManager.get(`types`)
        if (types) return types
        const url = `${this.ONE_C_URL}/types-product`

        try {
            const response = await firstValueFrom(this.httpService.get(url))
            const types = response.data
            await this.cacheManager.set(`types`, types, 1000 * 60 * 10)
            return types
        } catch (error) {
            console.log(
                `🆘🆘🆘 Ошибка при получении типов продуктов - ${error.response?.data}`
            )
            throw new UnauthorizedException(
                error.response?.data?.text ||
                    'Технические проблемы, попробуйте позже'
            )
        }
    }

    async getSimilarProducts(query: QueryRequestDto) {
        let url: string
        const queryForSearch = query.q.split('_')[0] + '_'

        if (!query.addPart) {
            url = `${this.ONE_C_URL}/list-products/${queryForSearch}/${query.page}/${query.count}/3`
        } else {
            if (query.addPart.split('_')[0] + '_' === queryForSearch) {
                url = `${this.ONE_C_URL}/list-products/${query.addPart}/${query.page}/${query.count}/3`
            } else {
                throw new UnauthorizedException(
                    'Товар не принадлежит данной карточке'
                )
            }
        }

        try {
            const response = await firstValueFrom(this.httpService.get(url))
            const products: ProductsResponse = response.data

            const filteredProducts = products.data.filter(
                product => product.indcode !== query.q
            )

            const updatedCount =
                products.info.count -
                (products.data.length - filteredProducts.length)

            const updatedPages = Math.ceil(updatedCount / Number(query.count))

            return {
                info: {
                    pages: updatedPages,
                    count: updatedCount,
                },
                data: filteredProducts,
            }
        } catch (error) {
            console.log(
                `🆘🆘🆘 Ошибка при получении похожих товаров - ${error.response?.data}`
            )
            throw new UnauthorizedException(
                error.response?.data?.text ||
                    'Технические проблемы, попробуйте позже'
            )
        }
    }

    async issueProductInSale(id: string, pose: number) {
        const url = `${this.ONE_C_URL}/issue-sale/${id}`
        try {
            const response = await firstValueFrom(
                this.httpService.post(url, { pose: pose })
            )

            return response.data
        } catch (error) {
            console.log(
                `🆘🆘🆘 Ошибка при выдаче товара - ${error.response?.data}`
            )
            throw new UnauthorizedException(
                error.response?.data?.text ||
                    'Технические проблемы, попробуйте позже'
            )
        }
    }
    async changeProductInAppSale({
        id,
        indCode,
        pose,
    }: ChangeProductInAppSale) {
        const url = `${this.ONE_C_URL}/filling-application/${id}`

        try {
            const response = await firstValueFrom(
                this.httpService.post(url, {
                    indCOde: indCode,
                    pose: pose,
                })
            )
            return response.data
        } catch (error) {
            console.log(
                `🆘🆘🆘 Ошибка при смене товара в продаже или заявке - ${error.response?.data}`
            )
            throw new UnauthorizedException(
                error.response?.data?.text ||
                    'Технические проблемы, попробуйте позже'
            )
        }
    }
    async moveProduct(body: ReqMoveProduct, session: SessionInfoDto) {
        const url = `${this.ONE_C_URL}/edit-place`

        try {
            const response = await firstValueFrom(
                this.httpService.post(url, {
                    id: body.id,
                    type: body.type,
                    place: body.place,
                    author: session.id,
                })
            )
            return response.data
        } catch (error) {
            console.log(
                `🆘🆘🆘 Ошибка при смене при перемещении товара - ${error.response?.data}`
            )
            throw new UnauthorizedException(
                error.response?.data?.text ||
                    'Технические проблемы, попробуйте позже'
            )
        }
    }
    async movePallete(body: ReqMovePallete) {
        const url = `${this.ONE_C_URL}/move-shelf`

        try {
            const response = await firstValueFrom(
                this.httpService.post(url, {
                    pallet: body.pallet,
                    shelf: body.place,
                })
            )
            return response.data
        } catch (error) {
            console.log(
                `🆘🆘🆘 Ошибка при смене при перемещении поддона - ${error.response?.data}`
            )
            throw new UnauthorizedException(
                error.response?.data?.text ||
                    'Технические проблемы, попробуйте позже'
            )
        }
    }
    async assignMainPhoto(query: ReqAssignMainPhoto) {
        const image = query.imageUrl.substring(
            query.imageUrl.lastIndexOf('/') + 1
        )
        const url = `${this.IMAGE_SERVICE_URL}/v1/images/${query.productId}?type=${query.type}&image_name=${image}`

        try {
            const response = await firstValueFrom(this.httpService.put(url))
            return response.data
        } catch (error) {
            console.log(
                `🆘🆘🆘 Ошибка при назначении фотографии главной - ${error.response?.data}`
            )
            throw new UnauthorizedException(
                error.response?.data?.text ||
                    'Технические проблемы, попробуйте позже'
            )
        }
    }

    async editProduct(body: ReqEditProduct) {
        const url = `${this.ONE_C_URL}/edit-product`

        try {
            const response = await firstValueFrom(
                this.httpService.post(url, {
                    id: body.id,
                    coment: body.comment,
                    cost: body.cost,
                })
            )
            return response.data
        } catch (error) {
            console.log(
                `🆘🆘🆘 Ошибка при смене при изменении товара - ${error.response?.data}`
            )
            throw new UnauthorizedException(
                error.response?.data?.text ||
                    'Технические проблемы, попробуйте позже'
            )
        }
    }

    async getLostProducts(query: ReqLostProductsDto) {
        let url = `${this.ONE_C_URL}/get-lost/${query.page}/${query.count}/`

        try {
            const response = await firstValueFrom(this.httpService.get(url))
            const products: ProductsResponse = response.data

            return products
        } catch (error) {
            console.log(
                `🆘🆘🆘 Ошибка при получении продуктов - ${error.response?.data}`
            )
            throw new UnauthorizedException(
                error.response?.data?.text ||
                    'Технические проблемы, попробуйте позже'
            )
        }
    }

    async removeToLost(body: ReqSendToLost, userId: string) {
        const url = `${this.ONE_C_URL}/remove-to-lost`

        try {
            const response = await firstValueFrom(
                this.httpService.post(url, {
                    ids: body.ids,
                    author: userId,
                })
            )
            return response.data
        } catch (error) {
            console.log(
                `🆘🆘🆘 Ошибка при смене при отправке товаров в потерянные - ${error.response?.data}`
            )
            throw new UnauthorizedException(
                error.response?.data?.text ||
                    'Технические проблемы, попробуйте позже'
            )
        }
    }
}
