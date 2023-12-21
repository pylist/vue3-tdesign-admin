<template>
  <div>
    <div class="mb-3">
      <t-button @click="openCreateUser">新增角色</t-button>
    </div>
    <div>
      <t-table row-key="id" :columns="columns" :data="listData">
        <template #operation="{ row }">
          <t-space>
            <t-button @click="openUpdateRole(row)">编辑</t-button>
            <t-button theme="danger" @click="handleDeleteRole(row)">删除</t-button>
            <t-button>设置权限</t-button>
          </t-space>
        </template>
      </t-table>
    </div>
    <CreateUpdateRole ref="CreateUpdateRoleRef" @refresh="getListData"></CreateUpdateRole>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

import { DeleteRole, ListRole } from '@/api/admin/role';
import { useTable } from '@/hooks/table';

import CreateUpdateRole from './components/CreateUpdateRole.vue';

const table = useTable();
const CreateUpdateRoleRef = ref();

const columns = ref([
  { colKey: 'id', title: '角色ID', width: 100 },
  { colKey: 'name', title: '角色名称', width: 200 },
  {
    colKey: 'operation',
    title: '操作',
  },
]);
const listData = ref([]);

const openCreateUser = () => {
  CreateUpdateRoleRef.value.openCreate();
};

const openUpdateRole = (row) => {
  CreateUpdateRoleRef.value.openUpdate(row);
};
const handleDeleteRole = (row) => {
  table.handleDelete(DeleteRole, {
    title: '删除用户',
    content: `确认删除角色: ${row.name}`,
    data: { id: row.id },
    execFunc: getListData,
  });
};

const getListData = () => {
  ListRole().then((res) => {
    listData.value = res.list;
  });
};

onMounted(() => {
  getListData();
});
</script>

<style scoped lang="less"></style>
