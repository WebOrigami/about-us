import {
  ExplorableGraph,
  FilesGraph,
  MapExtensionsGraph,
  MapInnerKeysGraph,
  MapValuesGraph,
  ObjectGraph,
  OrigamiTemplate,
} from "@graphorigami/origami";
import path from "node:path";
import { fileURLToPath } from "node:url";
import thumbnail from "./thumbnail.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const files = new FilesGraph(dirname);

const assets = await files.get("assets");
const images = await files.get("images");
const indexTemplate = new OrigamiTemplate(await files.get("index.ori"));
const personTemplate = new OrigamiTemplate(await files.get("person.ori"));
const teamData = ExplorableGraph.fromYaml(await files.get("teamData.yaml"));

const title = "Our Amazing Team";
const indexHtml = indexTemplate.apply({ teamData, title });
const thumbnails = new MapValuesGraph(images, thumbnail);
const teamByName = new MapInnerKeysGraph(teamData, (value) =>
  value.get("name")
);
const team = new MapExtensionsGraph(
  teamByName,
  (person) => personTemplate.apply({ person, title }),
  {
    extension: "->html",
  }
);

export default new ObjectGraph({
  assets,
  images,
  "index.html": indexHtml,
  team,
  thumbnails,
});
