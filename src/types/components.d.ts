declare module 'vue' {
  export interface GlobalComponents {
    // Element Plus 组件声明
    ElButton: typeof import('element-plus')['ElButton']
    ElInput: typeof import('element-plus')['ElInput']
    ElSelect: typeof import('element-plus')['ElSelect']
    ElForm: typeof import('element-plus')['ElForm']
    ElFormItem: typeof import('element-plus')['ElFormItem']
    ElCard: typeof import('element-plus')['ElCard']
    // ... 其他组件
  }
}

// 确保这个文件被视为一个模块
export {}
