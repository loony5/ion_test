import { defineStore } from 'pinia';

export const useFavorite = defineStore('favorite', {
  state: () => ({
    list: [],
  }),
  getters: {},
  actions: {
    add(value) {
      const index = this.list.findIndex((row) => row.id === value.id);

      if (index === -1) {
        this.list.push({
          ...value,
        });
      } else {
        this.list.splice(index, 1);
      }
    },
    findByProductId(id) {
      const index = this.list.findIndex((row) => row.id === id);
      return index !== -1;
    },
    delete(id) {
      const index = this.list.findIndex((row) => row.id === id);
      this.list.splice(index, 1);
    },
  },
});
