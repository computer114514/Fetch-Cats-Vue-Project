import {defineStore} from "pinia";

export const useCatsStore=defineStore("cats",{
  state:()=>({count:0}),
  getters:{
    doubleCount:(state)=>state.count*2
  },
  actions:{
    increment(){
      this.count++;
    }
  }
})
