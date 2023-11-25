<script setup lang="jsx">
import { ref } from 'vue';

import CreateUser from './components/CreateUser.vue';

const CreateUserRef = ref();

const openCreateUser = () => {
  CreateUserRef.value.open();
};

const columns = ref([
  { colKey: 'avatar', title: '头像' },
  { colKey: 'id', title: '用户ID', width: '100' },
  { colKey: 'nickName', title: '昵称' },
  {
    colKey: 'operation',
    title: '操作',
    cell: (h, { row }) => {
      return (
        <t-space>
          <t-button onClick={() => openCreateUser()}>编辑</t-button>
          <t-button>删除</t-button>
        </t-space>
      );
    },
  },
]);
const listData = ref([{ id: 1, avatar: 'test', nickName: '测试' }]);
</script>
<template>
  <div>
    <div>
      <t-button>新增用户</t-button>
    </div>
    <div>
      <t-table row-key="id" :columns="columns" :data="listData"></t-table>
    </div>
    <CreateUser ref="CreateUserRef"></CreateUser>
  </div>
</template>

<style scoped lang="less"></style>
