<template>
  <div class="security-scanner">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="scan-form">
          <template #header>
            <div class="card-header">
              <h2>安全扫描</h2>
            </div>
          </template>
          
          <el-form :model="scanForm" :rules="rules" ref="formRef" label-width="120px">
            <el-form-item label="目标URL" prop="url">
              <el-input 
                v-model="scanForm.url" 
                placeholder="请输入要扫描的URL（例如：https://example.com）"
              >
                <template #append>
                  <el-button @click="checkHeaders" :loading="checkingHeaders">
                    检查安全头
                  </el-button>
                </template>
              </el-input>
            </el-form-item>
            
            <el-form-item label="扫描类型" prop="scanType">
              <el-radio-group v-model="scanForm.scanType">
                <el-radio-button label="XSS">XSS漏洞扫描</el-radio-button>
                <el-radio-button label="CSRF">CSRF漏洞扫描</el-radio-button>
              </el-radio-group>
            </el-form-item>
            
            <el-form-item>
              <el-button 
                type="primary" 
                @click="startScan" 
                :loading="store.isScanning"
              >
                开始扫描
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="mt-4" v-if="store.scanResults.length || store.securityHeaders">
      <el-col :span="12" v-if="store.scanResults.length">
        <el-card class="scan-results">
          <template #header>
            <div class="card-header">
              <h3>扫描结果</h3>
              <el-button type="danger" @click="store.clearResults">
                清除结果
              </el-button>
            </div>
          </template>
          <ScanResultChart :results="store.scanResults" height="300px" />
          <el-timeline class="mt-4">
            <el-timeline-item
              v-for="(result, index) in store.scanResults"
              :key="index"
              :timestamp="formatDate(result.timestamp)"
              :type="getTimelineItemType(result)"
            >
              <h4>{{ result.vulnerabilities[0].type }} 扫描结果</h4>
              <p>严重程度: {{ result.vulnerabilities[0].severity }}</p>
              <p>{{ result.vulnerabilities[0].description }}</p>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>

      <el-col :span="12" v-if="store.securityHeaders">
        <el-card class="headers-results">
          <template #header>
            <div class="card-header">
              <h3>HTTP安全头分析</h3>
            </div>
          </template>
          <el-descriptions :column="1" border>
            <el-descriptions-item 
              v-for="(value, key) in store.securityHeaders" 
              :key="key"
              :label="formatHeaderLabel(key)"
            >
              <el-tag :type="value ? 'success' : 'danger'">
                {{ value ? '已配置' : '未配置' }}
              </el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useSecurityStore } from '@/stores/securityStore';
import { ElMessage } from 'element-plus';
import type { FormInstance } from 'element-plus';
import { ScanResultChart } from '@/components';
import { formatDate, validateUrl } from '@/utils/security';
import type { ScanRequest, ScanResult } from '@/types/security';

const store = useSecurityStore();
const formRef = ref<FormInstance>();
const checkingHeaders = ref(false);

const scanForm = ref<ScanRequest>({
  url: '',
  scanType: 'XSS'
});

const rules = {
  url: [
    { required: true, message: '请输入目标URL' },
    { validator: (rule: any, value: string) => {
      if (!validateUrl(value)) {
        return new Error('请输入有效的URL');
      }
      return true;
    }}
  ],
  scanType: [
    { required: true, message: '请选择扫描类型' }
  ]
};

const formatHeaderLabel = (key: string): string => {
  const labels: Record<string, string> = {
    xFrameOptions: 'X-Frame-Options',
    csp: 'Content-Security-Policy',
    xContentTypeOptions: 'X-Content-Type-Options',
    strictTransportSecurity: 'Strict-Transport-Security',
    referrerPolicy: 'Referrer-Policy'
  };
  return labels[key] || key;
};

const startScan = async () => {
  if (!formRef.value) return;
  
  await formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        await store.performScan(scanForm.value);
        ElMessage.success('扫描完成');
      } catch (error) {
        ElMessage.error(error instanceof Error ? error.message : '扫描失败');
      }
    }
  });
};

const checkHeaders = async () => {
  if (!scanForm.value.url) {
    ElMessage.warning('请输入目标URL');
    return;
  }
  
  if (!validateUrl(scanForm.value.url)) {
    ElMessage.warning('请输入有效的URL');
    return;
  }

  checkingHeaders.value = true;
  try {
    await store.checkSecurityHeaders(scanForm.value.url);
    ElMessage.success('安全头检查完成');
  } catch (error) {
    ElMessage.error(error instanceof Error ? error.message : '检查安全头失败');
  } finally {
    checkingHeaders.value = false;
  }
};

const getTimelineItemType = (result: ScanResult): 'primary' | 'success' | 'warning' | 'danger' | 'info' => {
  const severity = result.vulnerabilities[0].severity;
  switch (severity) {
    case 'High': return 'danger';
    case 'Medium': return 'warning';
    case 'Low': return 'success';
    default: return 'primary';
  }
};
</script>

<style scoped>
.security-scanner {
  max-width: 1200px;
  margin: 0 auto;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h2,
.card-header h3 {
  margin: 0;
}

.mt-4 {
  margin-top: 1rem;
}

:deep(.el-timeline-item__content h4) {
  margin: 0;
}

:deep(.el-descriptions__label) {
  width: 200px;
}
</style>
