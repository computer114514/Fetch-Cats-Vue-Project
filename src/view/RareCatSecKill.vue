<template>
  <div class="seckill-page">
    <div class="return">
      <el-button size="large" @Click="returnToMainPage"> 返回 </el-button>
    </div>
    <!-- 使用 Element Plus 的卡片组件，自带边框和阴影 -->
    <el-card class="seckill-card" shadow="hover">
      <!-- 头部标题 -->
      <template #header>
        <div class="card-header">
          <span class="title">🔥 {{ curRareCat.name }}·限时秒杀</span>
          <el-tag type="danger" effect="dark">仅剩 {{ curRareCat.store }} 只</el-tag>
        </div>
      </template>

      <!-- 主体内容区 -->
      <div class="content-body">
        <!-- 图片区域：加了一个容器方便控制大小和圆角 -->
        <div class="image-wrapper">
          <!-- 注意：确保你的 public 文件夹下有 01.jpg，或者换成网络图片链接 -->
          <img
            :src="curRareCat.url"
            alt="稀有猫猫"
            class="cat-image"
            onerror="
              this.src = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&q=80'
            "
          />
          <div class="image-overlay">
            <span class="badge">HOT</span>
          </div>
        </div>

        <!-- 信息区域 -->
        <div class="info-section">
          <h2 class="cat-name">{{ curRareCat.name }}</h2>
          <!-- <div class="price-box">
            <span class="currency">¥</span>
            <span class="price">9.9</span>
            <span class="original-price">¥999</span>
          </div> -->
          <p class="desc">手慢无！全球限量发行，拥有唯一身份 ID。</p>
        </div>

        <!-- 按钮区域 -->
        <div class="action-area">
          <!--
            这里暂时写死 disabled 表示还没到时间，
            等你后面加 JS 逻辑时，只需要把 :disabled="false" 动态绑定即可
          -->
          <el-button type="danger" size="large" class="seckill-btn" v-if="remainTime > 0" disabled>
            ⏰ 距离开抢还有 {{ RemainingTime }}
          </el-button>

          <!-- 这是一个备用的“立即抢购”按钮样式，等你逻辑通了可以切换显示这个 -->

          <el-button
            type="primary"
            size="large"
            class="seckill-btn active"
            @click="buyRareCatMethod"
            v-else-if="remainTime == 0"
          >
            🚀 立即抢购
          </el-button>

          <el-button size="large" class="seckill-btn" v-else disabled> 游戏结束了。 </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="js" setup>
import { onMounted, ref } from "vue";
import { getRareCat, getRareCatRemainTime, buyRareCat } from "@/api/RareCat";
import { ElMessage } from "element-plus";
import router from "@/router";
const curRareCat = ref({});
const remainTimeObject = ref({});
const remainTime = ref();
const RemainingTime = ref(`未获取数据`);
const curRareCatId = ref();

let timer = null;

/**
 * 一刷新就获取猫和时间
 */
onMounted(async () => {
  curRareCat.value = await getRareCat();
  console.log(curRareCat.value.id, curRareCat.value);
  curRareCatId.value = curRareCat.value.id;
  remainTimeObject.value = await getRareCatRemainTime();
  //转换为真正的时间，不是对象，方便转换。
  remainTime.value = remainTimeObject.value.remainTime;
  //新计时器之前先更新一次状态
  updateBtnStatus();

  //直接创建计时器
  if (remainTime.value > 0) {
    timer = setInterval(() => {
      remainTime.value--;
      updateBtnStatus();
    }, 1000);
  }
});
/**
 * 更新按钮状态，就是开启计时器
 */
const updateBtnStatus = () => {
  if (remainTime.value > 0) {
    const s = String(Math.floor(remainTime.value % 60)).padStart(2, "0");
    const m = String(Math.floor((remainTime.value % 3600) / 60)).padStart(2, "0");
    const h = String(Math.floor(remainTime.value / 3600));
    RemainingTime.value = `${h}:${m}:${s}`;
  }
  if (remainTime.value <= 0) {
    clearInterval(timer);
  }
};
/**
 * 下单，抢购珍惜猫
 */
const buyRareCatMethod = async () => {
  console.log("buyrareCat");
  const res = await buyRareCat(curRareCatId.value);
  console.log("res", res);
  if (res == null) {
    ElMessage.success("购买成功!请查看你的仓库.");
  }
};
const returnToMainPage = () => {
  router.push("/");
};
</script>

<style scoped>
/* 页面整体背景 */
.seckill-page {
  position: relative;
  background-image: url("https://bpic.588ku.com/back_pic/06/15/89/7962a1c1e5a5ec7.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* 占据大部分屏幕高度 */
  background-color: #f5f7fa; /* 浅灰色背景，突出卡片 */
  font-family:
    "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial,
    sans-serif;
}

/* 卡片样式 */
.seckill-card {
  width: 420px;
  border-radius: 12px;
  overflow: hidden; /* 防止图片溢出圆角 */
}

/* 头部样式 */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
}

.title {
  font-size: 18px;
  color: #303133;
}

/* 图片容器 */
.image-wrapper {
  position: relative;
  width: 100%;
  height: 280px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.cat-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 保证图片填满且不变形 */
  transition: transform 0.3s ease;
}

/* 鼠标悬停图片放大效果 */
.image-wrapper:hover .cat-image {
  transform: scale(1.05);
}

/* 图片上的 HOT 标签 */
.image-overlay {
  position: absolute;
  top: 10px;
  right: 10px;
}

.badge {
  background: linear-gradient(45deg, #ff4b1f, #ff9068);
  color: white;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  box-shadow: 0 2px 6px rgba(255, 75, 31, 0.4);
}

/* 信息区域 */
.info-section {
  text-align: center;
  margin-bottom: 25px;
}

.cat-name {
  margin: 0 0 10px 0;
  font-size: 20px;
  color: #303133;
}
.return {
  position: absolute;
  left: 20px;
  top: 10px;
}

/* .price-box {
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 5px;
  margin-bottom: 8px;
} */

/* .currency {
  color: #f56c6c;
  font-size: 16px;
  font-weight: bold;
}

.price {
  color: #f56c6c;
  font-size: 32px;
  font-weight: 800;
  line-height: 1;
}

.original-price {
  color: #909399;
  font-size: 14px;
  text-decoration: line-through;
} */

.desc {
  color: #606266;
  font-size: 13px;
  margin: 0;
  line-height: 1.5;
}

/* 按钮区域 */
.action-area {
  text-align: center;
}

.seckill-btn {
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 1px;
  /* 给禁用的按钮也加一点特殊的样式，让它看起来像是在倒计时 */
}

/* 如果你后续启用了那个“立即抢购”按钮，可以用这个类让它发光 */
.seckill-btn.active {
  background: linear-gradient(90deg, #f56c6c, #ff8a6e);
  border: none;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(245, 108, 108, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(245, 108, 108, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(245, 108, 108, 0);
  }
}
</style>
