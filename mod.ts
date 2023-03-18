import { Plugin } from "https://deno.land/x/esbuild@v0.17.11/mod.js";
import { posix } from "https://deno.land/std@0.174.0/path/mod.ts";
import sass from "https://deno.land/x/denosass@1.0.6/mod.ts";

const defaultNamespace = "esbuild-plugin-sass-deno";
const entryNamespace = defaultNamespace + "-entry";

const loadSass = async function (path: string) {
  const text = await Deno.readTextFile(path);

  return sass(text, {
    load_paths: [posix.dirname(path)],
  }).to_string("compressed").toString();
};

const sassPlugin = (): Plugin => ({
  name: "esbuild-plugin-sass-deno",
  setup: (build) => {
    build.onResolve({ filter: /\.scss$/ }, (args) => {
      if (args.kind === "entry-point") {
        return {
          path: args.path,
          namespace: entryNamespace,
        };
      } else {
        return {
          path: args.path,
          namespace: defaultNamespace,
        };
      }
    });

    build.onLoad(
      { filter: /.*/, namespace: defaultNamespace },
      async (args) => {
        const cssContent = await loadSass(posix.resolve(args.path));
        return {
          contents: cssContent,
          loader: "css",
        };
      },
    );

    build.onLoad(
      { filter: /.*/, namespace: entryNamespace },
      async (args) => {
        const cssContent = await loadSass(posix.resolve(args.path));
        return {
          contents: cssContent,
          loader: "text",
        };
      },
    );
  },
});

export default sassPlugin;
