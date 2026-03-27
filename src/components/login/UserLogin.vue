<template>
  <div class="uiContainer">
    <div class="login-card" v-if="isPasswordLogin">
      <form class="login-form" @submit.prevent="handleLogin">
        <h1>密码登录</h1>
        <div class="input-group">
          <input
            type="text"
            v-model="username"
            placeholder="请输入用户名"
            required
            pattern="^1[3-9]\d{9}$"
          />
        </div>
        <div class="input-group">
          <input
            type="password"
            v-model="password"
            placeholder="请输入密码"
            required
            pattern="^\d{6}$"
          />
        </div>
        <div>
          <button type="submit" class="login-btn loginBtn" @click="passwordLoginMethod">
            登录
          </button>
          <button type="button" class="login-btn phoneLoginBtn" @click="changeLoginMethod">
            手机号登录
          </button>
        </div>
      </form>
    </div>
    <div class="login-card" v-else>
      <form class="login-form" @submit.prevent="handleCodeLogin">
        <h1>手机号登录</h1>
        <div class="input-group">
          <input
            type="text"
            v-model="phone"
            placeholder="请输入手机号"
            required
            pattern="^1[3-9]\d{9}$"
            style="width: 45%"
          />

          <!-- ^1[3-9]\\d{9}$ -->
          <button
            type="button"
            class="login-btn phoneLoginBtn"
            @click="sendCodeMethod"
            style="width: 30%"
          >
            发送验证码
          </button>
        </div>

        <div class="input-group">
          <input
            type="password"
            v-model="code"
            placeholder="请输入验证码"
            required
            pattern="^\d{6}$"
          />
        </div>
        <div>
          <button type="submit" class="login-btn loginBtn" @click="codeLoginMethod">登录</button>
          <button type="button" class="login-btn phoneLoginBtn" @click="changeLoginMethod">
            密码登录
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="js" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { userLogin, codeLogin, sendCode } from "@/api/UserLogin";
// import { UseAuthStore } from "@/stores/auth";

const username = ref("");
const password = ref("");
const isPasswordLogin = ref(false);
const router = useRouter();
const phone = ref("");
const code = ref("");

const changeLoginMethod = () => {
  console.log("changeMethod");
  if (isPasswordLogin.value == true) {
    isPasswordLogin.value = false;
  } else {
    isPasswordLogin.value = true;
  }
};
const sendCodeMethod = async () => {
  console.log("sendcoding..", phone.value, code.value);
  await sendCode(phone.value);
};

const passwordLoginMethod = async () => {
  // 模拟登录：保存 token 并跳转
  await userLogin(username.value, password.value);

  router.push("/cat");
};

const codeLoginMethod = async () => {
  // 模拟登录：保存 token 并跳转
  await codeLogin(phone.value, code.value);
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
  margin: 0 10px;
  width: 30%;
  padding: 14px;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.3s;
}
.phoneLoginBtn {
  background: linear-gradient(135deg, #07bbdb 0%, #2575fc 100%);
}
/* .code {
} */
.loginBtn {
  background: linear-gradient(135deg, #04ff9f 0%, #04ef04d3 100%);
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
