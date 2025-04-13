<template>
  <el-menu
    :router="true"
    mode="horizontal"
    :default-active="route.path"
  >
    <el-menu-item index="/">
      <el-icon><Monitor /></el-icon>
      安全扫描
    </el-menu-item>
    <el-menu-item index="/history">
      <el-icon><History /></el-icon>
      扫描历史
    </el-menu-item>
    <el-menu-item index="/docs">
      <el-icon><Document /></el-icon>
      使用文档
    </el-menu-item>
  </el-menu>
</template>
