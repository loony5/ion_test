<template>
  <span :class="[variant, color, align]">
    <slot />
  </span>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: 'body1',
      validator(value) {
        return [
          'display1',
          'heading1',
          'heading2',
          'heading3',
          'heading4',
          'body1',
          'body2',
          'button',
          'link',
        ].includes(value);
      },
    },
    color: {
      type: String,
      default: 'gray1',
      validator(value) {
        return [
          'brand1',
          'brand2',
          'sub1',
          'sub2',
          'sub3',
          'gray1',
          'gray2',
          'gray3',
          'gray4',
          'white',
        ].includes(value);
      },
    },
    align: {
      type: String,
      default: 'left',
      validator(value) {
        return ['left', 'right', 'center'];
      },
    },
  },
};
</script>
