import {
  FilesGraph,
  FileTreeTransform,
  InvokeFunctionsTransform,
  MapExtensionsGraph,
  MapInnerKeysGraph,
  MapValuesGraph,
  ObjectGraph,
} from "@graphorigami/origami";
import path from "node:path";
import { fileURLToPath } from "node:url";
import thumbnail from "./thumbnail.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const files = new (FileTreeTransform(FilesGraph))(dirname);

const assets = await files.get("assets");
const images = await files.get("images");
const indexTemplate = await files.get("index.ori");
const indexTemplateFn = indexTemplate.toFunction();
const personTemplate = await files.get("person.ori");
const teamData = await files.get("teamData.yaml");

const thumbnails = new MapValuesGraph(images, thumbnail);
const teamByName = new MapInnerKeysGraph(teamData, (value) =>
  value.get("name")
);
const team = new MapExtensionsGraph(teamByName, personTemplate, {
  extension: "->html",
});

const graph = new (FileTreeTransform(InvokeFunctionsTransform(ObjectGraph)))({
  public: {
    assets,
    images,
    "index.html": indexTemplateFn,
    team,
    thumbnails,
  },
  title: "Our Amazing Team",
});

export default graph;
