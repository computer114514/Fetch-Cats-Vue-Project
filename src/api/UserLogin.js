import request from "@/request/RequestSender";

export const userLogin = async (username, password) => {
  const LoginFormDTO = {
    username,
    password,
  };
  const loginResult = await request.post("/api/user/login", LoginFormDTO);
  localStorage.setItem("token", loginResult.token);
};
