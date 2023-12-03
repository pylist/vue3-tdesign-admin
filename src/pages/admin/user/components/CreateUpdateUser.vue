<template>
  <t-dialog
    v-model:visible="state.visible"
    :header="state.title[state.status]"
    :destroy-on-close="true"
    :cancel-btn="null"
    :confirm-btn="null"
  >
    <t-form ref="formRef" :rules="formRules" :data="formValue" :colon="true" @submit="onSubmit">
      <t-form-item label="头像" name="avatar">
        <upload-image v-model="formValue.avatar"></upload-image>
      </t-form-item>
      <t-form-item label="昵称" name="nickName">
        <t-input v-model="formValue.nickName" />
      </t-form-item>
      <t-form-item label="用户名" name="username">
        <t-input v-model="formValue.username"></t-input>
      </t-form-item>
      <t-form-item label="密码" name="password">
        <t-input v-model="formValue.password" />
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

import { CreateUser, UpdateUser } from '@/api/admin/user';
import UploadImage from '@/components/upload-image/index.vue';

const emit = defineEmits(['refresh']);

const state = reactive({
  visible: false,
  status: 'create',
  title: {
    create: '创建用户',
    update: '更新用户',
  },
});

const formDefault = () => {
  return {
    avatar: '',
    nickName: '',
    username: '',
    password: '',
  };
};
const formRef = ref();
const formValue = ref(formDefault());
const formRules = {
  username: [{ required: true, message: '用户名必填', trigger: 'blur' }],
  password: [{ required: true, message: '密码必填' }],
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
    if (state.status === 'create') {
      await CreateUser(formValue.value);
    } else {
      await UpdateUser(formValue.value);
    }
    emit('refresh');
    await MessagePlugin.success('提交成功');
    close();
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
