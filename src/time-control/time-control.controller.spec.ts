import { Test, TestingModule } from '@nestjs/testing'
import { TimeControlController } from './time-control.controller'
import { TimeControlService } from './TimeControlService'

describe('TimeControlController', () => {
    let controller: TimeControlController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TimeControlController],
            providers: [TimeControlService],
        }).compile()

        controller = module.get<TimeControlController>(TimeControlController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})
