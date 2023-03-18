import { Plugin } from "https://deno.land/x/esbuild@v0.17.11/mod.js";
import { posix } from "https://deno.land/std@0.174.0/path/mod.ts";
import sass from "https://deno.land/x/denosass@1.0.6/mod.ts";

interface Option {
  loader: "css"| "text"
}

const loadSass = async function (path: string) {
  const text = await Deno.readTextFile(path);

  return sass(text, {
    load_paths: [posix.dirname(path)],
  }).to_string("compressed").toString();
};

const sassPlugin = (option?: Option): Plugin => ({
  name: "esbuild-plugin-sass-deno",
  setup: (build) => {
    build.onLoad(
      { filter: /\.scss/ },
      async (args) => {
        const cssContent = await loadSass(posix.resolve(args.path));
        return {
          contents: cssContent,
          loader: option?.loader ?? "css",
        };
      },
    );
  },
});

export default sassPlugin;
