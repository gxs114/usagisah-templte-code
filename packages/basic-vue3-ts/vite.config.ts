import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import DefineOptions from "unplugin-vue-define-options/vite"
import * as path from "path"
import SetEnvPlugin from "vite-plugin-set-env"

const resolveApp = (...p: string[]) => path.resolve(process.cwd(), ...p)

export default defineConfig({
  plugins: [
    vue({ reactivityTransform: true }),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    DefineOptions(),
    SetEnvPlugin({
      envPrefix: "$",
      env: {
        development: {
          a: "10"
        }
      },
      loadPath: []
    })
  ],
  resolve: {
    alias: {
      "@router": resolveApp("/src/router"),
      "@share": resolveApp("/src/share"),
      "@constants": resolveApp("/src/constants"),
      "@components": resolveApp("/src/components"),
      "@store": resolveApp("/src/store"),
      "@modules": resolveApp("/modules"),
      "@assets": resolveApp("/src/assets")
    }
  },
  css: {
    postcss: {
      plugins: [require("tailwindcss")]
    }
  }
})
