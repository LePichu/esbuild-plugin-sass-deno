# ESBuild Plugin SASS (Deno)

Made for the poor souls trying to use SASS/SCSS on Deno using ESBuild as bundler
who did not know `esbuild-sass-plugin` was not compatible with Deno due to
Dart-SASS being a pain.

## Usage

See `example` directory for details.

- Exporting as a single CSS file
  ```ts
  import * as esbuild from "https://deno.land/x/esbuild/mod.ts";
  import sassPlugin from "https://deno.land/x/esbuild_plugin_sass_deno/mod.ts";

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
  ```
- Inject style with JavaScript
  ```ts
  import * as esbuild from "https://deno.land/x/esbuild/mod.ts";
  import sassPlugin from "https://deno.land/x/esbuild_plugin_sass_deno/mod.ts";

  await esbuild.build({
    entryPoints: [
      "example/injectCss.ts"
    ],
    bundle: true,
    outdir: "example",
    plugins: [
      sassPlugin({
        loader: "text"
      })
    ],
  });

  esbuild.stop();
  ```
  with `injectCss.ts`:
  ```ts
  import styles from "./styles.scss";

  document.getElementsByTagName("head")[0].innerHTML +=
    `<style>${styles}</style>`;
  ```

## License

`esbuild-plugin-sass-deno` is licensed under MIT License, see
[LICENSE](./LICENSE) for more information.
