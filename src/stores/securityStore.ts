// src/stores/securityStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ScanRequest, ScanResult, SecurityHeaders } from '../types/security';

export const useSecurityStore = defineStore('security', () => {
  const scanResults = ref<ScanResult[]>([]);
  const securityHeaders = ref<SecurityHeaders | null>(null);
  const isScanning = ref(false);

  const clearResults = () => {
    scanResults.value = [];
    securityHeaders.value = null;
  };

  const performScan = async (request: ScanRequest) => {
    isScanning.value = true;
    try {
      // 模拟扫描过程
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockResult: ScanResult = {
        vulnerabilities: [
          {
            type: request.scanType,
            severity: 'Medium',
            description: `发现潜在的${request.scanType}漏洞`,
            location: request.url
          }
        ],
        timestamp: new Date().toISOString()
      };
      
      scanResults.value.push(mockResult);
    } finally {
      isScanning.value = false;
    }
  };

  const checkSecurityHeaders = async (url: string) => {
    try {
      const response = await fetch(url);
      const headers = response.headers;
      
      securityHeaders.value = {
        xFrameOptions: headers.get('X-Frame-Options') === 'DENY',
        csp: headers.get('Content-Security-Policy') !== null,
        xContentTypeOptions: headers.get('X-Content-Type-Options') === 'nosniff',
        strictTransportSecurity: headers.get('Strict-Transport-Security') !== null,
        referrerPolicy: headers.get('Referrer-Policy') !== null
      };
    } catch (error) {
      console.error('检查安全头时出错:', error);
      throw error;
    }
  };

  return {
    scanResults,
    securityHeaders,
    isScanning,
    performScan,
    checkSecurityHeaders,
    clearResults
  };
});