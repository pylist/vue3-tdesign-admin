<script setup>
import { ref } from 'vue';

import CreateUser from './components/CreateUser.vue';

const CreateUserRef = ref();

const columns = ref([
  { colKey: 'avatar', title: '头像' },
  { colKey: 'id', title: '用户ID', width: '100' },
  { colKey: 'nickName', title: '昵称' },
  {
    colKey: 'operation',
    title: '操作',
  },
]);
const listData = ref([{ id: 1, avatar: 'test', nickName: '测试' }]);

const openCreateUser = () => {
  CreateUserRef.value.open();
};
const handleDeleteUser = (row) => {
  console.log(row.id);
};
</script>
<template>
  <div>
    <div>
      <t-button @click="openCreateUser">新增用户</t-button>
    </div>
    <div>
      <t-table row-key="id" :columns="columns" :data="listData">
        <template #operation="{ row }">
          <t-space>
            <t-button @click="openCreateUser">编辑</t-button>
            <t-button theme="danger" @click="handleDeleteUser(row)">删除</t-button>
          </t-space>
        </template>
      </t-table>
    </div>
    <create-user ref="CreateUserRef"></create-user>
  </div>
</template>

<style scoped lang="less"></style>
