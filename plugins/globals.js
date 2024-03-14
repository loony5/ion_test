export default defineNuxtPlugin(() => {
  return {
    provide: {
      price: (value) =>
        `${
          value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0
        }원`,
    },
  };
});
