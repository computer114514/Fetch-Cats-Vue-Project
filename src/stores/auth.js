import { defineStore } from "pinia";

export const UseAuthStore = defineStore("auth", {
  state: () => ({ token: localStorage.getItem("token") || "", currentUser: {} }),
  actions: {
    saveCurrentUser(currentUser) {
      this.currentUser = currentUser;
      console.log("current", currentUser);
    },
  },
  persist: {
    storage: localStorage, // 存在哪里
    key: "curUser", // 存的时候用的 key
  },
});
