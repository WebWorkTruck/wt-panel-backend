import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common'
import { PanelService } from './panel.service'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { BadApplication } from './dto/bad-application.dto'
import { Category } from './dto/category.dto'
import { SessionInfo } from 'src/auth/session-info.decorator'
import { SessionInfoDto } from 'src/auth/dto/session.dto'
import { AuthGuard } from 'src/auth/auth.guard'
import {
    ApplicationSaleDto,
    MoveApplicationSaleDto,
    ReqApplicationSaleDto,
    ReqFailuresDto,
    ReqMissedCalls,
    ReqRefusalDto,
    ReqReturnsDto,
} from './dto/application-sale.dto'
import { OrgsBills } from './dto/orgs-bills.dto'
import { DeliveryInfoRes, ReqGetDeliveryInfo } from './dto/delivery-info'
import { ReqCreateCheck, ReqGetCheck, ResCheck } from './dto/check.dto'

@ApiTags('panel')
@Controller('panel')
export class PanelController {
    constructor(private readonly panelService: PanelService) {}

    @Get('bad-applications')
    @ApiOkResponse({
        type: [BadApplication],
    })
    @ApiOperation({
        summary:
            'Получение информации о отказах, возвратах, и пропущенных звонках',
    })
    @UseGuards(AuthGuard)
    getBadApplications(@SessionInfo() session: SessionInfoDto) {
        return this.panelService.getBadApplications(session.id)
    }

    @Get('categories')
    @ApiOkResponse({
        type: [Category],
    })
    @ApiOperation({
        summary: 'Получение категорий',
    })
    @UseGuards(AuthGuard)
    getCategories(@SessionInfo() session: SessionInfoDto) {
        return this.panelService.getCategories(session.id)
    }

    @Get('applications-sales')
    @ApiOkResponse({
        type: ApplicationSaleDto,
    })
    @ApiOperation({
        summary: 'Получение заявок и продаж',
    })
    @UseGuards(AuthGuard)
    getApplicationSale(
        @SessionInfo() session: SessionInfoDto,
        @Query() query: ReqApplicationSaleDto
    ) {
        return this.panelService.getApplicationSale(session.id, query)
    }

    @Post('move-application-sale')
    @ApiOkResponse()
    @ApiOperation({
        summary: 'Перемещение заявок и продаж',
    })
    @UseGuards(AuthGuard)
    moveApplicationSale(
        @SessionInfo() session: SessionInfoDto,
        @Body() body: MoveApplicationSaleDto
    ) {
        return this.panelService.moveApplicationSale(session.id, body)
    }

    @Get('organizations-bills')
    @ApiOkResponse({
        type: OrgsBills,
    })
    @ApiOperation({
        summary: 'Получение организация и счетов',
    })
    getOrgsBills() {
        return this.panelService.getOrgsBills()
    }

    @Get('cancels')
    @ApiOkResponse({
        type: ApplicationSaleDto,
    })
    @ApiOperation({
        summary: 'Отказы',
    })
    @UseGuards(AuthGuard)
    getCancels(
        @SessionInfo() session: SessionInfoDto,
        @Query() query: ReqFailuresDto
    ) {
        return this.panelService.getCancels(session.id, query)
    }

    @Get('returns')
    @ApiOkResponse({
        type: OrgsBills,
    })
    @ApiOperation({
        summary: 'Возвраты',
    })
    @UseGuards(AuthGuard)
    getReturns(
        @SessionInfo() session: SessionInfoDto,
        @Query() query: ReqReturnsDto
    ) {
        return this.panelService.getReturns(session.id, query)
    }

    @Get('missed-calls')
    @ApiOkResponse({
        type: OrgsBills,
    })
    @ApiOperation({
        summary: 'Пропущенные звонки',
    })
    @UseGuards(AuthGuard)
    getMissedCalls(
        @SessionInfo() session: SessionInfoDto,
        @Query() query: ReqMissedCalls
    ) {
        return this.panelService.getReturns(session.id, query)
    }

    @Post('refusal')
    @ApiOkResponse({
        type: OrgsBills,
    })
    @ApiOperation({
        summary: 'Передать заявку в отказ',
    })
    @UseGuards(AuthGuard)
    refusalApplication(
        @Body() body: ReqRefusalDto,
        @SessionInfo() session: SessionInfoDto
    ) {
        return this.panelService.refusalApplication(session.id, body)
    }

    @Get('delivery-info')
    @ApiOkResponse({ type: DeliveryInfoRes })
    @ApiOperation({
        summary: 'Получить информацию о доставке',
    })
    async deliveryInfo(@Query() query: ReqGetDeliveryInfo) {
        const tkCities = await this.panelService.getTkCities()
        const deliveryInfo = await this.panelService.getDeliveryInfo(query)

        return { tkCities: tkCities, deliveryInfo: deliveryInfo }
    }
    @Get('get-check')
    @ApiOkResponse({ type: ResCheck })
    @ApiOperation({
        summary: 'Получить информацию о счёте',
    })
    async getCheck(@Query() query: ReqGetCheck) {
        return this.panelService.getCheck(query)
    }

    @Post('create-check')
    @ApiOkResponse()
    @ApiOperation({
        summary: 'Сформировать счёт',
    })
    async createCheck(@Body() body: ReqCreateCheck) {
        return this.panelService.createCheck(body)
    }
}
