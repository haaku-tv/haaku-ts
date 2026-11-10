import { HaakuConfig } from "../types/class.ts";
import { Api } from "./api.ts";

export class BaseEndpoint {
    protected api: Api;

    constructor (
        protected readonly config: HaakuConfig
    ) {
        this.api = new Api(config)
    }
}