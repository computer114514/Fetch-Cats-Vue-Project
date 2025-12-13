<template>
    <div class="bigbox">
        <div class="img"><img v-bind:src="CatStoreUrl" alt="error" class="cat-img"></div>
    </div>
</template>

<script lang="js" setup>
    // const props=
    defineProps(["CatStoreUrl"])
</script>



<style scoped>
    *{
        padding:0;
        margin:0;
    }

    .img{
        margin:20px 35px;
        width:950px;
        height:700px;
        overflow: hidden;
    }
    .bigbox{
        padding:10px;
        display:flex;
        flex-wrap: wrap;
        width:600px;
        height:700px;
        background-color: #F5F5F5;
        overflow: hidden;
    }
    .cat-img{
        width:100%;
        height:100%;
        object-fit: cover;
        border-radius: 10%;
        /* box-shadow:1px 1px 1px black; */
    }
</style>
