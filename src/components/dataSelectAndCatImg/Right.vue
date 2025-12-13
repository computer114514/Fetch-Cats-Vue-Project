<template>
    <div class="common-layout">
    <el-container>
      <el-header>
        <h1>行  动</h1>
      </el-header>
      <el-main>
        <el-button size="large">摸摸</el-button>
        <el-button size="large">抱抱</el-button>
        <el-button size="large">散步</el-button>
        <el-button size="large">玩耍</el-button>
        <el-button size="large">喂食</el-button>
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

  }
</style>
