import { BaseEndpoint } from "../../core/base.ts";
import type { HaakuConfig } from "../../types/class.ts";
import type {
  ReportsActionInput,
  ReportsQuery,
  ReportsReport,
} from "../../types/endpoints/reports.ts";
import { compactQuery } from "../../utils/query.ts";

export class ReportEndpoint extends BaseEndpoint {
  constructor(config: HaakuConfig) {
    super(config);
  }

  list(input: ReportsQuery = {}): Promise<ReportsReport[]> {
    return this.api.get("/v1/reports", {
      params: compactQuery({
        status: input.status,
        target_type: input.targetType,
        page: input.page,
        limit: input.limit,
      }),
    });
  }

  resolve(
    id: number,
    input: ReportsActionInput = {},
  ): Promise<ReportsReport> {
    return this.api.post(`/v1/reports/${id}/resolve`, {
      ...(input.note !== undefined ? { body: { note: input.note } } : {}),
    });
  }

  dismiss(
    id: number,
    input: ReportsActionInput = {},
  ): Promise<ReportsReport> {
    return this.api.post(`/v1/reports/${id}/dismiss`, {
      ...(input.note !== undefined ? { body: { note: input.note } } : {}),
    });
  }
}
