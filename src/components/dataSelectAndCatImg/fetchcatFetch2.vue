<script lang="js" setup>
    import {ref,onMounted,defineEmits} from "vue"

    const loading=ref(true);
    const error=ref(null)
    const information=ref({})
    const emit=defineEmits(['CatList'])

    async function fetchData(){
        try{
            const res=await fetch("https://api.thecatapi.com/v1/images/search")
            //基本操作，抓取数据
            if(!res.ok){
                throw new Error ("网络不太对劲")
            }
            //边界判断：抓取失败
            // information.value.push(await res.json());
            information.value = await res.json()   // 把 JSON 塞进盒子,整个替换
            //因为await会阻塞async函数，获取到数据后才执行urlData的赋值
            console.log("test")
            const urlData=information.value[0]
            emit('CatList',urlData)
        }
        catch(e){
            error.value=e.message;
        }
        finally{
            loading.value=false;
        }
    }





// console.log(information.value[0].url)
//12.10下午的bug保留，你忽略了异步函数的原理，没有等挂载完后再读取，
// 连fetchData数据都没拿到，怎么读取？？？？？？？？


    onMounted(()=>{
        fetchData();
        //12.10下午第二个bug保留，这是一个异步函数，onMounted是组件挂载完成，不是数据获取完成！因为是异步！

    })
</script>

<template>
    <div v-if="loading" class="loading">loading</div>
    <p v-else-if="error">{{ error }}</p>
    <div v-else class="cat-container">
        <img :src="information[0].url"  alt="error" class="cat-img">
    </div>
</template>

<style scoped>
  *{
    padding:0;
    margin:0;
  }
    .loading{
        font-size: 60px;
        line-height: 570px;
        text-align: center;
    }
    .cat-container{
        width:100%;
        height:100%;
        overflow: hidden;
    }
    /* .cat-img{
        width:100%;
        height:auto;
        border-radius: 2%;
        box-shadow:1px 1px 1px black;
    } */
     /* 版本1:正常比例 */
    .cat-img{
        width:100%;
        height:100%;
        object-fit: cover;
        border-radius: 10%;
        /* box-shadow:1px 1px 1px black; */
    }
        /* 版本2：拉伸到大盒子 */
</style>
