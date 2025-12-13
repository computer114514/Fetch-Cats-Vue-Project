<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <h1>状 态 栏</h1>
      </el-header>
      <el-main>
        <p>昵称:</p>
        <p>年龄:</p>
        <p>好感:</p>
        <p>好感评级:</p>
        <p>摸摸次数:</p>
        <p>散步次数:</p>
        <div >114514<br>1919810</div>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="js" setup>

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
          font-size: 20px;
          color:#666666;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          border:4px solid skyblue;
          height: 100%;
          border-top:0;
            p{
              margin-left:20px;
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

  }

</style>
