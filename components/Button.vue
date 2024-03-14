<template>
  <button type="button" :class="props.variant" class="custom-button">
    <slot name="icon" />
    <Typography
      variant="body1"
      class="text"
      :color="props.variant === 'outline' ? 'gray1' : 'white'"
    >
      <slot />
    </Typography>
  </button>
</template>

<script>
import Typography from './Typography.vue';

export default {
  props: {
    variant: {
      type: String,
      default: 'normal',
      validator(value) {
        return ['normal', 'outline', 'round'].includes(value);
      },
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

.custom-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: fit-content;
}

.normal {
  padding: 12px 20px 14px;
  background: $brand1;
  border-radius: 4px;

  @include mobile {
    padding: 7px 20px 8px;
  }
}

.outline {
  padding: 11px 20px 12px;
  border: 1px solid rgba(222, 226, 230, 1);
  border-radius: 4px;

  @include mobile {
    padding: 7px 20px 8px;
  }
}

.round {
  background: $brand1;
  padding: 11px 20px 12px 20px;
  border-radius: 89px;

  @include mobile {
    padding: 8px 20px 8px 20px;
  }
}

.text {
  @include mobile {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: -0.04em;
  }
}
</style>
