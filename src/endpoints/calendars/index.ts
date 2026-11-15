import { BaseEndpoint } from "../../index.ts";
import { HaakuConfig } from "../../types/class.ts";
import { CalendarAllEndpoint } from "./all.ts";

export class CalendarEndpoint extends BaseEndpoint {
    constructor (
        config: HaakuConfig
    ) {
        super(config)
    }
    get all() {
        return new CalendarAllEndpoint(this.config)
    }
}