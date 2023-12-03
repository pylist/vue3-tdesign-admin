<template>
  <t-dialog
    :header="state.title[state.status]"
    v-model:visible="state.visible"
    :destroy-on-close="true"
    :cancel-btn="null"
    :confirm-btn="null"
    @close="close"
    width="1000px"
  >
    <t-form ref="formRef" :rules="formRules" :data="formValue" :colon="true" @submit="onSubmit">
      <t-form-item label="父级菜单" name="avatar">
        <t-input-number v-model="formValue.parentId"></t-input-number>
      </t-form-item>
      <t-row :gutter="[16, 24]">
        <t-col :span="6">
          <t-form-item label="路径" name="path">
            <t-input v-model="formValue.path" />
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item label="名称" name="name">
            <t-input v-model="formValue.name"></t-input>
          </t-form-item>
        </t-col>
      </t-row>
      <t-row :gutter="[16, 24]">
        <t-col :span="6">
          <t-form-item label="组件" name="component">
            <t-input v-model="formValue.component" />
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item label="重定向" name="redirect">
            <t-input v-model="formValue.redirect" />
          </t-form-item>
        </t-col>
      </t-row>

      <t-form-item label="菜单名" class="menu">
        <t-input-adornment v-for="(value, key) in formValue.meta.title" :key="key" :prepend="key + ':'">
          <t-input v-model="formValue.meta.title[key]" placeholder="请输入内容" />
        </t-input-adornment>
      </t-form-item>
      <t-form-item>
        <t-space>
          <t-input v-model="addTitle.key" style="width: 100px"></t-input>
          <t-input v-model="addTitle.value" style="width: 100px"></t-input>
          <t-button @click="handleMetaTitleAdd">增加</t-button>
        </t-space>
      </t-form-item>
      <t-form-item label="图标" name="icon">
        <t-input v-model="formValue.meta.icon"></t-input>
      </t-form-item>
      <t-form-item label="是否展开" name="expand">
        <t-switch v-model="formValue.meta.expand" size="large" :label="['是', '否']"></t-switch>
      </t-form-item>
      <t-form-item label="排序" name="orderNo">
        <t-input-number v-model="formValue.meta.orderNo"></t-input-number>
      </t-form-item>
      <t-form-item label="菜单隐藏" name="hidden">
        <t-switch v-model="formValue.meta.hidden" size="large" :label="['是', '否']"></t-switch>
      </t-form-item>
      <t-form-item label="面包屑展示" name="hiddenBreadcrumb">
        <t-switch v-model="formValue.meta.hiddenBreadcrumb" size="large" :label="['是', '否']"></t-switch>
      </t-form-item>
      <t-form-item label="单独显示" name="single">
        <t-switch v-model="formValue.meta.single" size="large" :label="['是', '否']"></t-switch>
      </t-form-item>
      <t-form-item label="iframe的地址" name="frameSrc">
        <t-input v-model="formValue.meta.frameSrc"></t-input>
      </t-form-item>
      <t-form-item label="新窗口打开" name="frameBlank">
        <t-switch v-model="formValue.meta.frameBlank" size="large" :label="['是', '否']"></t-switch>
      </t-form-item>
      <t-form-item label="keep-alive" name="keeplive">
        <t-switch v-model="formValue.meta.keeplive" size="large" :label="['开启', '关闭']"></t-switch>
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

import { CreateMenu, UpdateMenu } from '@/api/admin/menu';

const emit = defineEmits(['refresh']);

const state = reactive({
  visible: false,
  status: 'create',
  title: {
    create: '新增菜单',
    update: '更新菜单',
  },
});

const formRef = ref();
const addTitle = reactive({
  key: '',
  value: '',
});
const formDefault = () => {
  return {
    parentId: 0,
    path: '',
    name: '',
    component: '',
    redirect: '',
    meta: {
      title: {
        zh_CN: '',
        en_US: '',
      },
      icon: '',
      expand: false,
      orderNo: 0,
      hidden: false,
      hiddenBreadcrumb: false,
      single: false,
      frameSrc: '',
      frameBlank: false,
      keeplive: true,
    },
  };
};
const formValue = ref(formDefault());
const formRules = {
  path: [{ required: true, message: '路径必填' }],
  name: [{ required: true, message: '名称必填' }],
  component: [{ required: true, message: '组件必填' }],
};

const open = (val) => {
  const { types, value } = JSON.parse(JSON.stringify(val));
  state.status = types;
  if (val) {
    formValue.value = { ...formValue.value, ...value };
  }
  state.visible = true;
};

const openUpdate = (val) => {
  formValue.value = { ...formValue.value, ...value };
  state.visible = true;
};
const close = () => {
  formValue.value = formDefault();
  state.visible = false;
};

const onSubmit = async ({ validateResult, firstError, e }) => {
  e.preventDefault();
  let res;
  if (validateResult === true) {
    switch (state.status) {
      case 'create':
        res = await CreateMenu(formValue.value);
        break;
      case 'update':
        res = await UpdateMenu(formValue.value);
        break;
      default:
        // 无操作
        break;
    }
    console.log(res);
    await MessagePlugin.success('提交成功');
    emit('refresh');
    close();
  } else {
    console.log('Validate Errors: ', firstError, validateResult);
    await MessagePlugin.warning(firstError);
  }
};
defineExpose({
  open,
  close,
});
const handleMetaTitleAdd = () => {
  formValue.value.meta.title[addTitle.key] = addTitle.value;
};
</script>

<style scoped lang="less">
.menu :deep(.t-form__controls-content) {
  flex-direction: column;
  align-items: flex-start;
  .t-input-adornment {
    margin-bottom: 5px;
  }
}
</style>
