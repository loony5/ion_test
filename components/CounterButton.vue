<template>
  <div class="count-button">
    <button class="control" @click="$emit('minus')">
      <img src="../assets/icons/minus.svg" />
    </button>
    <div class="count">
      <span>{{ props.value }}</span>
    </div>
    <button class="control" @click="$emit('plus')">
      <img src="../assets/icons/plus.svg" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    return {
      props,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/_mixin.scss';

.count-button {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .control,
  .count {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .control {
    background: $brand1;
    width: 45px;
    height: 45px;

    @include mobile {
      width: 30px;
      height: 30px;
    }
  }

  .count {
    border: 1px solid $gray3;
    width: 44px;
    height: 44px;

    @include mobile {
      width: 29px;
      height: 29px;
    }
    span {
      font-size: 18px;
      font-weight: 400;
      line-height: 21px;
      letter-spacing: -0.04em;
    }
  }
}
</style>
