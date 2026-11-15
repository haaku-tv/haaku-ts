import { BaseEndpoint } from "../../index.ts";
import { HaakuConfig } from "../../types/class.ts";
import { CalendarsBaseInput, CalendarAllDvdEndpointResponse } from "../../types/endpoints/calendars.ts";

export class CalendarAllEndpoint extends BaseEndpoint {
    constructor (
        config: HaakuConfig
    ) {
        super(config)
    }
    async dvd(input: CalendarsBaseInput): Promise<CalendarAllDvdEndpointResponse> {
        return await this.api.get(`/v1/calendars/all/dvd/${input.startDate}/${input.days}`)
    }

    async media(input: CalendarsBaseInput): Promise<CalendarAllDvdEndpointResponse> {
        return await this.api.get(`/v1/calendars/all/media/${input.startDate}/${input.days}`)
    }
    async movies(input: CalendarsBaseInput): Promise<CalendarAllDvdEndpointResponse> {
        return await this.api.get(`/v1/calendars/all/dvd/${input.startDate}/${input.days}`)
    }
    get shows() {
        return new ShowsEndpoint(this.config)
    }
    async streaming(input: CalendarsBaseInput): Promise<unknown> {
        return await this.api.get(`/v1/calendars/all/streaming/${input.startDate}/${input.days}`)
    }
}

class ShowsEndpoint extends BaseEndpoint {
    constructor (
        config: HaakuConfig
    ) {
        super(config)
    }
    async all(input: CalendarsBaseInput): Promise<CalendarAllDvdEndpointResponse> {
        return await this.api.get(`/v1/calendars/all/shows/${input.startDate}/${input.days}`)
    }

    async finales(input: CalendarsBaseInput): Promise<CalendarAllDvdEndpointResponse> {
        return await this.api.get(`/v1/calendars/all/shows/finales/${input.startDate}/${input.days}`)
    }

    async new(input: CalendarsBaseInput): Promise<CalendarAllDvdEndpointResponse> {
        return await this.api.get(`/v1/calendars/all/shows/new${input.startDate}/${input.days}`)
    }

    async premieres(input: CalendarsBaseInput): Promise<CalendarAllDvdEndpointResponse> {
        return await this.api.get(`/v1/calendars/all/shows/premieres${input.startDate}/${input.days}`)
    }
}