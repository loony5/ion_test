<template>
  <swiper
    direction="vertical"
    class="notice-container"
    :modules="modules"
    :autoplay="{ delay: 2000 }"
    :pagination="{ clickable: false }"
    :loop="true"
    :loopedSlides="1"
  >
    <swiper-slide
      v-for="item in notice.list"
      :key="item.date"
      class="notice-slide"
    >
      <div :class="['item-wrapper', 'reactive-container']">
        <div class="category">
          <Typography variant="body1">{{ `[${item.category}]` }}</Typography>
        </div>
        <div class="label">
          <Typography variant="body1">{{ item.label }}</Typography>
        </div>
        <div class="date">
          <Typography variant="body1">
            {{ $dayjs(item.date.toString()).format('YYYY-MM-DD') }}
          </Typography>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    value: {
      type: Array,
      default: () => ({}),
      require: true,
    },
  },
  setup(props) {
    const windowWidth = ref(0);
    const desktopSize = computed(() => windowWidth.value >= 768);

    const notice = reactive({
      list: props.value,
    });

    onMounted(() => {
      windowWidth.value = window.innerWidth;

      window.onresize = () => {
        windowWidth.value = window.innerWidth;
      };
    });

    return {
      desktopSize,
      windowWidth,
      notice,
      modules: [Autoplay],
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/_mixin.scss';

.notice-container {
  height: 77px;
  background: #f7f7f7;
  display: flex;
  align-items: center;
  width: 100%;

  .notice-slide {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .item-wrapper {
    display: flex;
    gap: 50px;
    align-items: center;
    justify-content: space-between;

    @include mobile {
      gap: 10px;
    }

    .category,
    .label,
    .date {
      text-wrap: nowrap;
    }

    .label {
      width: 100%;
    }
    .date {
      text-align: right;
    }
  }
}
</style>
