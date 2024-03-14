<template>
  <div
    :class="[
      'icon-wrapper',
      badge && 'badge',
      !!count && 'count',
      button && 'button',
    ]"
  >
    <img :src="icons[name]" class="icon" />
    <div :class="!!count && 'count-wrapper'" v-if="!!count">
      {{ count }}
    </div>
  </div>
</template>

<script>
import { filename } from 'pathe/utils';

export default {
  props: {
    name: {
      type: String,
      require: true,
    },
    badge: {
      type: Boolean,
      default: false,
    },
    count: {
      type: Number,
      default: 0,
    },
    button: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const glob = import.meta.glob('~/assets/icons/*.png', { eager: true });
    const icons = Object.fromEntries(
      Object.entries(glob).map(([key, value]) => [filename(key), value.default])
    );

    return {
      icons,
    };
  },
};
</script>

<style lang="scss" scoped>
.icon-wrapper {
  display: flex;

  &.badge {
    width: 32px;
    height: 32px;
    justify-content: center;
    align-items: flex-end;
    position: relative;
  }

  &.count {
    justify-content: flex-start;
  }

  &.button {
    cursor: pointer;
  }
}

.icon {
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.count-wrapper {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: $sub3;
  color: $white;
  font-size: 12px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: -0.015em;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Pretendard';
  position: absolute;
  right: 0;
  top: 4px;
}
</style>
