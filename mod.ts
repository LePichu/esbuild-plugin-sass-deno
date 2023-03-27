import { esbuild } from "./deps.ts";
import { posix } from "./deps.ts";
import { sass } from "./deps.ts";

interface Option {
  loader: "css" | "text";
}

const loadSass = async function (path: string) {
  const text = await Deno.readTextFile(path);

  return sass(text, {
    load_paths: [posix.dirname(path)],
  }).to_string("compressed").toString();
};

const sassPlugin = (option?: Option): esbuild.Plugin => ({
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
