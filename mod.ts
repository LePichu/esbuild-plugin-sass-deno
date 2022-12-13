import { Plugin } from "esbuild"
import sass from "deno's ass"
import { Language, minify } from "minifier"
 
const sassPlugin: Plugin = {
    name: "esbuild-plugin-sass-deno",
    setup: (build) => {
        build.onLoad({ filter: /\.scss$/ }, async (args) => {
            const file = await Deno.readTextFile(args.path)
            const css = sass(file).to_string("expanded")
            return {
                contents: minify(Language.CSS, css.toString()),
                loader: "text"
            }
        })
    }
}

export default sassPlugin