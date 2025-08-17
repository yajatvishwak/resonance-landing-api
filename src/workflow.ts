import { sendBrightDataRequest } from "./service/brightdata";
import { BrightDataResponse } from "./types/brightdata";

export const scrapeLinkedinProfile = async (linkedinUrl: string) => {
  return await sendBrightDataRequest(linkedinUrl);
};

export const analyzeLinkedinProfile = async (
  brightdataResponse: BrightDataResponse
) => {
  // call ai agent here to generate report
  return "analysis";
};
