<template>
  <div>
    <div :class="['drawer-container', menu.open && 'open']" v-if="mobileSize">
      <div>
        <div class="header">
          <button
            type="button"
            :class="['back', 'button-icon']"
            @click="menu.handleClose"
          />
          <img src="~/assets/logo.png" />
        </div>
        <MenuList
          :list="menu.list"
          @cart="openCartList"
          @favorite="openFavoriteList"
        />
      </div>
    </div>

    <div class="nav-wrapper">
      <div :class="['nav-bar', 'reactive-container']">
        <button
          type="button"
          v-if="mobileSize"
          :class="['menu_drawer', 'button-icon']"
          @click="menu.handleOpen"
        />
        <img src="~/assets/logo.png" />
        <div class="menu" v-if="!mobileSize">
          <Icon
            name="shopping_cart"
            :count="cart.list.length"
            @click="openCartList"
            button
            badge
          />
          <Icon
            name="favorite"
            :count="favorite.list.length"
            @click="openFavoriteList"
            button
            badge
          />
        </div>
      </div>
    </div>
    <slot />

    <div class="bottom">
      <img src="~/assets/logo_white.png" class="logo-white" />
      <p class="text">©2024 by metaplants. Proudly created with Metaflyer.io</p>
    </div>

    <ModalsCart name="cart" />
    <ModalsFavorite name="favorite" />
    <ModalsAlert name="alert" />
  </div>
</template>

<script>
import { useCart } from '~/store/cart.js';
import { useFavorite } from '~/store/favorite.js';
import { useDisplay } from '~/store/display';

export default {
  setup() {
    const cart = useCart();
    const favorite = useFavorite();
    const display = useDisplay();

    const windowWidth = ref(0);
    const mobileSize = computed(() => windowWidth.value < 550);
    const menu = reactive({
      open: false,
      handleOpen: () => {
        menu.open = true;
      },
      handleClose: () => {
        menu.open = false;
      },
      list: [
        {
          key: 'cart',
          name: '장바구니',
          active: false,
        },
        {
          key: 'favorite',
          name: '찜목록',
          active: false,
        },
      ],
    });

    const active = computed(() => display.key.length);

    watch(
      () => active.value,
      (value) => {
        document.body.style.overflow = value === 0 ? 'auto' : 'hidden';
      }
    );

    onMounted(() => {
      windowWidth.value = window.innerWidth;

      window.onresize = () => {
        windowWidth.value = window.innerWidth;
      };
    });

    const openCartList = (e) => {
      display.activeCartModal(true);
    };

    const openFavoriteList = (e) => {
      display.activeFavoriteModal(true);
    };

    return {
      mobileSize,
      windowWidth,
      menu,
      cart,
      favorite,
      openCartList,
      openFavoriteList,
      active,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/_mixin.scss';

.nav-wrapper {
  display: flex;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 2;
  background: $white;
}

.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  // position: relative;

  @include mobile {
    justify-content: center;
    height: 56px;
  }
}

.drawer-container {
  background: $white;
  height: 100%;
  display: inline-block;
  position: fixed;
  width: 100%;
  left: -600px;
  transition: all 0.5s ease-in-out;
  z-index: 99;
  margin: 12px 0 0;
  text-align: center;

  &.open {
    display: inline-block;
    left: 0;
    overflow: hidden;
    transition: all 0.5s ease-in-out;
  }

  .header {
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;

    .back {
      width: 40px;
      height: 40px;
      position: absolute;
      left: 22px;
      background: url(/assets/icons/back.png);
      background-size: cover;
    }
  }
}

.menu_drawer {
  width: 26px;
  height: 20px;
  position: absolute;
  left: 29px;
  background: url(/assets/icons/btn_all_menu.png);
  background-size: cover;
}

.menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.bottom {
  height: 386px;
  background: #333333;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;

  @include mobile {
    padding: 0 29px;
  }

  .logo-white {
    height: 80px;
  }

  .text {
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: -0.015em;
    color: $white;
    text-align: center;
  }
}
</style>
