import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SecurityScanner from '../../views/SecurityScanner.vue';

describe('SecurityScanner', () => {
  it('renders properly', () => {
    const wrapper = mount(SecurityScanner);
    expect(wrapper.text()).toContain('网络安全扫描');
  });

  it('validates URL input', async () => {
    const wrapper = mount(SecurityScanner);
    const input = wrapper.find('input');
    await input.setValue('not-a-url');
    await wrapper.find('button').trigger('click');
    expect(wrapper.text()).toContain('请输入有效的URL');
  });
});
