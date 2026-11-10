import { HaakuConfig } from "../types/class.ts";

export class Haaku {
  private readonly config: HaakuConfig;

  constructor(config: HaakuConfig) {
    this.config = config;
  }
}
