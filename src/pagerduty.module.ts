import { Module, DynamicModule, Provider } from '@nestjs/common';
import { PagerDutyService } from './pagerduty.service';
import { PagerDutyOptions } from './pagerduty-options.model';
import { PagerDutyLogger } from './pagerduty.logger';

@Module({
    imports: [],
    providers: [
        PagerDutyService,
        PagerDutyLogger
    ],
    exports: [
        PagerDutyService,
        PagerDutyLogger
    ]
})
export class PagerDutyModule {
    public static forRoot(entities = [], options?: PagerDutyOptions): DynamicModule {
        const providers: Provider[] = [
            {
                provide: PagerDutyService,
                useFactory: (o) => new PagerDutyService(options)
            }
        ];

        return {
            module: PagerDutyModule,
            providers: providers,
            exports: providers,
        };
    }
}
