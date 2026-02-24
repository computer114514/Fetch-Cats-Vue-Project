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
    <i class="iconfont icon-shanchu" @click="delOneList(item.catId)"></i>
  </span>
</template>

<script lang="js" setup>
import { ref } from "vue";
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
</style>
