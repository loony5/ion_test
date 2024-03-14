<template>
  <div class="menu-list">
    <button
      type="button"
      class="item"
      v-for="item in list"
      :key="item.key"
      @click="(e) => $emit(item.key, e)"
    >
      <span>{{ item.name }}</span>
      <img src="../assets/icons/arrow_right.png" class="arrow" />
    </button>
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
      background-size: cover;
    }

    span {
      font-size: 18px;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: -0.04em;
    }
  }
}
</style>
