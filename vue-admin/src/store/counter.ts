import { defineStore } from "pinia";

// defineStore 第一个参数是id，必需且值唯一
export const useCounterStore = defineStore("counter", {
  // state返回一个函数，防止作用域污染
  state: () => {
    return {
      count: 1,
    };
  },
  actions: {
    increase() {
      this.count++;
    },
    decrease() {
      this.count--;
    },
  },
});
