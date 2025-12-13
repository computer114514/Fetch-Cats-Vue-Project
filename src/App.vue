<template>
<div class="bigbox">
    <div class="header">
    <CatImgStore :isFetch="isFetch" :list="list" :isfix="isfix" @Fetch="Fetch"
     @noFetch="noFetch" @saveDom="saveDom" @CatStoreUrl="CatStoreUrl" @delList="delList"></CatImgStore>
  </div>
  <div class="left">
    <left></left>
  </div>
  <div class="main">
    <fetchCat2 @CatList="updateCatList" v-if="isFetch"></fetchCat2>
    <fetchCat2Copy :CatStoreUrl="catstoreurl" v-if="!isFetch"></fetchCat2Copy>
  </div>
  <div class="right">
    <Right></Right>
  </div>
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
    //喂喂喂，github先生，能看到这行字吗，能的话你就很棒咯
    const isFetch=ref(true)
    const list=ref([])
    let dom=ref(null)
    const isfix=ref(false);
    let catstoreurl=ref("")
    function updateCatList(url){
        console.log("is list value????",list.value[0])
        list.value=list.value.filter(item=>item!==url)
        list.value.push(url)
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
    function CatStoreUrl(m){
        catstoreurl.value=m;
        console.log("CatStoreUrl Here",m)
    }
    function Fetch(){
        isFetch.value=true;
    }
    function noFetch(){
        isFetch.value=false;
    }
    function delList(url){
        console.log("删除了",url)
        list.value=list.value.filter(item=>item!==url)
        //这里出现了问题，必须要赋值到list.value才可以
    }
</script>

<style scoped>
        *{
          padding: 0;
          margin:0;
        }
        .bigbox{
            width: 100%;
            height:100%;
            overflow: hidden;
            border-radius:5%;
            padding:10px;
            display:grid;
            grid-template-columns:400px 1fr 200px;
            grid-template-rows: 80px 1fr;
            gap:15px;
        }
        .header{
            grid-column-start: 1;
            grid-column-end:4;
            width:100%;
            background-color: aqua;
        }
        .left{

          height:auto;
          background-color: blueviolet;
        }
        .right{
          height:auto;
          background-color: bisque;
        }

        .main{
          height:auto;
          background-color: greenyellow;

        }
</style>
