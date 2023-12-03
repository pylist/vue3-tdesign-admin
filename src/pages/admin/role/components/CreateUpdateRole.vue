<template>
  <t-dialog
    v-model:visible="state.visible"
    :header="state.title[state.status]"
    :destroy-on-close="true"
    :cancel-btn="null"
    :confirm-btn="null"
  >
    <t-form ref="formRef" :rules="formRules" :data="formValue" :colon="true" @submit="onSubmit">
      <t-form-item label="角色ID" name="id">
        <t-input-number v-model="formValue.id" />
      </t-form-item>
      <t-form-item label="角色名称" name="name">
        <t-input v-model="formValue.name"></t-input>
      </t-form-item>
      <t-form-item>
        <t-space size="small">
          <t-button theme="primary" type="submit">提交</t-button>
          <t-button theme="default" variant="base" type="reset">重置</t-button>
        </t-space>
      </t-form-item>
    </t-form>
  </t-dialog>
</template>

<script setup>
import { MessagePlugin } from 'tdesign-vue-next';
import { reactive, ref } from 'vue';

import { CreateRole, UpdateRole } from '@/api/admin/role';

const emit = defineEmits(['refresh']);

const state = reactive({
  visible: false,
  status: 'create',
  title: {
    create: '创建角色',
    update: '更新角色',
  },
});

const formDefault = () => {
  return {
    id: null,
    name: '',
  };
};
const formRef = ref();
const formValue = ref(formDefault());
const formRules = {
  id: [{ required: true, message: 'ID必填' }],
  name: [{ required: true, message: '名称必填' }],
};

const openCreate = () => {
  state.visible = true;
};
const openUpdate = (val) => {
  const value = JSON.parse(JSON.stringify(val));
  state.status = 'update';
  formValue.value = { ...formValue.value, ...value };
  state.visible = true;
};
const close = () => {
  formValue.value = formDefault();
  state.visible = false;
};

const onSubmit = async ({ validateResult, firstError, e }) => {
  e.preventDefault();
  if (validateResult === true) {
    try {
      if (state.status === 'create') {
        await CreateRole(formValue.value);
      } else {
        await UpdateRole(formValue.value);
      }
      emit('refresh');
      await MessagePlugin.success('提交成功');
      close();
    } catch (e) {
      console.log(e);
      await MessagePlugin.error(e.message);
    }
  } else {
    console.log('Validate Errors: ', firstError, validateResult);
    await MessagePlugin.warning(firstError);
  }
};
defineExpose({
  openCreate,
  openUpdate,
  close,
});
</script>

<style scoped lang="less"></style>
