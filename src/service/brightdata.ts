import axios from "axios";

interface TriggerResponse {
  snapshot_id: string;
}

export const sendBrightDataRequest = async (linkedinUrl: string) => {
  const request = JSON.stringify([{ url: linkedinUrl }]);
  let webhookUrl = process.env.WEBHOOK_URL;
  if (!webhookUrl) {
    throw Error("WEBHOOK_URL is not set");
  }
  let encodedWebhookUrl = encodeURIComponent(webhookUrl);
  let url = `https://api.brightdata.com/datasets/v3/trigger?dataset_id=gd_l1viktl72bvl7bjuj0&endpoint=${encodedWebhookUrl}&format=json&uncompressed_webhook=true&include_errors=true`;
  console.log(url);
  const { data } = await axios
    .post<TriggerResponse>(url, request, {
      headers: {
        Authorization: `Bearer ${process.env.BRIGHTDATA_API_KEY}`,
        "Content-Type": "application/json",
      },
    })
    .catch((ex) => {
      console.error(ex);
      throw Error("Brightdata shat it self");
    });
  console.log(data);
  if (data.snapshot_id) {
    return data.snapshot_id;
  }
  throw Error("Bright Data completed but something shat");
};
