import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { PagerDutyLogger, PagerDutyModule } from 'src';
import { INestApplication, INestExpressApplication, Logger } from '@nestjs/common';

describe('PagerDuty Logger (e2e)', () => {
    let app: INestApplication & INestExpressApplication;
    
    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [PagerDutyModule.forRoot([], {
                apiKey: '',
                eventSource: 'PagerDutyLoggerTest'
            })],
        }).compile();
        
        app = moduleFixture.createNestApplication();
        app.useLogger(app.get(PagerDutyLogger));
        await app.init();
    });
    
    it('should log error as expected.', () => {
        const log = new Logger(`app.e2e-spec`);
        log.error('This is a test: Error!');
    });
    
    it('should log error as expected.', () => {
        const log = new Logger(`app.e2e-spec`);
        log.warn('This is a test: Warning!');
    });
    
    it('should log info as expected.', () => {
        const log = new Logger(`app.e2e-spec`);
        log.log('This is a test: Logging!');
    });
});
