export const validateUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
};

export const analyzePayload = (payload: string): {
  risk: 'High' | 'Medium' | 'Low';
  reason: string;
} => {
  if (payload.includes('<script>') || payload.includes('javascript:')) {
    return { risk: 'High', reason: '包含可执行JavaScript代码' };
  }
  if (payload.includes('onerror=') || payload.includes('onload=')) {
    return { risk: 'Medium', reason: '包含事件处理器' };
  }
  return { risk: 'Low', reason: '潜在的危险输入' };
};

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};
