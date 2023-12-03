<template>
  <t-upload
    ref="uploadRef1"
    v-model="state.file"
    :image-viewer-props="state.imageViewerProps"
    :size-limit="state.sizeLimit"
    action="/api/user/uploadAvatar"
    theme="image"
    accept="image/*"
    :disabled="state.disabled"
    :auto-upload="true"
    :show-image-file-name="false"
    :locale="{
      triggerUploadText: {
        image: '请选择图片',
      },
    }"
    :format-response="formatImgResponse"
    @fail="handleFail"
    @success="handleSuccess"
    @remove="handleRemove"
  >
    <!-- custom UI -->
    <!-- <template #fileListDisplay="{ files }">
      <div>{{ JSON.stringify(files) }}</div>
    </template> -->
  </t-upload>
</template>

<script setup>
import { reactive, watch } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(['update:modelValue']);

const state = reactive({
  disabled: false,
  imageViewerProps: { closeOnEscKeydown: false },
  sizeLimit: { size: 100, unit: 'MB' },
  file: [],
  url: props.modelValue,
});

watch(
  () => props.modelValue,
  (newVal) => {
    console.log(newVal);
    console.log('执行了修改图片');
    if (newVal) {
      state.file = [{ url: newVal }];
    }
  },
  { immediate: true },
);

const handleFail = ({ file }) => {
  MessagePlugin.error(`文件 ${file.name} 上传失败`);
};
const handleSuccess = (context) => {
  console.log(context);
  const { response } = context;
  console.log(response.url);
  emit('update:modelValue', response.url);
};
const handleRemove = () => {
  emit('update:modelValue', '');
};
const formatImgResponse = (response, context) => {
  console.log(response, context);
  return { name: context.file.name, url: response.data.url };
};
</script>

<style scoped lang="less"></style>
