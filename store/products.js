import { defineStore } from 'pinia';

export const useProducts = defineStore('products', {
  state: () => ({
    list: [],
  }),
  getters: {
    getList() {
      return this.list;
    },
  },
  actions: {
    findByProductId(id) {
      id;
    },
    // addCount() {
    //   this.count++;
    // },
    // addFavorite() {
    //   this.favorite = false;
    // },
  },
});
