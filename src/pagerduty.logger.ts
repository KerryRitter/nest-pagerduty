import { LoggerService } from '@nestjs/common';
import { PagerDutyService } from './pagerduty.service';
import { PagerDutyEvent, PagerDutyEventPayload, PagerDutyEventSeverity } from './pagerduty-event.model';

export class PagerDutyLogger implements LoggerService {
    public constructor(
        private readonly _pagerDutyService: PagerDutyService
    ) {
    }

    public async log(message: string) {
        const event = this.buildEvent(message, 'info');
        return await this.sendEvent(event);
    }

    public async error(message: string, trace: string) {
        const event = this.buildEvent(message, 'critical');
        event.payload.summary = `${event.payload} ${message}`.trim();
        return await this.sendEvent(event);
    }

    public async warn(message: string) {
        const event = this.buildEvent(message, 'warning');
        return await this.sendEvent(event);
    }

    public async debug(message: string) {
        const event = this.buildEvent(message, 'info');
        return await this.sendEvent(event);
    }

    public async verbose(message: string) {
        const event = this.buildEvent(message, 'info');
        return await this.sendEvent(event);
    }

    private buildEvent(summary: string, severity: PagerDutyEventSeverity) {
        const payload: PagerDutyEventPayload = {} as any;
        payload.severity = severity;
        payload.source = this._pagerDutyService.options.eventSource;
        payload.summary = summary;
 
        const event: PagerDutyEvent = {
            event_action: 'trigger',
            routing_key: this._pagerDutyService.options.apiKey,
            payload
        };

        console.log(`logging event ${severity}`, event);

        return event;
    }

    private async sendEvent(event: PagerDutyEvent) {
        try {
            const response = await this._pagerDutyService.sendEvent(event);
            if (response.errors) {
                console.log(`Error creating PagerDuty event.`, response);
            } else {
                console.log(`PagerDuty log sent successfully.`, response);
            }
        } catch (ex) {
            console.error(`Error sending PagerDuty log`, ex);
            throw ex;
        }
    }
}