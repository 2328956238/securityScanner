<template>
  <div class="scan-history">
    <el-card>
      <template #header>
        <div class="card-header">
          <h2>扫描历史</h2>
          <el-button type="danger" @click="clearHistory">
            清除历史
          </el-button>
        </div>
      </template>

      <el-table :data="store.scanResults" style="width: 100%">
        <el-table-column prop="timestamp" label="时间" width="180">
          <template #default="{ row }">
            {{ formatDate(row.timestamp) }}
          </template>
        </el-table-column>
        <el-table-column prop="vulnerabilities[0].type" label="扫描类型" width="120" />
        <el-table-column prop="vulnerabilities[0].severity" label="严重程度" width="120">
          <template #default="{ row }">
            <el-tag :type="getSeverityType(row.vulnerabilities[0].severity)">
              {{ row.vulnerabilities[0].severity }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="vulnerabilities[0].description" label="描述" />
      </el-table>
    </el-card>
  </div>
</template>
