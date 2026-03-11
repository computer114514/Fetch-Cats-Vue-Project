<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <h1>状 态 栏</h1>
      </el-header>
      <el-main v-if="Object.keys(currentCat).length === 0">
        <p>点击仓库中的猫查看详情！</p>
      </el-main>
      <el-main v-else>
        <p>id:{{ currentCat.id }}</p>
        <p>地址:<a :href="currentCat.imageUrl" target="_blank">选取猫猫后戳此获取</a></p>
        <p>
          昵称:{{ currentCat.name }}
          <el-button
            class="changeName"
            type="success"
            @click="
              () => {
                updateVisability = true;
              }
            "
            >修改昵称</el-button
          >
        </p>
        <p>年龄:{{ currentCat.age }}</p>
        <p>好感:{{ currentCat.favorability }}</p>
        <p>好感评级:{{ currentCat.favorabilityLevel }}</p>
        <p>摸摸次数:{{ currentCat.petCount }}</p>
        <p>散步次数:{{ currentCat.walkCount }}</p>
        <p>捕获时间:<br />{{ currentCat.catchTime }}</p>
        <div>{{ chat }}</div>
      </el-main>
    </el-container>
  </div>
  <el-dialog v-model="updateVisability" title="改名" width="300">
    <el-form>
      <el-form-item label="输入新昵称" :label-width="formLabelWidth">
        <el-input v-model="newName" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="updateVisability = false">取消修改</el-button>
        <el-button type="primary" @click="confrim"> 确定修改 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="js" setup>
// console.log("currentCat",props.currentCat)
import { useCatsStore } from "@/stores/cats";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
import { ElMessage } from "element-plus";

const catsStore = new useCatsStore();
const updateVisability = ref(false);

let { currentCat, chat } = storeToRefs(catsStore);
let newName = ref(String(currentCat.value.name));

watch(currentCat, () => {
  console.log("新名字", currentCat.value.name);
  newName.value = currentCat.value.name;
});

//注意：store属性没有响应式！必须这样：storetoref

async function confrim() {
  // console.log("更新了数据",Data)
  currentCat.value.name = newName.value;
  updateVisability.value = false;
  await catsStore.unname(currentCat.value.catId, currentCat.value.name);
  newName.value = currentCat.value.name;
  ElMessage.success("修改成功");
  //await捕获异常，就不会往下执行代码了，直接到cath里面，但是服务器异常还是会抛出
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
.changeName {
  margin: 0 8px;
}
.common-layout {
  height: 100%;
  .el-container {
    height: 100%;
    .el-header {
      border: 4px solid skyblue;
      text-align: center;
      border-bottom: 4px dotted blue;
    }
    .el-main {
      font-size: 25px;
      color: #666666;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      border: 4px solid skyblue;
      height: 100%;
      border-top: 0;
      p {
        margin-left: 20px;
      }
      div {
        font-size: 20px;
        text-align: center;
        line-height: 75px;
        border-radius: 3%;
        width: 300px;
        height: 75px;
        margin-top: auto;
        margin: 0 auto;
        border: 1px solid black;
        background-color: #fff5f8;
      }
    }
  }
}
</style>
