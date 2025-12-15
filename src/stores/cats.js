import {defineStore} from "pinia";
// import { Update } from "vite";

export const useCatsStore=defineStore("cats",{
  state:()=>(
    {list:JSON.parse(localStorage.getItem("list"))||[]}
  ),
  // getters:{
  //   doubleCount:(state)=>state.count*2
  // },
  actions:{
    update(data){
      this.list.push(data);
      console.log("cats里面的thisList",this.list)
    }
  }
})
console.log
