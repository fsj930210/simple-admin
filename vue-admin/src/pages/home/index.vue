<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useCounterStore } from '@/store/counter';
import { useIntervalFn } from '@vueuse/core';
import { onMounted, ref } from 'vue';
import SvgIcon from '@/components/SvgIcon/index.vue';
const counterStore = useCounterStore();
// storeToRefs 会跳过所有的 action 属性
const { count } = storeToRefs(counterStore);
const { increase, decrease } = counterStore;
const time = ref(0);
const { pause, resume } = useIntervalFn(
  () => {
    time.value--;
    if (time.value <= 0) {
      pause();
    }
  },
  1000,
  { immediate: false },
);
onMounted(() => {
  pause();
});
const start = () => {
  time.value = 60;
  resume();
};
</script>
<template>
  <div class="text-blue">home page</div>
  <div>count: {{ count }}</div>
  <button @click="increase">+1</button>
  <button @click="decrease">-1</button>
  <a-button type="primary">主要按钮</a-button>
  <a-button>Default Button</a-button>
  <a-button type="dashed">Dashed Button</a-button>
  <a-button type="text">Text Button</a-button>
  <a-button type="link">Link Button</a-button>
  <a-button type="primary" @click="start">{{ time <= 0 ? '开始倒计时60s' : `还剩${time}s` }}</a-button>
  <svg-icon name="vue" width="15px" height="15px" color="#fff" />
</template>
<style lang="scss">
body {
  color: $test-color;
}
</style>
