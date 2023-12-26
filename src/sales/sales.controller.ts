import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { SalesService } from './sales.service'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { SaleAddTrackNumberReq, SaleResponseDto } from './dto/sale.dto'
import { CreateSaleDto } from './dto/create-sale.dto'
import { AuthGuard } from 'src/auth/auth.guard'
import { SessionInfo } from 'src/auth/session-info.decorator'
import { SessionInfoDto } from 'src/auth/dto/session.dto'

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
    @UseGuards(AuthGuard)
    addTrackNumber(
        @Body() body: SaleAddTrackNumberReq,
        @SessionInfo() session: SessionInfoDto
    ) {
        return this.salesService.addTrackNumber(body, session.id)
    }
    @Post('create-sale')
    @ApiOkResponse()
    @ApiOperation({
        summary: 'Создание продажи',
    })
    @UseGuards(AuthGuard)
    createSale(
        @Body() body: CreateSaleDto,
        @SessionInfo() session: SessionInfoDto
    ) {
        return this.salesService.createSale(body, session.id)
    }
}
