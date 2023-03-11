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

export default async function sheet() {
  // const authClient = await authorize();
  const request = {
    // The ID of the spreadsheet to retrieve data from.
    spreadsheetId: "1egYOAAqGgwcR9MH2jPWBzCmPnreDxIntJsCAurHGTiI",

    // The A1 notation of the values to retrieve.
    // range: "a1:d4",
    range: "Team",

    // // How values should be represented in the output.
    // // The default render option is ValueRenderOption.FORMATTED_VALUE.
    // valueRenderOption: "", // TODO: Update placeholder value.

    // // How dates, times, and durations should be represented in the output.
    // // This is ignored if value_render_option is
    // // FORMATTED_VALUE.
    // // The default dateTime render option is [DateTimeRenderOption.SERIAL_NUMBER].
    // dateTimeRenderOption: "", // TODO: Update placeholder value.

    // auth: authClient,
    auth,
  };

  try {
    const response = (await sheets.spreadsheets.values.get(request)).data;
    // TODO: Change code below to process the `response` object:
    // console.log(JSON.stringify(response, null, 2));
    return response.values;
  } catch (err) {
    console.error(err);
  }
}
