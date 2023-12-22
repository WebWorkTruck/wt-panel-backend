import { Controller, Get, Query } from '@nestjs/common'
import { PoddonsService } from './poddons.service'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ReqPoddonDto, ResPoddonDto } from './dto/one-poddon.dto'

@ApiTags('poddons')
@Controller('poddons')
export class PoddonsController {
    constructor(private readonly poddonsService: PoddonsService) {}

    @Get('one-poddon')
    @ApiOkResponse({
        type: ResPoddonDto,
    })
    @ApiOperation({
        summary: 'Информация о поддоне',
    })
    getOnePoddon(@Query() query: ReqPoddonDto) {
        return this.poddonsService.getOnePoddon(query)
    }
}
