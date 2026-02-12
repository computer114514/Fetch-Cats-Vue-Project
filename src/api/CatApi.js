import request from "@/request/RequestSender.js";

//捕获接口
export const catchCatApi = () => request.get("https://api.thecatapi.com/v1/images/search");
//post代表获取新资源，每次都会重新获取
export const saveCatApi = (url, id, name) =>
  request.post("/api/cat/save", {
    imageUrl: url,
    catId: id,
    name: name,
  });
//保存接口
export const getCatApi = () => request.get("/api/cat/get");
//查看接口
export const delCatApi = (catId) => request.delete(`/api/cat/del/${catId}`);
//删除接口

//修改接口
