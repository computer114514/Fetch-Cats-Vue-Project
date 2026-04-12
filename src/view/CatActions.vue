<template>
  <el-card>
    <div class="common-layout">
      <el-container>
        <el-header class="flex justify-center items-center text-3xl">
          <h1>行 动</h1>
        </el-header>
        <el-main>
          <i class="iconfont icon-zhengnengliang"></i
          ><el-button size="large" @click="pet">摸摸</el-button> <i class="iconfont icon-hug"></i
          ><el-button size="large" @click="hug">抱抱</el-button> <i class="iconfont icon-sanbu"></i
          ><el-button size="large" @click="walk">散步</el-button>
          <i class="iconfont icon-chongwutubiao05"></i
          ><el-button size="large" @click="play">玩耍</el-button>
          <i class="iconfont icon-weishiqimin"></i
          ><el-button size="large" @click="feed">喂食</el-button>
        </el-main>
      </el-container>
    </div>
  </el-card>

  <link rel="stylesheet" href="/public/图标/右侧/iconfont.css" />
</template>

<script lang="js" setup>
import { useCatsStore } from "@/stores/cats";
import { storeToRefs } from "pinia";
const catsStore = new useCatsStore();
let { currentCat } = storeToRefs(catsStore);
async function pet() {
  await catsStore.pet(currentCat.value.catId, currentCat.value.name);
}
async function hug() {
  await catsStore.hug(currentCat.value.catId, currentCat.value.name);
}
async function walk() {
  await catsStore.walk(currentCat.value.catId, currentCat.value.name);
}
async function play() {
  await catsStore.play(currentCat.value.catId, currentCat.value.name);
}
async function feed() {
  await catsStore.feed(currentCat.value.catId, currentCat.value.name);
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

.common-layout {
  height: 100%;
  .el-container {
    height: 100%;
    .el-main {
      font-size: 30px;
      color: #666666;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 100%;
      border-top: 0;
      i {
        justify-content: center;
        text-align: center;
      }
      .el-button {
        margin: 0 20px;
      }
      div {
        width: 300px;
        margin-top: auto;
        margin: 0 auto;
        border: 1px solid black;
        background-color: #fff5f8;
      }
    }
  }
  .el-button {
    padding: 10px;
    font-size: 25px;
  }
}
</style>
