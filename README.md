This project demonstrates using [Web Origami](https://weborigami.org) to create a simple "About Us" area for a hypothetical team.

## Running this tutorial locally

- Clone this repository to your local machine.
- `npm install`
- `npm run start` to start a local Origami server. This will display a URL you can open in your browser to view the site.

If you'd like to understand how the project's `start` and `build` commands, see the documentation for these [standard Origami incantations](https://weborigami.org/cli/incantations.html).

## Site construction

The site is defined in [src/site.ori](./src/site.ori), which defines the resources available in the site. Some of these resources are copies of files (e.g., in the `src/assets` and `src/images` folders).

Other resources are generated on demand from the data in the [src/teamData.yaml](./src/teamData.yaml) data file. The generate resources include an `index.html` home page listing all the team members, and a `team/` area with a page for each team member.

To demonstrate how to call JavaScript from Origami, the site generates thumbnail images using a local JavaScript file. Origami itself includes [built-in functions for working with images](https://weborigami.org/builtins/origami/image) which could be used instead.
