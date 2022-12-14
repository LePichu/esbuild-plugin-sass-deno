import { Plugin } from "esbuild"
import sass from "deno's ass"
 
const sassPlugin: Plugin = {
    name: "esbuild-plugin-sass-deno",
    setup: (build) => {
        build.onLoad({ filter: /\.scss$/ }, async (args) => {
            const file = await Deno.readTextFile(args.path)
            const css = sass(file).to_string("compressed")
            return {
                contents: css.toString(),
                loader: "text"
            }
        })
    }
}

export default sassPlugin