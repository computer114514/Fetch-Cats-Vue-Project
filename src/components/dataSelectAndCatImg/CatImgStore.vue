<template>
    <div class="bigHeader">
        <div class="topButtons" style="display: flex;flex-direction: column;">
          <el-button size="large"  @click="Fetch" style="padding:15px;font-size:large;margin-bottom:10px;"> 捕获新猫猫 </el-button>
          <el-button size="large"  @click="Fetch();store()" style="padding:15px;font-size:large" > 保存 </el-button>
        </div>
        <div class="Cat-Selector" :class="{fix:isfix}" ref="CatSelector">
            <span v-for="item in list" :key="item.id" class="Cat-Selector-list">
                <img :src="item.url" alt="err" @click="()=>{CurrentCat=item;noFetch()}">
                <i class="iconfont icon-shanchu" @click="delList(item.url)"></i>
            </span>

        </div>
    </div>

    <link rel="stylesheet" href="/public/图标/删除/iconfont.css">
</template>

<script lang="js" setup>
    import {onMounted, ref,nextTick} from "vue"
// import { linkEmits } from 'element-plus';

    const CatSelector=ref(null)
    //这个和模版上同名的就是这个元素。
    // const props=
    defineProps(["isFetch","list","isfix"])
    const emit=defineEmits(["saveDom","CurrentCat","FetchBack","Fetch","noFetch","delList","store"])
    const CurrentCat=ref("")

    onMounted(()=>{
        emit("saveDom",CatSelector.value)

    })
    function Fetch(){

        //在子组件中修改可不是什么明智的选择
        emit("Fetch")
    }
    function noFetch(){
        //在子组件中修改可不是什么明智的选择
        emit("noFetch");
        emit("CurrentCat",CurrentCat.value)
    }
    function delList(e){
        emit("delList",e)
    }
    //nexTick代表等dom元素更新完成之后
    function store(){
        nextTick(()=>{
          emit("store")
        })
    }
</script>

<style scoped>
  *{
    padding:0;
    margin:0;
  }
    .el-button{
        margin:0 10px;
    }
    .bigHeader{
        /* overflow-y: auto; */
        align-items: center;
        display:flex;
        width:95%;
        height:100%;
        background-color: #E3E5E7;
        border-radius:10px;
        margin:0 auto;
    }
    .Cat-Selector{
        overflow-y: auto;
        height:100px;
        background-color: #F6F7F8;
        border:3px solid grey;
        border-radius:10px
    }
    .bigHeader .Cat-Selector span{

        /* span是行内块!!!!!!!!!!别想修改span的长宽，自然overflow也不行 */
        display: inline-block;
        height:60px;
        width:160px;
        overflow: hidden;
        border:2px solid #E3E5E7;
        margin:10px 20px;
        border-radius: 5%;
        img{
            width:100%;
            height:100%;
            object-fit: cover;
            border-radius: 5%;
        }
    }
    .fix{
        height:165px;
    }
    .Cat-Selector-list{
        height:auto;
        position: relative;
    }
    .Cat-Selector-list i{
        /* display: inline-block; */
        position: absolute;
        top:18px;
        right:4px;

        opacity: 0;
        transition:opacity  0.1s ease-in;
    }
    .Cat-Selector-list:hover i{
        opacity: 1;
    }
    .Cat-Selector-list i:hover{
        color:red;
    }

</style>
