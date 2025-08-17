export interface BrightDataResponse {
  id: string;
  name: string;
  city: string;
  country_code: string;
  position: string;
  about: string;
  current_company: CurrentCompany;
  experience: Experience[];
  url: string;
  people_also_viewed: PeopleAlsoViewed[];
  educations_details: string;
  education: Education[];
  avatar: string;
  certifications: Certification[];
  followers: number;
  connections: number;
  current_company_company_id: string;
  current_company_name: string;
  publications: Publication[];
  location: string;
  input_url: string;
  linkedin_id: string;
  linkedin_num_id: string;
  banner_image: string;
  honors_and_awards: HonorsAndAward[];
  similar_profiles: SimilarProfile[];
  default_avatar: boolean;
  memorialized_account: boolean;
  bio_links: BioLink[];
  first_name: string;
  last_name: string;
  timestamp: string;
  input: Input;
}

export interface CurrentCompany {
  name: string;
  company_id: string;
  title: string;
  location: string;
}

export interface Experience {
  title: string;
  location: string;
  description?: string;
  description_html?: string;
  start_date: string;
  end_date: string;
  company: string;
  company_id?: string;
  url?: string;
  company_logo_url: string;
}

export interface PeopleAlsoViewed {
  profile_link: string;
  name: string;
  about?: string;
  location: string;
}

export interface Education {
  title: string;
  degree: string;
  field: string;
  url?: string;
  start_year?: string;
  end_year?: string;
  description: string;
  description_html: string;
  institute_logo_url: string;
}

export interface Certification {
  meta: string;
  subtitle: string;
  title: string;
  credential_url: string;
  credential_id?: string;
}

export interface Publication {
  title: string;
  subtitle: string;
  date: string;
}

export interface HonorsAndAward {
  title: string;
  publication: string;
  date?: string;
  description?: string;
}

export interface SimilarProfile {
  url: string;
  name: string;
  title?: string;
  url_text: string;
}

export interface BioLink {
  title: string;
  link: string;
}

export interface Input {
  url: string;
}
