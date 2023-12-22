import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common'
import { ProductsService } from './products.service'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import {
    ProductDto,
    ProductsResponse,
    ProductsTypesResponse,
} from './dto/product.dto'
import {
    ChangeProductInAppSale,
    IssueProductInSaleReq,
    QueryRequestDto,
} from './dto/search.dto'
import {
    ReqAssignMainPhoto,
    ReqEditProduct,
    ReqMovePallete,
    ReqMoveProduct,
    ReqSendToLost,
} from './dto/move-product.dto'
import { ReqLostProductsDto } from './dto/lost-products.dto'
import { AuthGuard } from 'src/auth/auth.guard'
import { SessionInfo } from 'src/auth/session-info.decorator'
import { SessionInfoDto } from 'src/auth/dto/session.dto'

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
        return this.productsService.getProducts(query)
    }

    @Get('one-product/:id')
    @ApiOkResponse({ type: ProductDto })
    @ApiOperation({
        summary: 'Получение товара',
    })
    getProduct(@Param('id') id: string) {
        return this.productsService.getProduct(id)
    }
    @Get('type-products')
    @ApiOkResponse({ type: [ProductsTypesResponse] })
    @ApiOperation({
        summary: 'Получение типов продуктов',
    })
    getTypesProduct() {
        return this.productsService.getTypesProducts()
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
        return this.productsService.changeProductInAppSale(body)
    }
    @Post('move-product')
    @ApiOkResponse()
    @ApiOperation({
        summary: 'Изменение места товара',
    })
    @UseGuards(AuthGuard)
    moveProduct(
        @Body() body: ReqMoveProduct,
        @SessionInfo() session: SessionInfoDto
    ) {
        return this.productsService.moveProduct(body, session)
    }
    @Post('move-pallete')
    @ApiOkResponse()
    @ApiOperation({
        summary: 'Изменение места паллета',
    })
    movePallete(@Body() body: ReqMovePallete) {
        return this.productsService.movePallete(body)
    }
    @Put('assign-main-photo')
    @ApiOkResponse()
    @ApiOperation({
        summary: 'Назначить фотографию главной',
    })
    assignMainPhoto(@Query() query: ReqAssignMainPhoto) {
        return this.productsService.assignMainPhoto(query)
    }
    @Post('edit')
    @ApiOkResponse()
    @ApiOperation({
        summary: 'Изменение цены и комментарийя продукта',
    })
    editProduct(@Body() body: ReqEditProduct) {
        return this.productsService.editProduct(body)
    }
    @Get('lost-products')
    @ApiOkResponse({ type: ProductsResponse })
    @ApiOperation({
        summary: 'Получение потерянных продуктов',
    })
    getLostProducts(@Query() query: ReqLostProductsDto) {
        return this.productsService.getLostProducts(query)
    }
    @Post('remove-to-lost')
    @ApiOkResponse()
    @ApiOperation({
        summary: 'Перемещение массива товаров в список потерянных',
    })
    @UseGuards(AuthGuard)
    removeToLost(
        @Body() body: ReqSendToLost,
        @SessionInfo() session: SessionInfoDto
    ) {
        return this.productsService.removeToLost(body, session.id)
    }
}
