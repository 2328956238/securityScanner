<template>
    <div class="documentation">
      <el-card>
        <template #header>
          <h2>使用文档</h2>
        </template>
        
        <el-tabs>
          <el-tab-pane label="快速开始">
            <h3>基本使用</h3>
            <p>1. 输入目标URL</p>
            <p>2. 选择扫描类型</p>
            <p>3. 点击"开始扫描"按钮</p>
          </el-tab-pane>
          
          <el-tab-pane label="高级功能">
            <h3>自定义Payload</h3>
            <p>可以添加自定义的XSS/CSRF测试向量</p>
            
            <h3>安全头分析</h3>
            <p>检查目标网站的HTTP安全头配置</p>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </template>