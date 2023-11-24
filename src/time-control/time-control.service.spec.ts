import { Test, TestingModule } from '@nestjs/testing'
import { TimeControlService } from './TimeControlService'

describe('TimeControlService', () => {
    let service: TimeControlService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TimeControlService],
        }).compile()

        service = module.get<TimeControlService>(TimeControlService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
