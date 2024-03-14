<template>
  <swiper
    :modules="modules"
    :pagination="{ clickable: true }"
    pagination
    @swiper="swiper.onSwiper"
  >
    <swiper-slide
      v-for="slide in swiper.list"
      :key="slide.id"
      :style="{
        background: `url(${slide.image})`,
        'background-size': 'cover',
        'background-position': 'center center',
      }"
      class="slide-container"
    >
      <div :class="['contents-wrapper', 'reactive-container']">
        <Typography
          variant="display1"
          color="white"
          align="center"
          class="title"
        >
          {{ slide.title }}
        </Typography>
        <div class="content-wrapper">
          <button
            type="button"
            :class="['left', 'button-icon']"
            @click="swiper.onPrevSlide"
          />
          <Typography
            variant="body1"
            color="white"
            align="center"
            class="contents"
          >
            {{ slide.content }}
          </Typography>
          <Typography
            variant="body2"
            color="white"
            align="center"
            class="sub-contents"
          >
            METAPLANTS에서 멋진 식물을 찾아보세요!
          </Typography>
          <button
            type="button"
            :class="['right', 'button-icon']"
            @click="swiper.onNextSlide"
          />
        </div>
        <Button variant="round"> 더 알아보기 </Button>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import Typography from './Typography.vue';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    value: {
      type: Array,
      default: () => [],
      require: true,
    },
  },
  setup(props) {
    const windowWidth = ref(0);

    const swiperInstance = ref();
    const swiper = reactive({
      list: props.value,
      onSwiper: (swiper) => {
        swiperInstance.value = swiper;
      },
      onNextSlide: () => {
        swiperInstance.value.slideNext();
      },
      onPrevSlide: () => {
        swiperInstance.value.slidePrev();
      },
    });

    return {
      windowWidth,
      swiper,
      modules: [Pagination],
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/_mixin.scss';

.slide-container {
  height: 600px;
  width: 100vw;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @include mobile {
    height: 516px;
  }

  .contents-wrapper {
    padding-top: 86px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;

    @include mobile {
      padding-top: 134px;
    }

    @include tablet {
      gap: 20px;
    }

    .title {
      @include large-mobile {
        font-size: 32px;
        font-weight: 700;
        line-height: 42px;
        letter-spacing: -0.04em;
        text-align: center;
      }
    }

    .title {
      @include mobile {
        font-size: 32px;
        font-weight: 700;
        line-height: 42px;
        letter-spacing: -0.04em;
        text-align: center;
      }
    }

    .contents {
      @include mobile {
        display: none;
      }
    }

    .sub-contents {
      display: none;
      @include mobile {
        display: block;
      }
    }

    .content-wrapper {
      display: flex;
      align-items: center;
      gap: 30px;

      @include mobile {
        gap: 10px;
      }

      .left {
        min-width: 24px;
        width: 24px;
        height: 24px;
        background: url(/assets/icons/arrow_forward.png);
        background-size: cover;
      }

      .right {
        min-width: 24px;
        width: 24px;
        height: 24px;
        background: url(/assets/icons/arrow_forward.png);
        background-size: cover;
        transform: rotate(180deg);
      }
    }
  }
}

.swiper :deep(.swiper-pagination-horizontal) {
  bottom: 84px;

  @include tablet {
    bottom: 20px;
  }

  @include mobile {
    bottom: 40px;
  }
}

.swiper-horizontal :deep(.swiper-pagination-bullet) {
  width: 16px;
  height: 16px;
  border-radius: 50px;
  background: $gray4;
  transition: width 0.5s ease-in-out;
  opacity: 1;
  margin: 0 8px;

  @include mobile {
    width: 10px;
    height: 10px;
  }

  &.swiper-pagination-bullet-active {
    background: $sub1;
    width: 43px;
    border-radius: 50px;
    transition: width 0.5s ease-in-out;
  }
}
</style>
