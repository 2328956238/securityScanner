<template>
  <div class="scan-result-chart">
    <el-empty v-if="!results.length" description="暂无扫描结果" />
    <div v-else class="chart-container" :style="{ height }">
      <el-statistic
        title="扫描总数"
        :value="results.length"
        class="statistic-item"
      />
      <el-statistic
        title="高危漏洞"
        :value="highRiskCount"
        class="statistic-item"
      />
      <el-statistic
        title="中危漏洞"
        :value="mediumRiskCount"
        class="statistic-item"
      />
      <el-statistic
        title="低危漏洞"
        :value="lowRiskCount"
        class="statistic-item"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ScanResult } from '@/types/security';

const props = defineProps<{
  results: ScanResult[];
  height?: string;
}>();

const highRiskCount = computed(() => 
  props.results.filter(r => r.vulnerabilities[0].severity === 'High').length
);

const mediumRiskCount = computed(() => 
  props.results.filter(r => r.vulnerabilities[0].severity === 'Medium').length
);

const lowRiskCount = computed(() => 
  props.results.filter(r => r.vulnerabilities[0].severity === 'Low').length
);
</script>

<style scoped>
.scan-result-chart {
  width: 100%;
}

.chart-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1rem;
}

.statistic-item {
  text-align: center;
}
</style> 