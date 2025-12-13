<template>
    <div class="bigbox">
        <div class="img">
          <fetchcatFetch2 :key="count" @CatList="updateCatList1"></fetchcatFetch2>
        </div>
        <div class="buttons" @keydown="OneKey">
            <el-button type="primary" size="large" @click="updateIsNew" > 随机小猫(→切换)</el-button>
            <el-button type="success" size="large" @click="updateCatList2">这个不错(Enter添加)</el-button>
        </div>
    </div>
</template>

<script lang="js" setup>
    import {onMounted, ref,onUnmounted} from "vue"
    import fetchcatFetch2 from "./fetchcatFetch2.vue"

    const emit=defineEmits(["CatList"])

    const count=ref(0)
    const urlData=ref("");

    function OneKey(e){
        if(e.key==="Enter"){
            updateCatList2()
        }
        if(e.key==="ArrowRight"){
            updateIsNew()
        }
    }
    onMounted(()=>{
        window.addEventListener("keydown",OneKey)
    })
    onUnmounted(()=>{
        window.removeEventListener("keydown",OneKey)
    })


    function updateIsNew(){
        count.value+=1;
    }

    function updateCatList1(Data){
        console.log("更新了数据")
        urlData.value=Data.url;
    }

    function updateCatList2(){
        emit("CatList",urlData.value)
    }
</script>



<style scoped>
    *{
        padding:0;
        margin:0;
    }
    .bigbox{
        padding:10px;
        display:flex;
        flex-direction: column;
        width:90%;
        height:100%;
        background-color: #F5F5F5;
    }
    .bigbox .img{
        margin:0 90px;
        width: 800px;
        height:600px;
    }

    .buttons{
      /* display:flex; */
      /* justify-content: space-around; */
      margin-top:710px;
    }
    /* .el-button{
        margin:0 230px;
    } */
</style>
