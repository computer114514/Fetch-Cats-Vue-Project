<template>
  <span class="one">
    <img
      :src="item.imageUrl"
      alt="err"
      @click="
        () => {
          CurrentCat = item;
          saveCurrentCat(item);
        }
      "
    />
    <i
      class="iconfont icon-shanchu"
      @click="
        () => {
          updateVisability = true;
        }
      "
    ></i>
  </span>
  <el-dialog v-model="updateVisability" width="300">
    <div style="margin: 10px auto">
      <h2 style="text-align: center">确定删除?</h2>
    </div>
    <div class="button">
      <el-button @click="updateVisability = false"> 取消 </el-button>
      <el-button type="danger" @click="delOneList(item.catId)"> 删除 </el-button>
    </div>
  </el-dialog>
</template>

<script lang="js" setup>
import { ref } from "vue";
// import { linkEmits } from 'element-plus';
// import { useCatsStore } from "@/stores/cats";
// import { storeToRefs } from "pinia";
// const catsStore=useCatsStore();
// const {list}=storeToRefs(catsStore);
const updateVisability = ref(false);
defineProps(["item"]);
const emit = defineEmits(["delList", "save-current-cat"]);
const delOneList = (catId) => {
  emit("delList", catId);
};
const saveCurrentCat = (item) => {
  emit("save-current-cat", item);
};
const CurrentCat = ref(""); //当前猫的信息
</script>

<style scoped>
.one {
  /* span是行内块!!!!!!!!!!别想修改span的长宽，自然overflow也不行 */
  position: relative;
  display: inline-block;
  height: 60px;
  width: 160px;
  overflow: hidden;
  border: 2px solid #e3e5e7;
  margin: 10px 20px;
  border-radius: 5%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5%;
  }
}
.one i {
  /* display: inline-block; */
  position: absolute;
  top: 12px;
  right: 4px;
  opacity: 0;
  transition: opacity 0.1s ease-in;
}
.one:hover i {
  opacity: 1;
}
.one i:hover {
  color: red;
}
.el-dialog .button {
  display: flex;
  justify-content: space-around;
}
</style>
