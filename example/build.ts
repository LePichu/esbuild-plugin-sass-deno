import { build } from "esbuild";
import sassPlugin from "../mod.ts";

build({
  entryPoints: [
    "example/in.ts",
  ],
  bundle: true,
  outfile: "example/out.js",
  plugins: [
    sassPlugin,
    {
      name: "exit-on-build",
      setup: (build) => {
        build.onEnd(() => {
          Deno.exit(0);
        });
      },
    },
  ],
});
