import { Plugin } from "https://deno.land/x/esbuild@v0.17.11/mod.js";
import { posix } from "https://deno.land/std@0.174.0/path/mod.ts";
import sass from "https://deno.land/x/denosass@1.0.6/mod.ts";

const sassPlugin: Plugin = {
  name: "esbuild-plugin-sass-deno",
  setup: (build) => {
    build.onLoad({ filter: /\.scss$/ }, async (args) => {
      const file = await Deno.readTextFile(args.path);
      const css = sass(file, {
        load_paths: [posix.dirname(args.path)],
      }).to_string("compressed");
      return {
        contents: css.toString(),
        loader: "text",
      };
    });
  },
};

export default sassPlugin;
