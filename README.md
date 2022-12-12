# ESBuild Plugin SASS (Deno)
Made for the poor souls trying to use SASS/SCSS on Deno using ESBuild as bundler who did not know `esbuild-sass-plugin` was not compatible with Deno due to Dart-SASS being a pain.

## Usage
- Buildscript
```ts
import { build } from "https://deno.land/x/esbuild/mod.ts"
import sassPlugin from "https://deno.land/x/esbuild_plugin_sass_deno/mod.ts"

build({
    entryPoints: [
        "example/in.ts"
    ],
    bundle: true,
    outfile: "example/out.js",
    plugins: [sassPlugin()]
})
```
- Main Entrypoint File:
```ts
import styles from "./styles.scss"

document.getElementsByTagName('head')[0].innerHTML += `<style>${styles}</style>`
```

## License
`esbuild-plugin-sass-deno` is licensed under MIT License, see [LICENSE](./LICENSE) for more information.