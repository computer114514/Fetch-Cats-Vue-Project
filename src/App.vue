<template>
  <div class="bigbox">
    <div class="header">
    <CatImgStore :isFetch="isFetch" :list="list" :isfix="isfix" @Fetch="Fetch"
     @noFetch="noFetch" @saveDom="saveDom" @CurrentCat="CurrentCat" @delList="delList" :currentCat="currentCat">
    </CatImgStore>
    </div>
    <div class="left">
    <left :currentCat="currentCat"></left>
    </div>
    <div class="main">
    <fetchCat2 @CatList="updateCatList" v-if="isFetch" :currentCat="currentCat"
    @changeCurrentName="changeCurrentName" @changeCurrentNo="changeCurrentNo"></fetchCat2>
    <fetchCat2Copy :currentCat="currentCat" v-if="!isFetch"></fetchCat2Copy>
    </div>
    <div class="right">
    <Right></Right>
    </div>
    <!-- <test></test> -->
  </div>



</template>

<script setup>

import{nextTick}from "vue";
    // import {fetchCat} from "./components/fetchCat.vue"
    //经典错误
    //{}是export多个，因此要{}包裹，fetchCat整个组件是默认导出
    import fetchCat2 from "./components/dataSelectAndCatImg/fetchCat2.vue"
    import fetchCat2Copy from './components/dataSelectAndCatImg/fetchCat2Copy.vue';
    import {ref} from "vue"
    import CatImgStore from "./components/dataSelectAndCatImg/CatImgStore.vue";
    import Left from "./components/dataSelectAndCatImg/Left.vue";
    import Right from "./components/dataSelectAndCatImg/Right.vue";
    // import test from "./components/dataSelectAndCatImg/test.vue";
    //喂喂喂，github先生，能看到这行字吗，能的话你就很棒咯
    const isFetch=ref(true)
    const list=ref([])
    let dom=ref(null)
    const isfix=ref(false);
    let currentCat=ref({})
    function updateCatList(Data){
        console.log("更新CatList",Data)
        list.value=list.value.filter(item=>item!==Data)
        list.value.push(Data)
        fun()
    }
    function saveDom(m){
        dom.value=m;
        console.log("dom",m)
    }
    async function fun(){
            await nextTick();
            const height=dom.value.offsetHeight;
            isfix.value=height>165;
    }
    function CurrentCat(m){
        currentCat.value=m;
        console.log("currentCat",currentCat.value)
    }
    function changeCurrentName(m){
      console.log("修改了名字")
      currentCat.value.name=m;
    }
    function changeCurrentNo(m){
      console.log("修改了no")
      currentCat.value.no=m;
    }
    function Fetch(){
      currentCat.value="";
        isFetch.value=true;
    }
    function noFetch(){
        isFetch.value=false;
    }
    function delList(url){
        console.log("删除了",url)
        list.value=list.value.filter(item=>item.url!==url)
        //这里出现了问题，必须要赋值到list.value才可以
    }

</script>

<style scoped>
        *{
          padding: 0;
          margin:0;
          box-sizing: border-box;
        }
        .bigbox{
            width: 100%;
            height:100%;
            overflow: hidden;
            /* border-radius:5%; */
            padding:10px;
            display:grid;
            grid-template-columns:400px 1fr 200px;
            grid-template-rows: 120px 1fr;
            gap:15px;
        }
        .header{
            grid-column-start: 1;
            grid-column-end:4;
            width:100%;
            /* background-color: aqua; */
        }
        .left{

          height:auto;
          background-color: skyblue;
        }
        .right{
          height:auto;
          background-color: bisque;
        }

        .main{
          height:auto;
          /* background-color: greenyellow; */
        }
</style>
