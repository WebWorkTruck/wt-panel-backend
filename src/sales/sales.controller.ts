import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { SalesService } from './sales.service'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { SaleAddTrackNumberReq, SaleResponseDto } from './dto/sale.dto'

@ApiTags('sales')
@Controller('sales')
export class SalesController {
    constructor(private readonly salesService: SalesService) {}

    @Get('/:id')
    @ApiOkResponse({ type: SaleResponseDto })
    @ApiOperation({
        summary: 'Получение продажи',
    })
    getSale(@Param('id') id: string) {
        return this.salesService.getSale(id)
    }
    @Post('add-track-number')
    @ApiOkResponse()
    @ApiOperation({
        summary: 'Добавить трек номер к продаже',
    })
    addTrackNumber(@Body() body: SaleAddTrackNumberReq) {
        return this.salesService.addTrackNumber(body)
    }
}
