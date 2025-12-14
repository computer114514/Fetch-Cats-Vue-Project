<template>
    <div class="common-layout">
    <el-container>
      <el-header>
        <h1>行  动</h1>
      </el-header>
      <el-main>
        <el-button size="large" @click="momo">摸摸</el-button>
        <el-button size="large" @click="hug">抱抱</el-button>
        <el-button size="large" @click="walk">散步</el-button>
        <el-button size="large" @click="play">玩耍</el-button>
        <el-button size="large" @click="feed">喂食</el-button>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="js" setup>
  // import {ref} from "vue"
  const emit=defineEmits(["momo","hug","walk","play","feed"])
  function momo(){
    emit("momo")
  }
    function hug(){
    emit("hug")
  }
    function walk(){
    emit("walk")
  }
    function play(){
    emit("play")
  }
    function feed(){
    emit("feed")
  }
</script>

<style scoped>
 *{
    padding:0;
    margin:0;
  }

  .common-layout{
    height: 100%;
    .el-container{
      height: 100%;
        .el-header{
            border:4px solid skyblue;
            text-align: center;
            border-bottom:4px dotted blue;
        }
        .el-main{
          font-size: 30px;
          color:#666666;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          border:4px solid skyblue;
          height: 100%;
          border-top:0;
            .el-button{
              margin:0 20px;
              margin-top:50px;
            }
            div{
              width:300px;
              margin-top:auto;
              margin:0 auto;
              border:1px solid black;
              background-color: #FFF5F8;
            }
        }
    }
    .el-button{
      padding:10px;
      font-size:25px;
    }
  }
</style>
