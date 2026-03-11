import { defineStore } from "pinia";

export const UseAuthStore = defineStore("auth", {
  state: () => ({ token: localStorage.getItem("token") || "" }),
});
