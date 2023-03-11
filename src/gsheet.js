import { StringWithGraph } from "@graphorigami/origami";
import { google } from "googleapis";
import path from "path";
import { fileURLToPath } from "url";
const sheets = google.sheets("v4");

const dirname = path.dirname(fileURLToPath(import.meta.url));
const keyFile = path.join(dirname, "credentials.json");
const scopes = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

// Create a service account initialize with the service account key file and scope needed
const auth = new google.auth.GoogleAuth({
  keyFile,
  scopes,
});

export default async function sheet(spreadsheetId, range = "Data") {
  const request = { spreadsheetId, range, auth };
  let data;
  try {
    const response = (await sheets.spreadsheets.values.get(request)).data;
    data = response.values;
  } catch (err) {
    console.error(err);
    return undefined;
  }

  const text = JSON.stringify(data, null, 2);
  const result = new StringWithGraph(text, data);
  return result;
}
