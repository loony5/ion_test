<template>
  <ModalsContainer title="장바구니" :name="$props.name">
    <template v-slot:body>
      <div class="list">
        <OptionCard
          v-for="item in store.list"
          :key="item.id"
          :value="item"
          @order="updateOrder"
          check
        >
          <template v-slot:option>
            <CounterButton
              :value="item.count"
              @plus="updateCount.up(item.id)"
              @minus="updateCount.down(item.id)"
            />
          </template>
        </OptionCard>
      </div>
    </template>

    <template v-slot:bottom>
      <div class="order-wrapper">
        <div class="order">
          <Typography variant="heading3" class="title">
            결제 예정금액
          </Typography>

          <div class="order-info">
            <div class="text-wrapper">
              <Typography variant="body1">주문금액</Typography>
              <Typography variant="body1">{{ $price(order.price) }}</Typography>
            </div>
            <div class="text-wrapper">
              <Typography variant="body1">할인</Typography>
              <Typography variant="body1">
                {{ $price(order.discount) }}
              </Typography>
            </div>
            <div class="text-wrapper">
              <Typography variant="body1">배송비</Typography>
              <Typography variant="body1">
                {{ $price(order.deliveryFee) }}
              </Typography>
            </div>
          </div>
        </div>
        <div class="text-wrapper">
          <Typography variant="heading3" class="sub">
            총 결제예정금액
          </Typography>
          <Typography variant="heading4">
            {{ $price(order.totalPrice) }}
          </Typography>
        </div>
        <div class="button-wrapper">
          <Button variant="outline" @click="onClose">닫기</Button>
          <Button>결제하기</Button>
        </div>
      </div>
    </template>
  </ModalsContainer>
</template>

<script>
import { useCart } from '~/store/cart';
import { useDisplay } from '~/store/display';
import Typography from '../Typography.vue';
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
  },
  setup() {
    const store = useCart();
    const display = useDisplay();

    const order = reactive({
      value: [],
      deliveryFee: 3000,
      discount: 0,
      price: 0,
      totalPrice: 0,
    });

    const updateOrder = (id) => {
      const index = findOrderIndex(id);

      if (index === -1) {
        order.value.push(store.findProduct(id));
      } else {
        order.value.splice(index, 1);
      }
      updatePrice();
    };

    const updateCount = {
      up: (id) => {
        store.increment(id);

        const index = findOrderIndex(id);
        if (index === -1) return;
        order.value[index].count += 1;
        updatePrice();
      },
      down: (id) => {
        store.decrement(id);

        const index = findOrderIndex(id);

        if (index !== -1) {
          if (order.value[index].count - 1 === 0) {
            order.value.splice(index, 1);
          } else {
            order.value[index].count -= 1;
          }
        }

        updatePrice();
      },
    };

    const updatePrice = () => {
      if (order.value.length === 0) {
        order.price = 0;
        order.totalPrice = 0;

        return;
      }

      order.price = order.value.reduce((acc, cur) => {
        return cur.price * cur.count + acc;
      }, 0);

      order.totalPrice = order.price + order.deliveryFee + order.discount;
    };

    const findOrderIndex = (id) =>
      order.value.findIndex((row) => row.id === id);

    const onClose = () => {
      display.active({ name: 'cart', value: false });
    };

    return {
      store,
      order,
      updateOrder,
      updateCount,
      onClose,
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

.order-wrapper {
  display: flex;
  flex-direction: column;
  gap: 15px;

  .order {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0 0 15px;
    border-bottom: 1px solid rgba(222, 226, 230, 1);

    .title {
      font-size: 24px;
      font-weight: 700;
      line-height: 32px;
      letter-spacing: -0.04em;
    }

    .order-info {
      display: flex;
      flex-direction: column;
    }
  }
  .text-wrapper {
    display: flex;
    justify-content: space-between;

    .sub {
      font-size: 18px;
      font-weight: 500;
      line-height: 27px;
      letter-spacing: -0.04em;
    }
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
