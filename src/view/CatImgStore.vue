<template>
  <div class="bigHeader">
    <div class="topButtons" style="display: flex; flex-direction: column">
      <el-button
        size="large"
        @click="Fetch"
        style="padding: 15px; font-size: large; margin-bottom: 10px"
      >
        捕获新猫猫
      </el-button>
      <!-- <el-button size="large" @click="Fetch()" style="padding: 15px; font-size: large">
        保存
      </el-button> -->
    </div>
    <div class="Cat-Selector" ref="CatSelector">
      <!-- <span v-for="item in list" :key="item.id" class="Cat-Selector-list">
        <img
          :src="item.imageUrl"
          alt="err"
          @click="
            () => {
              CurrentCat = item;
              noFetch();
            }
          "
        />
        <i class="iconfont icon-shanchu" @click="delList(item.catId)"></i>
      </span> -->
      <cat-item-show
        v-for="item in list"
        :key="item.id"
        :item="item"
        @save-current-cat="saveCurrentCat"
        @delList="delList"
        class="Cat-Selector-list"
        @Click="noFetch(item.catId)"
      ></cat-item-show>
    </div>
  </div>

  <link rel="stylesheet" href="/public/图标/删除/iconfont.css" />
</template>

<script lang="js" setup>
import { ElMessage } from "element-plus";
import { useCatsStore } from "@/stores/cats";
import CatItemShow from "@/components/CatItemShow.vue";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
// import { linkEmits } from 'element-plus';
// import { useCatsStore } from "@/stores/cats";
// import { storeToRefs } from "pinia";
// const catsStore=useCatsStore();
// const {list}=storeToRefs(catsStore);
const catsStore = useCatsStore();
const CatSelector = ref(null);
const { list, currentCat } = storeToRefs(catsStore);
const updateVisability = ref(false);

//这个和模版上同名的就是这个元素。
// const props=
defineProps(["isfix"]);
const emit = defineEmits([
  "save-dom",
  "save-current-cat",
  "fetch-confirm",
  "fetch-cancel",
  "delete-list",
]);

onMounted(() => {
  emit("save-dom", CatSelector.value);
});
function Fetch() {
  //在子组件中修改可不是什么明智的选择
  emit("fetch-confirm");
}

async function delList(catId) {
  //根据id删除猫
  // list.value = list.value.filter((item) => item.url !== url);
  currentCat.value = {};
  updateVisability.value = false;
  await catsStore.delCat(catId);
  ElMessage.success("id为 " + catId + " 的图片已删除");
  Fetch();
  //成功了，解决不跳转加个await就行了，原来是没有await删除函数，就往下fetch()，导致冲突就没有生效啊
  //为了避免奇奇怪怪的bug，最好都加上await
}
function noFetch(catId) {
  //在子组件中修改可不是什么明智的选择
  emit("fetch-cancel", catId);
}
function saveCurrentCat(item) {
  //保存当前选中的猫
  emit("save-current-cat", item);
}
//nexTick代表等dom元素更新完成之后

onMounted(async () => {
  await catsStore.getCat();
  //加了await就是同步，不加await就是异步，不会阻塞，导致提示同时弹出
  ElMessage.success("获取列表成功");
});
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
.el-button {
  margin: 0 10px;
}
.bigHeader {
  /* overflow-y: auto; */
  align-items: center;
  display: flex;
  width: 95%;
  height: 100%;
  background-color: #e3e5e7;
  border-radius: 10px;
  margin: 0 auto;
}
.Cat-Selector {
  overflow-y: auto;
  height: 100px;
  background-color: #f6f7f8;
  border: 3px solid grey;
  border-radius: 10px;
}
.fix {
  height: 165px;
}
.Cat-Selector-list {
  position: relative;
}
.Cat-Selector-list i {
  /* display: inline-block; */
  position: absolute;
  top: 12px;
  right: 4px;
  opacity: 0;
  transition: opacity 0.1s ease-in;
}
.Cat-Selector-list:hover i {
  opacity: 1;
}
.Cat-Selector-list i:hover {
  color: red;
}
</style>
