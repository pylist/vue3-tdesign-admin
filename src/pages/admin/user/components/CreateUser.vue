<script setup lang="ts">
import { reactive } from 'vue';

const state = reactive({
  visible: false,
});

const open = () => {
  state.visible = true;
};
const close = () => {
  state.visible = false;
};

defineExpose({
  open,
  close,
});
</script>

<template>
  <t-dialog v-model:visible="state.visible">
    <t-form>
      <t-form-item label="头像" name="avatar">
        <t-input />
      </t-form-item>
      <t-form-item label="昵称" name="nickName">
        <t-input />
      </t-form-item>
      <t-form-item label="密码" name="password">
        <t-input />
      </t-form-item>
    </t-form>
  </t-dialog>
</template>

<style scoped lang="less"></style>
