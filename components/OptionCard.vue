<template>
  <div class="option-card">
    <div class="check-wrapper" v-if="$props.check">
      <input
        type="checkbox"
        name="checker"
        :id="product.id"
        v-model="order"
        @change="$emit('order', product.id)"
      />
      <label :for="product.id"></label>
    </div>
    <div class="contents-wrapper">
      <img :src="product.image" class="image" />
      <div class="contents">
        <div class="info-wrapper">
          <div class="info">
            <Typography variant="heading3" class="label">
              {{ product.label }}
            </Typography>
            <Typography variant="heading4" class="price">
              {{ $price(product.price) }}
            </Typography>
          </div>
          <slot name="option" />
        </div>

        <div class="button-wrapper">
          <button
            type="button"
            class="button-icon"
            v-if="!favorite"
            @click="product.onFavorite"
          >
            <img src="../assets/icons/favorite_line.png" class="favorite" />
          </button>
          <button
            type="button"
            class="'button-icon"
            v-else
            @click="product.onUnFavorite"
          >
            <img
              src="../assets/icons/favorite_line_active.png"
              class="favorite"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useFavorite } from '~/store/favorite';

export default {
  props: {
    value: {
      type: Object,
      default: () => ({}),
      require: true,
    },
    check: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const favoriteStore = useFavorite();
    const product = reactive({
      ...props.value,
      onUnFavorite: () => {
        favoriteStore.delete(props.value.id);
      },
      onFavorite: () => {
        favoriteStore.add(props.value);
      },
    });
    const favorite = computed(() =>
      favoriteStore.findByProductId(props.value.id)
    );
    const order = ref(false);

    return {
      product,
      favorite,
      order,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/_mixin.scss';

.option-card {
  border: 1px solid rgba(222, 226, 230, 1);
  padding: 30px 23px 23px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .contents-wrapper {
    display: flex;
    flex: 1;
    gap: 16px;
    position: relative;

    @include large-mobile {
      flex-direction: column;
    }

    @include mobile {
      flex-direction: column;
    }

    .image {
      width: 200px;
      height: 200px;
      object-fit: cover;

      @include mobile {
        width: 77px;
        height: 77px;
      }
    }

    .contents {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      .info-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        gap: 18px;

        .info {
          display: flex;
          flex-direction: column;
          gap: 10px;

          .label {
            @include mobile {
              font-size: 24px;
              font-weight: 700;
              line-height: 32px;
              letter-spacing: -0.04em;
            }
          }

          .price {
            @include mobile {
              font-size: 18px;
              font-weight: 500;
              line-height: 27px;
              letter-spacing: -0.04em;
            }
          }
        }
      }
    }

    .button-wrapper {
      position: absolute;
      right: 0;
      top: 0;
    }

    .favorite {
      width: 24px;
      height: 24px;
      background-size: cover;
    }
  }
}
</style>
