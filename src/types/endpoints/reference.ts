import type { LanguageCode } from "@hongminhee/iso639-1";
import type { CountryCode } from "country-data-ts/countries";

export type ReferenceType = "movies" | "shows";

export type ReferenceGenre = {
  name: string;
  slug: string;
};

export type ReferenceLanguage = {
  name: string;
  code: LanguageCode;
};

export type ReferenceCountry = {
  name: string;
  code: CountryCode;
};

export type ReferenceNetwork = {
  name: string;
};

export type ReferenceCertification = {
  name: string;
  meaning?: string;
  order: number;
};

export type ReferenceCertificationGroup = {
  country: string;
  certifications: ReferenceCertification[];
};

export type ReferenceCertificationOption = {
  name: string;
  slug: string;
  description: string;
};

export type ReferenceCertificationCatalog = Record<
  string,
  ReferenceCertificationOption[]
>;
