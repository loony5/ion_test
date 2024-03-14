<template>
  <div class="main-container">
    <MainSwiper :value="data.slideList" />
    <NoticeSwiper :value="data.noticeList" />
    <div class="main-body">
      <div :class="['contents-container', 'reactive-container']">
        <Typography variant="heading4">PRODUCT LIST</Typography>
        <div class="product-list">
          <MainCard
            v-for="item in data.productList"
            :key="item.id"
            :value="item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import data from '~/src/meta.json';

export default {
  setup() {
    const windowWidth = ref(0);
    const desktopSize = computed(() => windowWidth.value >= 768);

    const product = reactive({
      list: data.productList,
    });

    onMounted(() => {
      windowWidth.value = window.innerWidth;

      window.onresize = () => {
        windowWidth.value = window.innerWidth;
      };
    });

    return {
      data,
      desktopSize,
      windowWidth,
      product,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/_mixin.scss';

.main-body {
  display: flex;
  justify-content: center;

  .contents-container {
    padding: 100px 0;
    display: flex;
    flex-direction: column;
    gap: 53px;

    @include large-mobile {
      padding: 100px 29px;
    }

    @include mobile {
      padding: 100px 29px;
    }

    .product-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      row-gap: 53px;

      @include small-desktop {
        justify-content: space-between;
      }
    }
  }
}
</style>
