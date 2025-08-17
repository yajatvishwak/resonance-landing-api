import type { Context } from "hono";
import { z } from "zod";
import { Signup } from "./models/Signup";
import { analyzeLinkedinProfile, scrapeLinkedinProfile } from "./workflow";
import { BrightDataResponse } from "./types/brightdata";
import { sendEmail } from "./service/email";
import { Personality } from "./models/Personality";

const SignupSchema = z.object({
  userEmail: z.email(),
  requestedLinkedinUrl: z.string(),
});

type SignupSchema = z.infer<typeof SignupSchema>;

export async function signup(c: Context) {
  const { userEmail, requestedLinkedinUrl } = await c.req.json();

  const parsed = SignupSchema.safeParse({ userEmail, requestedLinkedinUrl });

  if (!parsed.success) {
    return c.json({ error: parsed.error.message }, 400);
  }
  const existingSignup = await Signup.findOne({ userEmail });
  if (existingSignup && existingSignup.snapshot_id) {
    return c.json({ error: "User already exists" }, 400);
  }
  // signup this guy
  const signup = await Signup.findOneAndUpdate(
    { userEmail },
    { userEmail, requestedLinkedinUrl },
    { upsert: true, new: true }
  );
  // send request to brightdata
  const snapshot_id = await scrapeLinkedinProfile(requestedLinkedinUrl);
  signup.snapshot_id = snapshot_id;
  await signup.save();
  // tell him to check for email
  return c.json({
    message: "Signup successful",
  });
}

// Extracted business logic for processing BrightData response
export async function processBrightdataLogic(
  data: BrightDataResponse
): Promise<{ success: boolean; error?: string }> {
  try {
    const signup = await Signup.findOne({
      requestedLinkedinUrl: data.input_url,
    });
    if (!signup) {
      return { success: false, error: "Signup not found" };
    }

    // Transform the data to match our schema and use spread operator
    const personalityData = {
      ...data,
    };

    await Personality.findOneAndUpdate(
      { linkedin_id: data.linkedin_id },
      personalityData,
      { upsert: true, new: true }
    );

    const analysis = await analyzeLinkedinProfile(data);
    sendEmail(signup.userEmail, analysis);
    signup.analysis = analysis;
    signup.isCompleted = true;
    await signup.save();

    return { success: true };
  } catch (error) {
    console.error("Error processing BrightData response:", error);
    return { success: false, error: "Internal processing error" };
  }
}

export async function processBrightdataResponse(c: Context) {
  const response: BrightDataResponse[] = await c.req.json();
  const data = response[0];

  const result = await processBrightdataLogic(data);

  if (!result.success) {
    return c.json(
      { error: result.error },
      result.error === "Signup not found" ? 404 : 500
    );
  }

  return c.json({ message: "k thnk u" });
}
