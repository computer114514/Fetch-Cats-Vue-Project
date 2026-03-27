import request from "@/request/RequestSender";

export const getRareCat = async () => {
  return await request.get("/api/rareCat/getRareCat");
};
export const getRareCatRemainTime = async () => {
  return await request.get("/api/rareCat/getRemainTime");
};
export const buyRareCat = async (curRareCatId) => {
  return await request.post("/api/rareCat/buyRareCat", { rareCatId: curRareCatId });
};
