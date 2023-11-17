import { HttpService } from '@nestjs/axios'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { ProductsResponse } from './dto/product.dto'

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
            console.log(error.response)

            throw new UnauthorizedException(error.response?.data?.text)
        }
    }
    async getProduct(id: string): Promise<any> {
        const url = `/product/${id}`

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
