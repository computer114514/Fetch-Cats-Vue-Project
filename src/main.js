import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./style.css";
import "element-plus/dist/index.css";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import pinia from "./stores/index.js";
pinia.use(piniaPluginPersistedstate);

createApp(App).use(pinia).use(router).mount("#app");
// createApp(App).use(pinia).mount("#app");
