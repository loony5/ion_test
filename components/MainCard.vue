<template>
  <div class="main-card-container">
    <div class="image-wrapper">
      <img :src="product.image" class="image" />
      <div class="button-wrapper">
        <button type="button" @click="onCart">
          <img src="../assets/icons/cart_circle.png" class="button-icon" />
        </button>
        <button type="button" @click="onFavorite">
          <img src="../assets/icons/favorite_circle.png" class="button-icon" />
        </button>
      </div>
    </div>
    <div class="contents">
      <Typography variant="heading3" class="label">
        {{ product.label }}
      </Typography>
      <Typography variant="heading4" class="price">
        {{ $price(product.price) }}
      </Typography>
    </div>
  </div>
</template>

<script>
import { useDisplay } from '~/store/display';
import { useCart } from '~/store/cart.js';
import { useFavorite } from '~/store/favorite.js';

export default {
  props: {
    value: {
      type: Object,
      default: () => ({}),
      require: true,
    },
  },
  setup(props) {
    const product = props.value;
    const cart = useCart();
    const favorite = useFavorite();
    const display = useDisplay();

    const onCart = () => {
      display.activeAlertModal(true);
      display.title = '장바구니 추가';
      display.text = cart.add(product)
        ? '장바구니에 정상적으로 추가되었습니다.'
        : '이미 장바구니에 있습니다.';
    };
    const onFavorite = () => {
      favorite.add(product);
    };

    return {
      product,
      onCart,
      onFavorite,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/_mixin.scss';

.main-card-container {
  display: flex;
  flex-direction: column;
  width: 360px;

  @include tablet {
    width: 280px;
  }

  @include large-mobile {
    width: 200px;
  }

  @include mobile {
    width: 150px;
  }

  .image-wrapper {
    position: relative;

    .button-wrapper {
      position: absolute;
      bottom: 20px;
      right: 20px;
      display: flex;
      gap: 10px;

      @include large-mobile {
        gap: 5px;
        bottom: 5px;
        right: 5px;
      }

      @include mobile {
        gap: 5px;
        bottom: 5px;
        right: 5px;
      }

      .button-icon {
        width: 45px;
        height: 45px;
        background-size: contain;

        @include large-mobile {
          width: 32px;
          height: 32px;
          background-size: contain;
        }

        @include mobile {
          width: 24px;
          height: 24px;
          background-size: contain;
        }
      }
    }
  }

  .image {
    width: 360px;
    height: 360px;
    object-fit: cover;

    @include tablet {
      height: 280px;
      width: 280px;
    }

    @include large-mobile {
      width: 200px;
      height: 200px;
    }

    @include mobile {
      width: 150px;
      height: 150px;
    }
  }

  .contents {
    display: flex;
    flex-direction: column;
    padding: 32px 0;
    gap: 8px;

    @include large-mobile {
      padding: 16px 0;
    }

    @include mobile {
      padding: 16px 0;
    }

    .label {
      @include large-mobile {
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        letter-spacing: -0.015em;
      }

      @include mobile {
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        letter-spacing: -0.015em;
      }
    }

    .price {
      @include large-mobile {
        font-size: 16px;
        font-weight: 600;
        line-height: 24px;
        letter-spacing: -0.015em;
      }

      @include mobile {
        font-size: 16px;
        font-weight: 600;
        line-height: 24px;
        letter-spacing: -0.015em;
      }
    }
  }
}
</style>
