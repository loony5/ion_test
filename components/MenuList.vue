<template>
  <div class="menu-list">
    <div class="item" v-for="item in list" :key="item.key">
      <span>{{ item.name }}</span>
      <button
        type="button"
        :class="['arrow', 'button-icon']"
        @click="(e) => $emit(item.key, e)"
      ></button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {},
};
</script>

<style lang="scss" scoped>
.menu-list {
  padding: 12px 26px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .arrow {
      width: 18px;
      height: 18px;
      background: url(/assets/icons/arrow_right.png);
      background-size: cover;
    }
  }
}
</style>
