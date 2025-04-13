<template>
  <div v-if="error" class="error-boundary">
    <el-result
      icon="error"
      :title="error.message"
      :sub-title="error.details"
    >
      <template #extra>
        <el-button type="primary" @click="reset">
          重试
        </el-button>
      </template>
    </el-result>
  </div>
  <slot v-else></slot>
</template>
