export interface CrateDetailVO {
  categories?: Category[];
  crate?:      Crate;
  keywords?:   Keyword[];
  versions?:   Version[];
}

export interface Category {
  category?:    string;
  crates_cnt?:  number;
  created_at?:  Date;
  description?: string;
  id?:          string;
  slug?:        string;
}

export interface Crate {
  badges?:             any[];
  categories?:         string[];
  created_at?:         Date;
  description?:        string;
  documentation?:      string;
  downloads?:          number;
  exact_match?:        boolean;
  homepage?:           string;
  id?:                 ID;
  keywords?:           string[];
  links?:              CrateLinks;
  max_stable_version?: string;
  max_version?:        string;
  name?:               ID;
  newest_version?:     string;
  recent_downloads?:   number;
  repository?:         string;
  updated_at?:         Date;
  versions?:           number[];
}

export enum ID {
  Rand = "rand",
}

export interface CrateLinks {
  owner_team?:           string;
  owner_user?:           string;
  owners?:               string;
  reverse_dependencies?: string;
  version_downloads?:    string;
  versions?:             null;
}

export interface Keyword {
  crates_cnt?: number;
  created_at?: Date;
  id?:         string;
  keyword?:    string;
}

export interface Version {
  audit_actions?: AuditAction[];
  crate?:         ID;
  crate_size?:    number | null;
  created_at?:    Date;
  dl_path?:       string;
  downloads?:     number;
  features?:      { [key: string]: string[] };
  id?:            number;
  license?:       string;
  links?:         VersionLinks;
  num?:           string;
  published_by?:  PublishedBy | null;
  readme_path?:   string;
  updated_at?:    Date;
  yanked?:        boolean;
}

export interface AuditAction {
  action?: string;
  time?:   Date;
  user?:   PublishedBy;
}

export interface PublishedBy {
  avatar?: string;
  id?:     number;
  login?:  string;
  name?:   string;
  url?:    string;
}

export interface VersionLinks {
  authors?:           string;
  dependencies?:      string;
  version_downloads?: string;
}

export interface CrateDepsVO {
  dependencies?: CrateDep[];
}

export interface CrateDep {
  crate_id?:         string;
  default_features?: boolean;
  downloads?:        number;
  features?:         string[];
  id?:               number;
  kind?:             string;
  optional?:         boolean;
  req?:              string;
  target?:           null | string;
  version_id?:       number;
}

export interface CrateIntroVO {
  crates?: CrateIntro[];
  meta?:   Meta;
}

export interface CrateIntro {
  badges?:             Badge[];
  categories?:         null;
  created_at?:         Date;
  description?:        string;
  documentation?:      string;
  downloads?:          number;
  exact_match?:        boolean;
  homepage?:           null | string;
  id?:                 string;
  keywords?:           null;
  links?:              Links;
  max_stable_version?: string;
  max_version?:        string;
  name?:               string;
  newest_version?:     string;
  recent_downloads?:   number;
  repository?:         string;
  updated_at?:         Date;
  versions?:           null;
}

export interface Badge {
  attributes?: Attributes;
  badge_type?: string;
}

export interface Attributes {
  branch?:       null;
  repository?:   string;
  id?:           null;
  project_name?: null;
  service?:      null;
  status?:       string;
}

export interface Links {
  owner_team?:           string;
  owner_user?:           string;
  owners?:               string;
  reverse_dependencies?: string;
  version_downloads?:    string;
  versions?:             string;
}

export interface Meta {
  next_page?: null;
  prev_page?: null;
  total?:     number;
}
