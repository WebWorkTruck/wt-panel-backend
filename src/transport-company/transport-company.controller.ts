import { Controller, Get } from '@nestjs/common'
import { TransportCompanyService } from './transport-company.service'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ResTransportCompanyDto } from './dto/transport-company.dto'

@ApiTags('transport-company')
@Controller('transport-company')
export class TransportCompanyController {
    constructor(
        private readonly transportCompanyService: TransportCompanyService
    ) {}
    @Get('all-transport-companies')
    @ApiOkResponse({
        type: [ResTransportCompanyDto],
    })
    @ApiOperation({
        summary: 'Получение списка всех транспортных компаний',
    })
    getTransportCompanies() {
        return this.transportCompanyService.getAllTransportCompanies()
    }
}
