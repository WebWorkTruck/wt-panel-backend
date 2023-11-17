import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { TimeControlModule } from './time-control/time-control.module'
import { PanelModule } from './panel/panel.module'
import { ProductsModule } from './products/products.module'

@Module({
    imports: [AuthModule, TimeControlModule, PanelModule, ProductsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
