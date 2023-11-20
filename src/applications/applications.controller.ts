import { Controller, Get, Param } from '@nestjs/common'
import { ApplicationsService } from './applications.service'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApplicationResponseDto } from './dto/application.dto'

@ApiTags('applications')
@Controller('applications')
export class ApplicationsController {
    constructor(private readonly applicationsService: ApplicationsService) {}
    @Get('/:id')
    @ApiOkResponse({ type: ApplicationResponseDto })
    @ApiOperation({
        summary: 'Получение заявки',
    })
    getApplication(@Param('id') id: string) {
        return this.applicationsService.getApplication(id)
    }
}
