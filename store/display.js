import { defineStore } from 'pinia';

export const useDisplay = defineStore('display', {
  state: () => ({
    cartModal: false,
    favoriteModal: false,
    alertModal: false,
    key: [],
    title: '',
    text: '',
    showOption: true,
  }),
  getters: {},
  actions: {
    activeCartModal(value) {
      this.cartModal = value;
      value ? this.key.push('cart') : this.key.splice(this.key.indexOf('cart'));
    },
    activeFavoriteModal(value) {
      this.favoriteModal = value;
      value
        ? this.key.push('favorite')
        : this.key.splice(this.key.indexOf('favorite'));
    },
    activeAll(value) {
      this.cartModal = value;
      this.favoriteModal = value;
      this.alertModal = value;
      this.key = [];
      this.title = '';
      this.text = '';
    },
    activeAlertModal(value) {
      this.alertModal = value;
      if (value) {
        this.key.push('alert');
      } else {
        this.key.splice(this.key.indexOf('alert'));
        this.title('');
        this.text('');
      }
    },
    active({ name, value }) {
      this[`${name}Modal`] = value;
      this.key.splice(this.key.indexOf(name), 1);
    },
  },
});
