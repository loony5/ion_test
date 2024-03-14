<template>
  <ModalsContainer title="찜목록" :name="$props.name">
    <template v-slot:body>
      <div class="list">
        <OptionCard
          v-for="item in storeFavorite.list"
          :key="item.id"
          :value="item"
        >
          <template v-slot:option>
            <Button variant="round" :value="item.count" @click="addCart(item)">
              <template v-slot:icon>
                <img src="../../assets/icons/cart_line.svg" />
              </template>
              장바구니추가
            </Button>
          </template>
        </OptionCard>
      </div>
    </template>
  </ModalsContainer>
</template>

<script>
import { useFavorite } from '~/store/favorite';
import { useDisplay } from '~/store/display';
import { useCart } from '~/store/cart';

export default {
  props: {
    name: {
      type: String,
      default: '',
    },
  },
  setup() {
    const storeFavorite = useFavorite();
    const storeCart = useCart();
    const display = useDisplay();
    const addCart = (value) => {
      display.title = '장바구니 추가';

      display.text = storeCart.add(value)
        ? '장바구니에 정상적으로 추가되었습니다.'
        : '이미 장바구니에 있습니다.';
      display.activeAlertModal(true);
    };

    return {
      storeFavorite,
      storeCart,
      addCart,
    };
  },
};
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
