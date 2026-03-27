<template>
  <!-- 最外层容器，铺满整个页面 -->
  <el-container class="user-detail-container">
    <!-- 主要内容区域，宽度60-80% -->
    <el-main class="user-detail-main">
      <!-- 用户信息Header -->
      <div class="user-header">
        <el-avatar :src="userInfo.imageUrl" :size="80" />
        <h1 class="user-name">{{ userInfo.username }}</h1>
      </div>

      <!-- 标签页区域 -->
      <el-tabs v-model="activeTab" class="user-tabs">
        <el-tab-pane label="猫猫" name="cats">
          <!-- 猫猫列表 -->
          <div class="cats-list">
            <!-- 使用v-for遍历猫猫列表 -->
            <div v-for="cat in catsList" :key="cat.catId" class="cat-card">
              <el-card shadow="hover" class="cat-card-inner">
                <div class="cat-avatar">
                  <el-avatar :src="cat.imageUrl" :size="60" />
                </div>
                <div class="cat-info">
                  <h3 class="cat-name">{{ cat.name }}</h3>
                  <p class="cat-age">年龄：{{ cat.age }}岁</p>
                  <p class="cat-id">ID：{{ cat.catId }}</p>
                </div>
              </el-card>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="共同猫猫" name="interCats">
          <div class="cats-list">
            <!-- 使用v-for遍历共同猫猫列表 -->
            <div v-for="cat in interCats" :key="cat.catId" class="cat-card">
              <el-card shadow="hover" class="cat-card-inner">
                <div class="cat-avatar">
                  <el-avatar :src="cat.imageUrl" :size="60" />
                </div>
                <div class="cat-info">
                  <h3 class="cat-name">{{ cat.name }}</h3>
                  <p class="cat-age">年龄：{{ cat.age }}岁</p>
                  <p class="cat-id">ID：{{ cat.catId }}</p>
                </div>
              </el-card>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
// import { userView, queryCatsByUserId } from "./api";
import { queryCatByUserId, queryUserById, queryInterCat } from "@/api/QueryApi";
import { useRoute } from "vue-router";

//=======================状态管理=======================

//通过router获取属性。
const route = useRoute();
const id = route.query.id;
// 定义响应式数据
const userInfo = ref({
  id: "",
  username: "",
  imageUrl: "",
});
//共同的猫
const interCats = ref([]);

const catsList = ref([]);
const activeTab = ref("cats"); // 默认激活"共同猫猫"标签页

//=======================事件管理=======================

//=======================生命周期=======================

onMounted(async () => {
  // 获取用户信息
  const userResponse = await queryUserById(id);
  userInfo.value = userResponse;
  // 获取猫猫列表
  const catsResponse = await queryCatByUserId(id);
  catsList.value = catsResponse;
  //获取共同猫猫
  const interCatsResponse = await queryInterCat(id);
  interCats.value = interCatsResponse;
});
</script>

<style scoped>
/* 整体背景样式 */
.user-detail-container {
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7f1 100%);
  min-height: 100vh;
  padding: 20px 0;
}

/* 主要内容区域样式 */
.user-detail-main {
  width: 70%;
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  padding: 25px;
}

/* 用户信息Header样式 */
.user-header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ebeef5;
  margin-bottom: 20px;
}

.user-name {
  font-size: 24px;
  font-weight: 600;
  color: #303133;
}

/* 标签页样式 */
.user-tabs {
  :deep(.el-tabs__item) {
    font-size: 18px;
    font-weight: 500;
  }

  :deep(.el-tabs__active-bar) {
    background-color: #409eff;
  }
}

/* 猫猫列表样式 */
.cats-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.cat-card {
  transition: transform 0.3s ease;
}

.cat-card:hover {
  transform: translateY(-5px);
}

.cat-card-inner {
  border-radius: 10px;
  overflow: hidden;
}

.cat-avatar {
  display: flex;
  justify-content: center;
  padding: 15px 0;
}

.cat-info {
  padding: 0 15px 15px;
}

.cat-name {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 8px;
}

.cat-age {
  color: #606266;
  margin-bottom: 5px;
}

.cat-id {
  color: #909399;
  font-size: 14px;
}
</style>
