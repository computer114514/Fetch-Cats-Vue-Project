<template>
<div class="bigbox">
    <div class="header">
    <Header></Header>
  </div>
  <div class="left">
    <left></left>
  </div>
  <div class="main">
    <Main></Main>
  </div>
  <div class="right">
    <Right></Right>
  </div>
</div>

</template>


<script setup>
  import Header   from './components/Header.vue';
  import Left from './components/Left.vue';
  import Right from './components/Right.vue';
  import Main from './components/Main.vue';
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
