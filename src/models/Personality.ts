import { Schema, model } from "mongoose";

// Sub-schemas for nested objects
const currentCompanySchema = new Schema(
  {
    name: { type: String },
    company_id: { type: String },
    title: { type: String },
    location: { type: String },
  },
  { _id: false }
);

const experienceSchema = new Schema(
  {
    title: { type: String },
    location: { type: String },
    description: { type: String },
    description_html: { type: String },
    start_date: { type: String },
    end_date: { type: String },
    company: { type: String },
    company_id: { type: String },
    url: { type: String },
    company_logo_url: { type: String },
  },
  { _id: false }
);

const peopleAlsoViewedSchema = new Schema(
  {
    profile_link: { type: String },
    name: { type: String },
    about: { type: String },
    location: { type: String },
  },
  { _id: false }
);

const educationSchema = new Schema(
  {
    title: { type: String },
    degree: { type: String },
    field: { type: String },
    url: { type: String },
    start_year: { type: String },
    end_year: { type: String },
    description: { type: String },
    description_html: { type: String },
    institute_logo_url: { type: String },
  },
  { _id: false }
);

const certificationSchema = new Schema(
  {
    meta: { type: String },
    subtitle: { type: String },
    title: { type: String },
    credential_url: { type: String },
    credential_id: { type: String },
  },
  { _id: false }
);

const publicationSchema = new Schema(
  {
    title: { type: String },
    subtitle: { type: String },
    date: { type: String },
  },
  { _id: false }
);

const honorsAndAwardSchema = new Schema(
  {
    title: { type: String },
    publication: { type: String },
    date: { type: String },
    description: { type: String },
  },
  { _id: false }
);

const similarProfileSchema = new Schema(
  {
    url: { type: String },
    name: { type: String },
    title: { type: String },
    url_text: { type: String },
  },
  { _id: false }
);

const bioLinkSchema = new Schema(
  {
    title: { type: String },
    link: { type: String },
  },
  { _id: false }
);

const inputSchema = new Schema(
  {
    url: { type: String },
  },
  { _id: false }
);

// Main Personality schema for BrightData
const personalityBrightDataSchema = new Schema(
  {
    id: { type: String },
    name: { type: String },
    city: { type: String },
    country_code: { type: String },
    position: { type: String },
    about: { type: String },
    current_company: { type: currentCompanySchema },
    experience: [experienceSchema],
    url: { type: String },
    people_also_viewed: [peopleAlsoViewedSchema],
    educations_details: { type: String },
    education: [educationSchema],
    avatar: { type: String },
    certifications: [certificationSchema],
    followers: { type: Number },
    connections: { type: Number },
    current_company_company_id: { type: String },
    current_company_name: { type: String },
    publications: [publicationSchema],
    location: { type: String },
    input_url: { type: String },
    linkedin_id: { type: String },
    linkedin_num_id: { type: String },
    banner_image: { type: String },
    honors_and_awards: [honorsAndAwardSchema],
    similar_profiles: [similarProfileSchema],
    default_avatar: { type: Boolean },
    memorialized_account: { type: Boolean },
    bio_links: [bioLinkSchema],
    first_name: { type: String },
    last_name: { type: String },
    timestamp: { type: String },
    input: { type: inputSchema },
  },
  {
    timestamps: true,
  }
);

export const Personality = model("Personality", personalityBrightDataSchema);
