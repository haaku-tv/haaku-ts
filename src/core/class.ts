import { AdminEndpoint } from "../endpoints/admin.ts";
import { AuthEndpoint } from "../endpoints/auth.ts";
import { CalendarEndpoint } from "../endpoints/calendars/index.ts";
import { CheckinEndpoint } from "../endpoints/checkin/index.ts";
import { CommentEndpoint } from "../endpoints/comments/index.ts";
import { EpisodeEndpoint } from "../endpoints/episodes/index.ts";
import { FilterEndpoint } from "../endpoints/filters/index.ts";
import { HealthCheckEndpoint } from "../endpoints/healthcheck.ts";
import { IntegrationEndpoint } from "../endpoints/integrations/index.ts";
import { ListEndpoint } from "../endpoints/lists/index.ts";
import { MediaEndpoint } from "../endpoints/media/index.ts";
import { MovieEndpoint } from "../endpoints/movies/index.ts";
import { NoteEndpoint } from "../endpoints/notes/index.ts";
import { NotificationEndpoint } from "../endpoints/notifications/index.ts";
import { PersonEndpoint } from "../endpoints/people/index.ts";
import { RecommendationEndpoint } from "../endpoints/recommendations/index.ts";
import { ReferenceEndpoint } from "../endpoints/reference/index.ts";
import { ReportEndpoint } from "../endpoints/reports/index.ts";
import { ScrobbleEndpoint } from "../endpoints/scrobble/index.ts";
import { SearchEndpoint } from "../endpoints/search/index.ts";
import { SeasonEndpoint } from "../endpoints/seasons/index.ts";
import { ShowEndpoint } from "../endpoints/shows/index.ts";
import { SmartListEndpoint } from "../endpoints/smartLists/index.ts";
import { SyncEndpoint } from "../endpoints/sync/index.ts";
import { UsersEndpoint } from "../endpoints/users/index.ts";
import { WatchNowEndpoint } from "../endpoints/watchnow/index.ts";
import { WebhookEndpoint } from "../endpoints/webhooks/index.ts";
import type { HaakuConfig } from "../types/class.ts";
import type {
  HealthcheckReadinessResponse,
  HealthcheckResponse,
} from "../types/endpoints/healthcheck.ts";

export class Haaku {
  private readonly config: HaakuConfig;

  constructor(config: HaakuConfig) {
    this.config = config;
  }

  get healthcheck(): () => Promise<HealthcheckResponse> {
    const endpoint = new HealthCheckEndpoint(this.config);
    return endpoint.healthcheck.bind(endpoint);
  }

  get readiness(): () => Promise<HealthcheckReadinessResponse> {
    const endpoint = new HealthCheckEndpoint(this.config);
    return endpoint.readiness.bind(endpoint);
  }

  get admin(): AdminEndpoint {
    return new AdminEndpoint(this.config);
  }

  get auth(): AuthEndpoint {
    return new AuthEndpoint(this.config);
  }

  get calendars(): CalendarEndpoint {
    return new CalendarEndpoint(this.config);
  }

  get checkin(): CheckinEndpoint {
    return new CheckinEndpoint(this.config);
  }

  get comments(): CommentEndpoint {
    return new CommentEndpoint(this.config);
  }

  get episodes(): EpisodeEndpoint {
    return new EpisodeEndpoint(this.config);
  }

  get filters(): FilterEndpoint {
    return new FilterEndpoint(this.config);
  }

  get integrations(): IntegrationEndpoint {
    return new IntegrationEndpoint(this.config);
  }

  get lists(): ListEndpoint {
    return new ListEndpoint(this.config);
  }

  get media(): MediaEndpoint {
    return new MediaEndpoint(this.config);
  }

  get movies(): MovieEndpoint {
    return new MovieEndpoint(this.config);
  }

  get notes(): NoteEndpoint {
    return new NoteEndpoint(this.config);
  }

  get notifications(): NotificationEndpoint {
    return new NotificationEndpoint(this.config);
  }

  get people(): PersonEndpoint {
    return new PersonEndpoint(this.config);
  }

  get recommendations(): RecommendationEndpoint {
    return new RecommendationEndpoint(this.config);
  }

  get reference(): ReferenceEndpoint {
    return new ReferenceEndpoint(this.config);
  }

  get reports(): ReportEndpoint {
    return new ReportEndpoint(this.config);
  }

  get scrobble(): ScrobbleEndpoint {
    return new ScrobbleEndpoint(this.config);
  }

  get search(): SearchEndpoint {
    return new SearchEndpoint(this.config);
  }

  get seasons(): SeasonEndpoint {
    return new SeasonEndpoint(this.config);
  }

  get shows(): ShowEndpoint {
    return new ShowEndpoint(this.config);
  }

  get smartLists(): SmartListEndpoint {
    return new SmartListEndpoint(this.config);
  }

  get sync(): SyncEndpoint {
    return new SyncEndpoint(this.config);
  }

  get users(): UsersEndpoint {
    return new UsersEndpoint(this.config);
  }

  get watchNow(): WatchNowEndpoint {
    return new WatchNowEndpoint(this.config);
  }

  get webhooks(): WebhookEndpoint {
    return new WebhookEndpoint(this.config);
  }
}
