export type HealthcheckResponse = {
  status: "ok";
};

export type HealthcheckMigrationState = {
  version: number;
  newest: number;
  applied: number;
  expected: number;
  pending: number;
  migrating: boolean;
  up_to_date: boolean;
};

export type HealthcheckReadinessResponse = {
  status: "ready" | "degraded" | "migrating";
  reason?: string;
  redis?: string;
  migration: HealthcheckMigrationState;
};
