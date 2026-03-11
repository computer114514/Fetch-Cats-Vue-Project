import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./style.css";
import "element-plus/dist/index.css";

import pinia from "./stores/index.js";

createApp(App).use(pinia).use(router).mount("#app");
// createApp(App).use(pinia).mount("#app");
