import { defineStore } from 'pinia';

export const useCart = defineStore('cart', {
  state: () => ({
    list: [],
  }),
  getters: {
    getList() {
      return this.list;
    },
  },
  actions: {
    increment(id) {
      const index = this.list.findIndex((row) => row.id === id);
      this.list[index].count += 1;
    },
    decrement(id) {
      const index = this.list.findIndex((row) => row.id === id);
      if (this.list[index].count - 1 === 0) {
        this.delete(id);
      } else {
        this.list[index].count -= 1;
      }
    },
    add(value) {
      const index = this.list.findIndex((row) => row.id === value.id);

      if (index === -1) {
        this.list.push({
          ...value,
          count: 1,
        });
        return true;
      } else {
        return false;
      }
    },
    delete(id) {
      const index = this.list.findIndex((row) => row.id === id);

      this.list.splice(index, 1);
    },
    findProduct(id) {
      return { ...this.list.find((row) => row.id === id) };
    },
    isExist(id) {
      return this.list.findIndex((row) => row.id === id) !== -1;
    },
  },
});
