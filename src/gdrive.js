import GoogleDriveGraph from "./GoogleDriveGraph.js";

export default function gdrive(folderId) {
  return new GoogleDriveGraph(folderId);
}
