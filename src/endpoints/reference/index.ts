import { BaseEndpoint } from "../../core/base.ts";
import type { HaakuConfig } from "../../types/class.ts";
import type {
  ReferenceCertificationCatalog,
  ReferenceCertificationGroup,
  ReferenceCountry,
  ReferenceGenre,
  ReferenceLanguage,
  ReferenceNetwork,
  ReferenceType,
} from "../../types/endpoints/reference.ts";

export class ReferenceEndpoint extends BaseEndpoint {
  constructor(config: HaakuConfig) {
    super(config);
  }

  genres(type: ReferenceType): Promise<ReferenceGenre[]> {
    return this.api.get(`/v1/genres/${type}`);
  }

  languages(type: ReferenceType): Promise<ReferenceLanguage[]> {
    return this.api.get(`/v1/languages/${type}`);
  }

  countries(type: ReferenceType): Promise<ReferenceCountry[]> {
    return this.api.get(`/v1/countries/${type}`);
  }

  networks(): Promise<ReferenceNetwork[]> {
    return this.api.get("/v1/networks");
  }

  certifications(
    type: ReferenceType,
  ): Promise<ReferenceCertificationGroup[]> {
    return this.api.get(`/v1/certifications/${type}`);
  }

  certificationMovies(): Promise<ReferenceCertificationCatalog> {
    return this.api.get("/v1/certifications/movies");
  }

  certificationShows(): Promise<ReferenceCertificationCatalog> {
    return this.api.get("/v1/certifications/shows");
  }
}
