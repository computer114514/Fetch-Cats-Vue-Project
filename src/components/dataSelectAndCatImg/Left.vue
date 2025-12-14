<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <h1>状 态 栏</h1>
      </el-header>
      <el-main>
          <p >id:{{ currentCat.id }}</p>
          <p>地址:<a :href="currentCat.url">选取猫猫后戳此获取图片原链接</a></p>
          <p>昵称:{{ currentCat.name }}</p>
          <p>编号:{{ currentCat.no }}</p>
          <p>年龄:{{ currentCat.age }}</p>
          <p>好感:{{ currentCat.good}}</p>
          <p>好感评级:{{ currentCat.goodLevel }}</p>
          <p>摸摸次数:{{ currentCat.momoCount }}</p>
          <p>散步次数:{{ currentCat.walkCount }}</p>
          <div >114514<br>1919810</div>
          <p>{{ currentCat }}</p>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="js" setup>
defineProps(["currentCat"])
  // console.log("currentCat",props.currentCat)
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
