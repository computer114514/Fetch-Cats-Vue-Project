<template>
  <div class="avatar">
    <el-dropdown placement="top-start" trigger="click">
      <!--
        关键点：
        1. active-shadow 类：控制是否有阴影
        2. transition-all duration-300：让阴影变化有过渡
        3. @mousedown: 鼠标按下时添加阴影
        4. @mouseup / @mouseleave: 鼠标松开或移开时移除阴影
      -->
      <div style="display: flex; cursor: pointer">
        <el-avatar
          size="large"
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
          class="cursor-pointer transition-all duration-300 ease-in-out"
          style="margin: 0 10px"
        />
        <h1>ethan</h1>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @Click="JumpToQueryUser">好友搜索</el-dropdown-item>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import router from "@/router";
//===============状态管理==============

//===============api调用==============

//===============事件处理==============

/**
 * 跳转到用户搜索页面
 */
const JumpToQueryUser = () => {
  router.push("/queryUser");
};
</script>

<style scoped>
.avatar {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 如果你没用 Tailwind，记得给 el-avatar 加上基础过渡 */
/*
:deep(.el-avatar) {
  transition: box-shadow 0.3s ease, filter 0.3s ease;
}
*/
</style>
