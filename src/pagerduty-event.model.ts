export type PagerDutyEventSeverity = 'critical'|'error'|'warning'|'info';

export type PagerDutyEventAction = 'trigger'|'acknowledge'|'resolve';

export interface PagerDutyEventPayload {
    summary: string;
    source: string;
    severity: PagerDutyEventSeverity;
}

export interface PagerDutyEvent {
    routing_key: string;
    event_action: PagerDutyEventAction;
    payload: PagerDutyEventPayload;
}