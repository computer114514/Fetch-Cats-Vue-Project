<template>
  <div class="bigbox">
    <div class="header">
    <CatImgStore :isFetch="isFetch" :list="list" :isfix="isfix" :currentCat="currentCat"
     @fetch-confirm="fetchConfirm" @store-local-cat="localStore"
     @fetch-cancel="fetchCancel" @save-dom="saveDom" @save-current-cat="saveCurrentCat" @delete-list="delList" >
    </CatImgStore>
    </div>
    <div class="left">
    <StatusTab :currentCat="currentCat" :chat="chat"></StatusTab>
    </div>
    <div class="main">
    <CatFetch  v-if="isFetch" :currentCat="currentCat"
    @merge-new-cat-status="updateCurrentList"
    @change-is-fetch="changeIsFetch" @save-new-cat="updateCatList"></CatFetch>
    <CatShow :currentCat="currentCat" v-if="!isFetch"></CatShow>
    </div>
    <div class="right">
    <CatActions @momo="momo" @play="play" @walk="walk" @feed="feed" @hug="hug"></CatActions>
    </div>
    <!-- <test></test> -->
  </div>



</template>

<script setup>

import{nextTick, onMounted}from "vue";
    // import {fetchCat} from "./components/fetchCat.vue"
    //经典错误
    //{}是export多个，因此要{}包裹，fetchCat整个组件是默认导出
    import CatFetch from "./components/dataSelectAndCatImg/CatFetch.vue"
    import CatShow from './components/dataSelectAndCatImg/CatShow.vue';
    import {ref} from "vue"
    import CatImgStore from "./components/dataSelectAndCatImg/CatImgStore.vue";
    import StatusTab from "./components/dataSelectAndCatImg/StatusTab.vue";
    import CatActions from "./components/dataSelectAndCatImg/CatActions.vue";
    // import test from "./components/dataSelectAndCatImg/test.vue";
    //喂喂喂，github先生，能看到这行字吗，能的话你就很棒咯
    function goodLevel(){
      if(0<currentCat.value.good&&currentCat.value.good<10){
          currentCat.value.goodLevel="认识你是谁"
        }
        else if(10<currentCat.value.good&&currentCat.value.good<20){
          currentCat.value.goodLevel="熟悉"
        }
        else{
          currentCat.value.goodLevel="超熟悉"
        }
    }
    const chat=ref("欢迎光临！")
    const isFetch=ref(true)
    const list=ref([])
    let dom=ref(null)
    const isfix=ref(false);
    let currentCat=ref({})
    function updateCatList(Data){
        console.log("更新CatList",Data)
        list.value=list.value.filter(item=>item!==Data)
        list.value.push(Data)
        currentCat.value = Data
        haveScroll()
    }
    function saveDom(m){
        dom.value=m;
        console.log("dom",m)
    }
    async function haveScroll(){
            await nextTick();
            const height=dom.value.offsetHeight;
            isfix.value=height>165;
    }
    function saveCurrentCat(m){
        currentCat.value=m;
        console.log("currentCat",currentCat.value)
    }
    function updateCurrentList(newData){
      currentCat.value={
        ...currentCat.value,
        ...newData
      }
      const index = list.value.findIndex(item => item.url === currentCat.value.url)
      list.value[index] = currentCat.value

    }
    function fetchConfirm(){
      currentCat.value={};
        isFetch.value=true;
    }
    function fetchCancel(){
        isFetch.value=false;
    }
    function delList(url){
        console.log("删除了",url)
        list.value=list.value.filter(item=>item.url!==url)
        //这里出现了问题，必须要赋值到list.value才可以
    }
    function changeIsFetch(value){
      isFetch.value=value;
    }
    function momo(){
      if(!isFetch.value){
      chat.value="Cat好像很开心呢!"
        currentCat.value.momoCount+=1;
        currentCat.value.good+=1;
        goodLevel();
      }
    }
    function hug(){

      if(!isFetch.value){
        chat.value="Cat被举了起来!"
        // currentCat.value.momoCount+=1;
        currentCat.value.good+=2;
        goodLevel();

      }
    }
    function walk(){
      if(!isFetch.value){
      chat.value="Cat四处溜达了一圈!"
        currentCat.value.walkCount+=1;
        currentCat.value.good+=5;
        goodLevel();
      }
    }
    function feed(){
      if(!isFetch.value){
      chat.value="Cat开动啦!"
        // currentCat.value.walkCount+=1;
        currentCat.value.good+=10;
        goodLevel();
      }
    }
        function play(){
      if(!isFetch.value){
          chat.value="Cat玩得很开心!"
        // currentCat.value.walkCount+=1;
        currentCat.value.good+=15;
        goodLevel();
      }
    }
    function localStore(){
      console.log("成功存储")
          localStorage.setItem("list",JSON.stringify(list.value))
    }
    onMounted(()=>{
      list.value=JSON.parse(localStorage.getItem("list"))||[]
    })
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
