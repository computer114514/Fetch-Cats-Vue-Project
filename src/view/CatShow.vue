<template>
  <div class="bigbox">
    <div class="img">
      <img v-bind:src="catStore.currentCat.imageUrl" alt="error" class="cat-img" />
    </div>
  </div>
</template>

<script lang="js" setup>
// const props=
// defineProps(["currentCat"]);
import { useCatsStore } from "@/stores/cats";

const catStore = useCatsStore();
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

.img {
  margin: 20px 35px;
  width: 800px;
  height: 600px;
  overflow: hidden;
}
.bigbox {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  width: 800px;
  height: 600px;
  background-color: #f5f5f5;
  overflow: hidden;
}
.cat-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10%;
  /* box-shadow:1px 1px 1px black; */
}
</style>
