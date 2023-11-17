import { Module } from '@nestjs/common'
import { PanelService } from './panel.service'
import { PanelController } from './panel.controller'
import { HttpModule } from '@nestjs/axios'

@Module({
    imports: [HttpModule],
    controllers: [PanelController],
    providers: [PanelService],
})
export class PanelModule {}
