import { sendBrightDataRequest } from "./service/brightdata.js";
import { BrightDataResponse } from "./types/brightdata.js";

export const scrapeLinkedinProfile = async (linkedinUrl: string) => {
  return await sendBrightDataRequest(linkedinUrl);
};

export const analyzeLinkedinProfile = async (
  brightdataResponse: BrightDataResponse
) => {
  // call ai agent here to generate report
  return "analysis";
};
