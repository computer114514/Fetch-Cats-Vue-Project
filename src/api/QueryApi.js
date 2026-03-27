import request from "@/request/RequestSender";
/**
 * 只是查询用户列表的功能罢了。
 */
export const queryUser = async (username, pageNum, pageSize) => {
  return request.get(
    `/api/user/queryUser?username=${username}&pageNum=${pageNum}&pageSize=${pageSize}`,
  );
};
/**
 * 通过userId查用户信息
 * @param {*} id
 * @returns
 */
export const queryUserById = async (id) => {
  return request.get(`/api/user/queryUserById?id=${id}`);
};
/**
 * 通过用户id查猫仓库
 * @param {*} id
 * @returns
 */
export const queryCatByUserId = async (id) => {
  return request.get(`/api/cat/queryCatByUserId?userId=${id}`);
};
export const queryInterCat = (targetId) => {
  return request.get(`/api/cat/queryInterCat?targetId=${targetId}`);
};
