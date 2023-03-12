import { ExplorableGraph } from "@graphorigami/origami";
import * as googleApis from "googleapis";
import GoogleDriveGraph from "./GoogleDriveGraph.js";
import gsheet from "./gsheet.js";

const scopes = [
  "https://www.googleapis.com/auth/drive.readonly",
  "https://www.googleapis.com/auth/spreadsheets.readonly",
];

export default async function google(credentialsGraph) {
  const credentials = await ExplorableGraph.plain(credentialsGraph);
  const auth = new googleApis.google.auth.GoogleAuth({ credentials, scopes });
  return {
    drive(folderId) {
      return new GoogleDriveGraph(auth, folderId);
    },
    sheet(sheetId, range) {
      return gsheet(auth, sheetId, range);
    },
  };
}
