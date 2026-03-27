<template>
  <div class="search-container">
    <!-- 主体内容区域 -->
    <div class="main-content">
      <el-card class="search-card" shadow="always">
        <template #header>
          <div class="card-header">
            <el-icon><User /></el-icon>
            <span>用户搜索</span>
          </div>
        </template>

        <!-- 搜索区域 -->
        <div class="search-form">
          <el-input
            v-model="searchForm.username"
            placeholder="请输入用户名进行模糊搜索"
            clearable
            class="search-input"
            @keyup.enter="handleSearch"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
          <el-button type="primary" @click="handleSearch" :loading="loading">
            <el-icon><Search /></el-icon>
            搜索
          </el-button>
        </div>

        <!-- 用户列表 -->
        <div class="user-list" v-loading="loading">
          <div v-if="userList.length === 0 && hasSearched" class="empty-state">
            <el-empty description="未找到相关用户" />
          </div>

          <el-table
            v-else
            :data="userList"
            style="width: 100%; cursor: pointer"
            :header-cell-style="{ background: '#f5f7fa', color: '#606266' }"
          >
            <el-table-column
              prop="imageUrl"
              label="头像"
              width="100"
              @Click="jumpToUser"
              style="cursor: pointer"
            >
              <template #default="{ row }">
                <el-avatar :src="row.imageUrl || defaultAvatar" :size="50" fit="cover">
                  {{ row.username?.charAt(0) }}
                </el-avatar>
              </template>
            </el-table-column>

            <el-table-column
              prop="username"
              label="用户名"
              @Click="jumpToUser"
              style="cursor: pointer"
            >
              <template #default="{ row }">
                <span class="username-text">{{ row.username }}</span>
              </template>
            </el-table-column>

            <el-table-column fixed="right" label="操作" min-width="20" style="cursor: pointer">
              <template #default="{ row }">
                <el-button v-if="row.id != curUserId" @click="jumpToUser(row.id)"> 查看 </el-button>
                <p v-else>自己</p>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- 分页区域 -->
        <div class="pagination-container" v-if="total > 0">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[2, 5, 10, 20]"
            :total="total"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { Search, User } from "@element-plus/icons-vue";
// import { ElMessage } from "element-plus";
// 假设你的 API 请求工具
import { queryUser } from "@/api/QueryApi";
// import {} from "@/api/QueryApi";
// import { router } from "@/router/index";
import { useRouter } from "vue-router";
import { UseAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

// ==================== 状态管理 ====================
const loading = ref(false);
const hasSearched = ref(false);
const defaultAvatar = "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png";

const router = useRouter();

// 搜索表单
const searchForm = reactive({
  username: "",
});

// 分页配置
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);

// 用户列表
const userList = ref([]);

const authStore = UseAuthStore();
let { currentUser } = storeToRefs(authStore);
const curUserId = currentUser.value.id;

// ==================== API 调用 ====================
/**
 * 调用后端分页查询接口
 * 假设后端接口格式：/api/user/queryUserByName
 * 参数：username, pageNum, pageSize
 */
const fetchUserList = async () => {
  loading.value = true;

  const data = await queryUser(searchForm.username, currentPage.value, pageSize.value);

  // 根据实际后端返回结构调整
  // PageHelper 通常返回：{ code: 200, data: { list: [], total: 100 }, msg: 'success' }

  userList.value = data.data || [];
  total.value = data.total || 0;
  hasSearched.value = true;

  loading.value = false;
  console.log("curUserId=", currentUser);
  console.log("curUserIdvalue=", currentUser.value);
  console.log("curUserIdusername=", currentUser.value.username);
};

// ==================== 事件处理 ====================
const handleSearch = () => {
  currentPage.value = 1; // 搜索时重置到第一页
  fetchUserList();
};

const handleSizeChange = (val) => {
  pageSize.value = val;
  fetchUserList();
};

const handleCurrentChange = (val) => {
  currentPage.value = val;
  fetchUserList();
};
//跳转到用户展示页面。
const jumpToUser = (userId) => {
  router.push({
    path: "/userView",
    query: {
      id: userId,
    },
  });
};

// ==================== 生命周期 ====================
onMounted(() => {
  // 可选：页面加载时是否自动搜索
  fetchUserList();
});
</script>

<style scoped>
/* 背景铺满整个页面 */
.search-container {
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 20px;
  box-sizing: border-box;
}

/* 主体内容占 60-80% */
.main-content {
  width: 100%;
  max-width: 1200px;
  min-width: 800px;
  margin: 0 auto;
}

/* 搜索卡片 */
.search-card {
  border-radius: 12px;
  overflow: hidden;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.card-header .el-icon {
  font-size: 22px;
  color: #409eff;
}

/* 搜索表单区域 */
.search-form {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 8px;
}

.search-input {
  flex: 1;
  max-width: 500px;
}

.search-input :deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px #dcdfe6 inset;
  transition: all 0.3s;
}

.search-input :deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #c0c4cc inset;
}

.search-input :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #409eff inset;
}

/* 用户列表区域 */
.user-list {
  min-height: 300px;
  margin-bottom: 20px;
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}

.username-text {
  font-weight: 500;
  color: #303133;
}

/* 分页区域 */
.pagination-container {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  border-top: 1px solid #ebeef5;
}

/* 响应式适配 */
@media screen and (max-width: 1200px) {
  .main-content {
    max-width: 90%;
    min-width: auto;
  }
}

@media screen and (max-width: 768px) {
  .search-container {
    padding: 20px 10px;
  }

  .search-form {
    flex-direction: column;
  }

  .search-input {
    max-width: 100%;
  }

  .main-content {
    min-width: auto;
  }
}
</style>
