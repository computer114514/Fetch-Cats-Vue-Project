import { defineStore } from "pinia";
// import { Update } from "vite";
import { getCatApi, saveCatApi, delCatApi, updateCatApi, getCatByIdApi } from "../api/CatApi.js";
import { ElMessage } from "element-plus";

export const useCatsStore = defineStore("cats", {
  state: () => ({ list: [], currentCat: {}, chat: "欢 迎" }),
  // getters:{
  //   doubleCount:(state)=>state.count*2
  actions: {
    async saveCurrentCat(catId) {
      // this.currentCat = this.list.find(cat => cat.catId === catId);
      //你这样还不如去后端请求呢。
      //TODO 当前目标:开发根据id查询猫的接口
      this.currentCat = await this.getCatById(catId);
    },
    async getCatById(catId) {
      return await getCatByIdApi(catId);
    },
    async getCat() {
      this.list = await getCatApi();
    },
    async addCat(url, id, name) {
      await saveCatApi(url, id, name);
      await this.getCat();
    },
    async delCat(id) {
      await delCatApi(id);
      await this.getCat();
    },
    async updateCat(favorability, catId, petCount, walkCount, name) {
      const curCat = this.currentCat;
      const oldFavorability = curCat.favorability;
      curCat.favorability += favorability;
      try {
        await updateCatApi({
          catId: catId,
          name: name,
          favorability: favorability,
          petCount: petCount,
          walkCount: walkCount,
        });
        ElMessage.success("互动成功！");
      } catch (e) {
        curCat.favorability = oldFavorability;
        console.log("互动错误! 错误信息:", e);
      }
    },
    async pet(catId, name) {
      await this.updateCat(1, catId, 1, 0, name);
      this.chat = "喵喵喵~";
    },
    async hug(catId, name) {
      await this.updateCat(-1, catId, 0, 0, name);
      this.chat = "猫咪被举了起来,好像挺难受";
    },
    async walk(catId, name) {
      await this.updateCat(2, catId, 0, 1, name);
      this.chat = "猫咪去散了步,心情变好了";
    },
    async play(catId, name) {
      await this.updateCat(5, catId, 0, 0, name);
      this.chat = "猫咪和你玩耍,猫咪很欢乐";
    },
    async feed(catId, name) {
      await this.updateCat(10, catId, 0, 0, name);
      this.chat = "猫咪吃饱了,非常满意";
    },
  },
});
