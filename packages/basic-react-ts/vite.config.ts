import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import * as path from "path"
import SetEnvPlugin from "vite-plugin-set-env"

const resolveApp = (...p: string[]) => path.resolve(process.cwd(), ...p)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    SetEnvPlugin({
      envPrefix: "$",
      env: {
        development: {}
      },
      loadPath: []
    }),
    react({
      jsxImportSource: "@emotion/react"
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
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" }
  }
})
