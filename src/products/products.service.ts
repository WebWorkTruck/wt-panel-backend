import { HttpService } from '@nestjs/axios'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { ProductDto, ProductsResponse } from './dto/product.dto'
import { QueryRequestDto } from './dto/search.dto'

@Injectable()
export class ProductsService {
    constructor(private readonly httpService: HttpService) {}
    private ONE_C_URL = 'http://192.168.0.223/test/hs/wt_panel'

    async getProducts(
        q: string,
        page: string,
        count: string
    ): Promise<ProductsResponse> {
        let url: string

        if (!q) url = `/list-products/ /${page}/${count}`

        if (q) url = `/list-products/${q}/${page}/${count}`

        try {
            const response = await firstValueFrom(
                this.httpService.get(this.ONE_C_URL + url)
            )
            const products: ProductsResponse = response.data
            return products
        } catch (error) {
            throw new UnauthorizedException(error.response?.data?.text)
        }
    }
    async getProduct(id: string): Promise<ProductDto> {
        const url = `/product/${id}`

        try {
            const response = await firstValueFrom(
                this.httpService.get(this.ONE_C_URL + url)
            )
            const product: ProductsResponse = response.data
            return product.data[0]
        } catch (error) {
            throw new UnauthorizedException(error.response?.data?.text)
        }
    }

    async getSimilarProducts(
        query: QueryRequestDto
    ): Promise<ProductsResponse> {
        console.log(query.q.split('_')[0] + '_')

        const url = `/list-products/${123}/${query.page}/${query.count}`

        try {
            const response = await firstValueFrom(
                this.httpService.get(this.ONE_C_URL + url)
            )
            const product: ProductsResponse = response.data
            return product
        } catch (error) {
            throw new UnauthorizedException(error.response?.data?.text)
        }
    }
}
