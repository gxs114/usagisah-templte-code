import { createApp } from "vue"
import { router } from "@router/router"
import App from "./App.vue"

import "@assets/css/reset.css"
import "@assets/css/tailwind.css"
import iconsPlugin from "./plugins/icons"
import "element-plus/theme-chalk/el-message.css"
import "element-plus/theme-chalk/el-loading.css"

const app = createApp(App)

app.use(router)
app.use(iconsPlugin)
app.mount("#app")
