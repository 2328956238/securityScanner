import { createRouter, createWebHistory } from 'vue-router';
import SecurityScanner from '@/views/SecurityScanner.vue';
import ScanHistory from '@/views/ScanHistory.vue';
import Documentation from '@/views/Documentation.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: SecurityScanner,
      meta: {
        title: '安全扫描'
      }
    },
    {
      path: '/history',
      name: 'history',
      component: ScanHistory,
      meta: {
        title: '扫描历史'
      }
    },
    {
      path: '/docs',
      name: 'documentation',
      component: Documentation,
      meta: {
        title: '使用文档'
      }
    }
  ]
});

// 路由标题处理
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - 网络安全检测工具平台`;
  next();
});

export default router;
