<template>
  <ModalsContainer :title="display.title" :name="$props.name" class="alert">
    <template v-slot:body>
      <Typography variant="body2">
        {{ display.text }}
      </Typography>
    </template>
    <template v-slot:bottom v-if="display.showOption">
      <div class="button-wrapper">
        <Button variant="outline" @click="openCart">장바구니 더보기</Button>
        <Button @click="more">쇼핑 더하기</Button>
      </div>
    </template>
  </ModalsContainer>
</template>

<script>
import { useDisplay } from '~/store/display';

export default {
  props: {
    name: {
      type: String,
      default: '',
    },
  },
  setup() {
    const display = useDisplay();

    const openCart = () => {
      display.activeAll(false);
      display.activeCartModal(true);
    };

    const more = () => {
      display.activeAll(false);
    };

    return {
      display,
      openCart,
      more,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/_mixin.scss';

.modal-container.alert {
  width: 687px;

  @include small-desktop {
    width: 80%;
    height: auto;
  }

  @include tablet {
    width: 80%;
    height: auto;
  }

  @include large-mobile {
    width: 80%;
    height: auto;
  }

  @include mobile {
    width: 80%;
    height: auto;
  }
}

.button-wrapper {
  display: flex;
  gap: 13px;
  align-items: center;
  justify-content: flex-end;

  :deep(.normal) {
    padding: 7px 20px 8px;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: -0.04em;
  }

  :deep(.outline) {
    padding: 7px 20px 8px;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: -0.04em;
  }
}
</style>
