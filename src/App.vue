<!-- src/App.vue -->
<template>
  <el-config-provider>
    <div class="app">
      <header class="app-header">
        <h1>网络安全检测工具平台</h1>
        <p class="subtitle">XSS/CSRF漏洞检测 & HTTP安全头分析</p>
      </header>
      <main>
        <SecurityScanner />
      </main>
      <footer class="app-footer">
        <p>© {{ new Date().getFullYear() }} 网络安全检测工具平台 - 保护您的网络安全</p>
      </footer>
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
import SecurityScanner from './views/SecurityScanner.vue';
</script>

<style>
body {
  margin: 0;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.app-header {
  background: linear-gradient(135deg, #409EFF 0%, #2c50e7 100%);
  color: white;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.app-header h1 {
  margin: 0;
  font-size: 2.5em;
  font-weight: 600;
}

.subtitle {
  margin-top: 1rem;
  font-size: 1.2em;
  opacity: 0.9;
}

main {
  flex: 1;
  padding: 2rem;
}

.app-footer {
  background-color: #545c64;
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
}
</style>