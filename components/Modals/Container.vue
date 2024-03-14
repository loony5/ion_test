<template>
  <div class="modal-container" v-if="modalCheck()">
    <div class="header">
      <Typography variant="heading3">{{ $props.title }}</Typography>
      <button type="button" class="button-icon" @click="onClose">
        <img src="../../assets/icons/close.png" class="close" />
      </button>
    </div>
    <div class="body">
      <slot name="body" />
    </div>
    <div class="bottom">
      <slot name="bottom" />
    </div>
  </div>
</template>

<script>
import { useDisplay } from '~/store/display';

export default {
  props: {
    title: {
      type: String,
      defualt: '',
    },
    name: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const store = useDisplay();

    const onClose = () => {
      store.active({ name: props.name, value: false });
    };
    const modalCheck = () => {
      if (store.key.includes(props.name)) {
        if (props.name === 'cart') {
          return store.cartModal;
        }

        if (props.name === 'favorite') {
          return store.favoriteModal;
        }

        if (props.name === 'alert') {
          return store.alertModal;
        }
      }
    };
    return {
      onClose,
      store,
      modalCheck,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/_mixin.scss';

.modal-container {
  background: $white;
  width: 1200px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  padding: 0 30px 19px;
  box-shadow: $shadow1;
  border-radius: 8px;
  z-index: 999;

  @include small-desktop {
    width: 80%;
    height: auto;
    overflow-y: auto;
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

  .header {
    padding: 40px 0 8px;
    border-bottom: 1px solid $gray3;
    display: flex;
    justify-content: space-between;

    .close {
      width: 24px;
      height: 24px;
    }
  }
  .body {
    padding: 15px 0;
    max-height: 400px;
    overflow: auto;

    @include mobile {
      max-height: 200px;
    }
  }

  ::-webkit-scrollbar {
    width: 10px;
    // width: 6px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: none;
  }

  ::-webkit-scrollbar-thumb {
    background-color: $gray3;
    border-radius: 12px;
    background-clip: padding-box;
    border: 3px solid transparent;

    &:hover {
      background-color: $gray4;
    }
  }

  .bottom {
    padding: 15px 0 0;
  }
}
</style>
