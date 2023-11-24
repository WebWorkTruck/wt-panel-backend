import { HttpService } from '@nestjs/axios'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { ProductDto, ProductsResponse } from './dto/product.dto'
import { QueryRequestDto } from './dto/search.dto'

@Injectable()
export class ProductsService {
    constructor(private readonly httpService: HttpService) {}
    private ONE_C_URL = process.env.URL_ONE_C

    async getProducts(
        q: string,
        page: string,
        count: string
    ): Promise<ProductsResponse> {
        let url: string

        if (!q) url = `${this.ONE_C_URL}/list-products/ /${page}/${count}`
        if (q) url = `${this.ONE_C_URL}/list-products/${q}/${page}/${count}`

        try {
            const response = await firstValueFrom(this.httpService.get(url))
            const products: ProductsResponse = response.data
            return products
        } catch (error) {
            console.log(
                `Ошибка при получении продуктов - ${error.response?.data}`
            )
            throw new UnauthorizedException(error.response?.data?.text)
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
                `Ошибка при получении одного продукта - ${error.response?.data}`
            )
            throw new UnauthorizedException(error.response?.data?.text)
        }
    }

    async getSimilarProducts(
        query: QueryRequestDto
    ): Promise<ProductsResponse> {
        const url = `${this.ONE_C_URL}/list-products/${
            query.q.split('_')[0] + '_'
        }/${query.page}/${query.count}`

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
                `Ошибка при получении похожих товаров - ${error.response?.data}`
            )
            throw new UnauthorizedException(error.response?.data?.text)
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
            console.log(`Ошибка при выдаче товара - ${error.response?.data}`)
            throw new UnauthorizedException(error.response?.data?.text)
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
                `Ошибка при смене товара в продаже или заявке - ${error.response?.data}`
            )
            throw new UnauthorizedException(error.response?.data?.text)
        }
    }
}
