<template>
  <div>
    <div class="mb-3">
      <t-button @click="openMenuItem({ types: 'create' })">创建菜单</t-button>
    </div>
    <t-enhanced-table row-key="id" :data="listData" :columns="columns" :tree="treeConfig">
      <template #operation="{ row }">
        <t-space>
          <t-button size="small" @click="openMenuItem({ types: 'create', value: { parentId: row.id } })"
            >添加子菜单</t-button
          >
          <t-button size="small" @click="openMenuItem({ types: 'update', value: row })">编辑</t-button>
          <t-button size="small" theme="danger" @click="handleDelete(row)">删除</t-button>
        </t-space>
      </template>
    </t-enhanced-table>
    <create-update-menu ref="CreateUpdateMenuRef" @refresh="getListData"></create-update-menu>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';

import { DeleteMenu, GetMenus } from '@/api/admin/menu';
import { useTable } from '@/hooks/table';

import CreateUpdateMenu from './components/CreateUpdateMenu.vue';

const table = useTable();
const CreateUpdateMenuRef = ref();
const treeConfig = reactive({
  childrenKey: 'children',
  treeNodeColumnIndex: 0,
  indent: 25,
  expandTreeNodeOnClick: false,
});
const columns = ref([
  { colKey: 'id', title: 'ID', width: 80 },
  {
    colKey: 'meta.title',
    title: '展示名称',
    cell: (h, { row }) => {
      const result = [];
      for (const key in row.meta?.title) {
        result.push(h('div', [h('span', `${key}: `), h('span', row.meta.title[key])]));
      }
      return result;
    },
  },
  { colKey: 'meta.icon', title: '图标' },
  { colKey: 'name', title: '路由Name' },
  { colKey: 'path', title: '路由Path' },
  {
    colKey: 'meta.hidden',
    title: '是否隐藏',
    cell: (h, { row }) => {
      return row.meta.hidden ? '是' : '否';
    },
    width: 100,
  },
  { colKey: 'meta.orderNo', title: '排序', width: 80 },
  { colKey: 'component', title: '组件路径' },
  { colKey: 'operation', title: '操作' },
]);
const listData = ref([]);

const openMenuItem = (val) => {
  CreateUpdateMenuRef.value.open(val);
};

const getListData = async () => {
  console.log(1111);
  const res = await GetMenus();

  listData.value = res.list;
};

const handleDelete = (row) => {
  table.handleDelete(DeleteMenu, {
    title: '确定要删除该路由吗?',
    content: `${row.name}`,
    data: { id: row.id },
    execFunc: getListData,
  });
};
onMounted(() => {
  getListData();
});
</script>

<style scoped lang="less"></style>
