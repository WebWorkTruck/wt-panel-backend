import { Controller, Get, Param } from '@nestjs/common'
import { SalesService } from './sales.service'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { SaleResponseDto } from './dto/sale.dto'

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
}
