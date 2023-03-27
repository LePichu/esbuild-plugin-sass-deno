import { esbuild } from '../deps.ts';
import sassPlugin from "../mod.ts";

await esbuild.build({
  entryPoints: [
    "example/styles.scss"
  ],
  bundle: true,
  outdir: "example",
  plugins: [
    sassPlugin()
  ],
});

esbuild.stop();
