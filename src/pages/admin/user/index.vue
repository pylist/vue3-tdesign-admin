<template>
  <div>
    <div class="mb-3">
      <t-button @click="openCreateUser">新增用户</t-button>
    </div>
    <div>
      <t-table row-key="id" :columns="columns" :data="listData">
        <template #avatar="{ row }">
          <t-avatar :image="row.avatar"></t-avatar>
        </template>
        <template #operation="{ row }">
          <t-space>
            <t-button @click="openUpdateUser(row)">编辑</t-button>
            <t-button theme="danger" @click="handleDeleteUser(row)">删除</t-button>
          </t-space>
        </template>
      </t-table>
    </div>
    <create-update-user ref="CreateUpdateUserRef" @refresh="getListData"></create-update-user>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

import { UserList, DeleteUser } from '@/api/admin/user';
import { useTable } from '@/hooks/table';

import CreateUpdateUser from './components/CreateUpdateUser.vue';

const table = useTable();
const CreateUpdateUserRef = ref();

const columns = ref([
  { colKey: 'avatar', title: '头像', width: 100 },
  { colKey: 'id', title: '用户ID', width: '100' },
  { colKey: 'nickName', title: '昵称', width: 200 },
  { colKey: 'username', title: '用户名', width: 200 },
  {
    colKey: 'operation',
    title: '操作',
  },
]);
const listData = ref([{ id: 1, avatar: 'test', nickName: '测试' }]);

const openCreateUser = () => {
  CreateUpdateUserRef.value.openCreate();
};

const openUpdateUser = (row) => {
  CreateUpdateUserRef.value.openUpdate(row);
};
const handleDeleteUser = (row) => {
  table.handleDelete(DeleteUser, {
    title: '删除用户',
    content: `确认删除用户: ${row.username}`,
    data: { id: row.id },
    execFunc: getListData,
  });
};

const getListData = () => {
  UserList().then((res) => {
    listData.value = res.list;
  });
};

onMounted(() => {
  getListData();
});
</script>

<style scoped lang="less"></style>
