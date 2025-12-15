<template>
    <div class="bigbox">
        <div class="img">
          <CatFetchImg :key="count" @CatList="updateCatList1"></CatFetchImg>
        </div>
        <div class="buttons" @keydown="OneKey">
            <el-button type="primary" size="large" @click="updateIsNew" style="padding:20px;font-size:20px"> 随机小猫(→切换)</el-button>
            <el-button type="success" size="large" @click="updateCatList2" style="padding:20px;font-size:20px">这个不错(Enter添加)</el-button>
        </div>
    </div>

    <el-dialog v-model="dialogFormVisible" title="信息登记" width="300">
    <el-form >
      <el-form-item label="输入昵称" :label-width="formLabelWidth">
        <el-input v-model="currentName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="输入编号" :label-width="formLabelWidth">
        <el-input v-model="currentNo" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消登记</el-button>
        <el-button type="primary" @click="confirm">
           确定登记
        </el-button>
      </div>
    </template>
  </el-dialog>

</template>

<script lang="js" setup>

const dialogFormVisible = ref(false)
const formLabelWidth = '70px'

    const currentName=ref("");
    const currentNo=ref("");

    import {onMounted, ref,onUnmounted} from "vue"
    import CatFetchImg from "./CatFetchImg.vue"

    const emit=defineEmits(["save-new-cat","merge-new-cat-status","change-is-fetch"])
    defineProps(["currentCat"])
  // const dialogFormVisible=ref(false);
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
        // console.log("更新了数据",Data)
        urlData.value=Data;
    }

    function updateCatList2(){
        dialogFormVisible.value=true;
    }
    function confirm(){
      emit("save-new-cat",urlData.value)
      const updateData={
        name:currentName.value,
        no:currentNo.value
      }
      emit("change-is-fetch",false)
      emit("merge-new-cat-status",updateData)
      dialogFormVisible.value = false;
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
      /* margin-top:710px; */
      margin-top:50px;
      display: flex;
      justify-content: space-around;
    }
    /* .el-button{
        margin:0 230px;
    } */
</style>
