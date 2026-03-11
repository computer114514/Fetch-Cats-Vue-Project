<template>
  <div class="uiContainer">
    <div class="login-card">
      <form class="login-form" @submit.prevent="handleLogin">
        <h1>用户登录</h1>
        <div class="input-group">
          <input type="text" v-model="username" placeholder="请输入用户名" required />
        </div>
        <div class="input-group">
          <input type="password" v-model="password" placeholder="请输入密码" required />
        </div>
        <div>
          <button type="submit" class="login-btn">登录</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="js" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { userLogin } from "@/api/UserLogin";

const username = ref("");
const password = ref("");
const router = useRouter();

const handleLogin = async () => {
  // 模拟登录：保存 token 并跳转
  console.log("handleLogin");
  await userLogin(username.value, password.value);
  router.push("/cat");
};
</script>

<style scoped>
.uiContainer {
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-image: url("/dist/assets/04.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.login-card {
  position: absolute;
  right: 100px;
  width: 420px;
  padding: 40px 32px;
  border-radius: 20px;
  /* 毛玻璃效果（关键！） */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px); /* Safari 兼容 */
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  text-align: center;
}

.login-card h1 {
  margin-bottom: 16px;
  font-size: 28px;
  font-weight: 600;
  letter-spacing: 1px;
}

.login-form .input-group {
  margin-bottom: 30px;
}

.login-form input {
  width: 80%;
  padding: 14px 16px;
  border: none;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;
}

.login-form input:focus {
  box-shadow: 0 0 0 2px #409eff;
}

.login-btn {
  width: 60%;
  padding: 14px;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.3s;
}

.login-btn:hover {
  opacity: 0.9;
}

/* 响应式：小屏设备适配 */
@media (max-width: 480px) {
  .login-card {
    width: 90%;
    padding: 30px 20px;
  }
}
</style>
