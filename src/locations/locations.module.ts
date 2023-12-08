import { Module } from '@nestjs/common'
import { LocationsService } from './locations.service'
import { LocationsController } from './locations.controller'
import { HttpModule } from '@nestjs/axios'

@Module({
    imports: [HttpModule],
    controllers: [LocationsController],
    providers: [LocationsService],
})
export class LocationsModule {}
