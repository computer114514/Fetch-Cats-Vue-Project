<template>
<el-dialog v-model="dialogFormVisible" title="登记猫猫的信息" width="500">
    <el-form :model="form">
      <el-form-item label="昵称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="选择性别" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="选一个">
          <el-option label="Zone No.1" value="man" />
          <el-option label="Zone No.2" value="women" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref } from 'vue'
const dialogFormVisible = ref(true)
const formLabelWidth = '140px'

const form = reactive({
  name: '1',
  region: '2',
  date1: '3',
  date2: '4',
  delivery: false,
  type: [5],
  resource: '6',
  desc: '7',
})
</script>
