import { HttpService } from '@nestjs/axios'
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { ProductDto, ProductsResponse } from './dto/product.dto'
import { QueryRequestDto } from './dto/search.dto'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { ReqMovePallete, ReqMoveProduct } from './dto/move-product.dto'

@Injectable()
export class ProductsService {
    constructor(
        private readonly httpService: HttpService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
    ) {}
    private ONE_C_URL = process.env.URL_ONE_C

    async getProducts(q: string, page: string, count: string) {
        const products = await this.cacheManager.get(
            `products ${q} ${page} ${count}`
        )
        if (products) return products
        let url: string

        if (!q) url = `${this.ONE_C_URL}/list-products/ /${page}/${count}`
        if (q) url = `${this.ONE_C_URL}/list-products/${q}/${page}/${count}`

        try {
            const response = await firstValueFrom(this.httpService.get(url))
            const products: ProductsResponse = response.data
            await this.cacheManager.set(
                `products ${q} ${page} ${count}`,
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
            const product: ProductsResponse = response.data
            return product.data[0]
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

    async getSimilarProducts(query: QueryRequestDto) {
        let url: string
        const queryForSearch = query.q.split('_')[0] + '_'

        if (!query.addPart) {
            url = `${this.ONE_C_URL}/list-products/${queryForSearch}/${query.page}/${query.count}`
        } else {
            if (query.addPart.split('_')[0] + '_' === queryForSearch) {
                url = `${this.ONE_C_URL}/list-products/${query.addPart}/${query.page}/${query.count}`
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

    async issueProductInSale(id: string, pose: string[]) {
        const url = `${this.ONE_C_URL}/issue-sale/${id}`
        const poseeNumbers = pose.map(Number)

        try {
            const response = await firstValueFrom(
                this.httpService.post(url, { pose: poseeNumbers })
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
    async changeProductInAppSale(id: string, indCode: string, pose: string) {
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
    async moveProduct(body: ReqMoveProduct) {
        const url = `${this.ONE_C_URL}/edit-place`

        try {
            const response = await firstValueFrom(
                this.httpService.post(url, {
                    id: body.id,
                    type: body.type,
                    place: body.place,
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
        const url = `${this.ONE_C_URL}/replace-pallet`

        try {
            const response = await firstValueFrom(
                this.httpService.post(url, {
                    pallet: body.pallet,
                    place: body.place,
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
}
