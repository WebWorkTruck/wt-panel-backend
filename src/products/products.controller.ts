import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { ProductsService } from './products.service'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ProductDto, ProductsResponse } from './dto/product.dto'
import {
    ChangeProductInAppSale,
    IssueProductInSaleReq,
    QueryRequestDto,
} from './dto/search.dto'

@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    @ApiOkResponse({ type: ProductsResponse })
    @ApiOperation({
        summary: 'Получение товаров по запросу',
    })
    getProducts(@Query() query: QueryRequestDto) {
        return this.productsService.getProducts(
            query.q,
            query.page,
            query.count
        )
    }

    @Get('one-product/:id')
    @ApiOkResponse({ type: ProductDto })
    @ApiOperation({
        summary: 'Получение товара',
    })
    getProduct(@Param('id') id: string) {
        return this.productsService.getProduct(id)
    }

    @Get('similar-products')
    @ApiOkResponse({ type: ProductsResponse })
    @ApiOperation({
        summary: 'Получение похожих товаров',
    })
    getSimilarProducts(@Query() query: QueryRequestDto) {
        return this.productsService.getSimilarProducts(query)
    }

    @Post('issue-product-in-sale')
    @ApiOkResponse()
    @ApiOperation({
        summary: 'Выдача товара в продаже',
    })
    issueProduct(@Body() body: IssueProductInSaleReq) {
        return this.productsService.issueProductInSale(body.id, body.pose)
    }

    @Post('change-product-in-app-sale')
    @ApiOkResponse()
    @ApiOperation({
        summary: 'Изменение товара в заявке или продаже',
    })
    changeProductInAppSale(@Body() body: ChangeProductInAppSale) {
        return this.productsService.changeProductInAppSale(
            body.id,
            body.indCode,
            body.pose
        )
    }
}
