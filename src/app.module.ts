import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { TimeControlModule } from './time-control/time-control.module'
import { PanelModule } from './panel/panel.module'
import { ProductsModule } from './products/products.module'
import { ApplicationsModule } from './applications/applications.module'
import { SalesModule } from './sales/sales.module'
import { CacheModule } from '@nestjs/cache-manager'
import { ConfigModule } from '@nestjs/config'

@Module({
    imports: [
        AuthModule,
        TimeControlModule,
        PanelModule,
        ProductsModule,
        ApplicationsModule,
        SalesModule,
        CacheModule.register({ isGlobal: true }),
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
