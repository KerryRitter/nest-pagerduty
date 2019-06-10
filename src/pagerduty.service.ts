import { Injectable } from '@nestjs/common';
import { PagerDutyEvent } from './pagerduty-event.model';
import { PagerDutyOptions } from './pagerduty-options.model';
import * as PagerDutyClient from 'node-pagerduty';

export interface PagerDutyEventResponse {
    status: 'success'|'invalid event';
    message: string;
    errors: string[];
}

@Injectable()
export class PagerDutyService {
    private readonly _client: {
        sendEvent: (event: PagerDutyEvent) => Promise<PagerDutyEventResponse>;
    };

    public constructor(
        public readonly options?: PagerDutyOptions
    ) {
        this._client = new PagerDutyClient(options.apiKey);
    }

    public async sendEvent(event: PagerDutyEvent) {
        return await this._client.sendEvent(event);
    }
}
