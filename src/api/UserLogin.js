import request from "@/request/RequestSender";
import { UseAuthStore } from "@/stores/auth";
export const userLogin = async (username, password) => {
  const LoginFormDTO = {
    username,
    password,
  };
  const authStore = UseAuthStore();

  const loginResult = await request.post("/api/user/login", LoginFormDTO);
  localStorage.setItem("token", loginResult.token);
  authStore.saveCurrentUser(loginResult);
};
export const sendCode = async (phone) => {
  const sendcode = await request.post("/api/user/sendCode", phone);
  return sendcode;
};
export const codeLogin = async (phone, code) => {
  const LoginFormDTO = {
    phone,
    code,
  };
  const loginResult = await request.post("/api/user/codeLogin", LoginFormDTO);
  const authStore = UseAuthStore();

  // const authStore = UseAuthStore();
  localStorage.setItem("token", loginResult.token);
  authStore.saveCurrentUser(loginResult);
};
