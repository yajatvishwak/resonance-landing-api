import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import routes from "./routes";
import { connectToDatabase } from "./database";
import { Signup } from "./models/Signup";
import { processBrightdataLogic } from "./controller";
import { BrightDataResponse } from "./types/brightdata";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

interface Env {
  BREVO_API_KEY: string;
}

interface BrightDataSnapshot {
  snapshot_id: string;
  status: string;
  dataset_id: string;
}

// Startup service to check and process incomplete snapshots
async function checkAndProcessIncompleteSnapshots() {
  try {
    console.log("🔍 Checking for incomplete snapshots...");

    // Get all processed snapshots from BrightData API
    const processedSnapshots = await getProcessedSnapshots();
    console.log(`📊 Found ${processedSnapshots.length} processed snapshots`);

    // Find signups with incomplete status but have snapshot_id
    const incompleteSignups = await Signup.find({
      isCompleted: false,
      snapshot_id: { $exists: true, $ne: null },
    });

    console.log(
      `📋 Found ${incompleteSignups.length} incomplete signups with snapshot IDs`
    );

    // Check which incomplete signups have processed snapshots
    for (const signup of incompleteSignups) {
      const isProcessed = processedSnapshots.some(
        (snapshot: any) => snapshot.id === signup.snapshot_id
      );

      if (isProcessed && signup.snapshot_id) {
        console.log(
          `🔄 Processing snapshot ${signup.snapshot_id} for user ${signup.userEmail}`
        );
        processSnapshotData(signup.snapshot_id);
      } else {
        console.log(
          `⏳ Snapshot ${signup.snapshot_id} not ready yet for user ${signup.userEmail}`
        );
      }
    }

    console.log("✅ Startup snapshot check completed");
  } catch (error) {
    console.error("❌ Error in startup service:", error);
  }
}

// Get all processed snapshots from BrightData API
async function getProcessedSnapshots(): Promise<any> {
  try {
    const response = await axios.get(
      "https://api.brightdata.com/datasets/v3/snapshots?dataset_id=gd_l1viktl72bvl7bjuj0&status=ready",
      {
        headers: {
          Authorization:
            "Bearer e92fe48fc2c8ff0462558ffa45cfac0ee4aceae372255a4d961ea1728fd357c3",
        },
      }
    );

    return response.data || [];
  } catch (error) {
    console.error("Failed to fetch processed snapshots:", error);
    return [];
  }
}

// Fetch snapshot data and process it
async function processSnapshotData(snapshotId: string) {
  try {
    const response = await axios.get(
      `https://api.brightdata.com/datasets/v3/snapshot/${snapshotId}?format=json`,
      {
        headers: {
          Authorization:
            "Bearer e92fe48fc2c8ff0462558ffa45cfac0ee4aceae372255a4d961ea1728fd357c3",
        },
      }
    );

    if (response.data && response.data.length > 0) {
      const data: BrightDataResponse = response.data[0];
      const result = await processBrightdataLogic(data);

      if (result.success) {
        console.log(`✅ Successfully processed snapshot ${snapshotId}`);
      } else {
        console.error(
          `❌ Failed to process snapshot ${snapshotId}: ${result.error}`
        );
      }
    } else {
      console.log(`⚠️ No data found for snapshot ${snapshotId}`);
    }
  } catch (error) {
    console.error(`❌ Failed to process snapshot ${snapshotId}:`, error);
  }
}

const app = new Hono<{ Bindings: Env }>();
app.use(logger());
app.use(cors());

app.get("/", (c) => {
  return c.text("Resonance Server says hello!");
});

// Mount the routes
app.route("/", routes);

async function startServer() {
  await connectToDatabase();

  // Run startup service to check for incomplete snapshots
  await checkAndProcessIncompleteSnapshots();

  serve(
    {
      fetch: app.fetch,
      port: 4000,
    },
    (info) => {
      console.log(`Server is running on http://localhost:${info.port}`);
    }
  );
}

startServer();
