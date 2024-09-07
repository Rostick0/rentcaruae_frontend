<template>
  <div class="wrapper">
    <LayoutHeader />
    <main class="main">
      <slot />
    </main>
    <LayoutFooter />
    <ModalCookie />
  </div>
</template>

<script setup>
await useCategory();
await useBrand();
await useGeneration();
useRentalPeriod();

const analyticalCookie = useCookie("analytical_cookie");

const initScripts = () => {
  setTimeout(() => {
    // useHead()
    useHead({
      script: [
        {
          src: "https://rentcaruae.push4site.com/sdk",
          async: true,
          defer: true,
        },
        {
          src: "https://www.googletagmanager.com/gtag/js?id=G-E3NBJ9Z8Q2",
          async: true,
        },
      ],
    });

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());

    gtag("config", "G-E3NBJ9Z8Q2");
  }, 3000);
};

onMounted(() => {
  if (analyticalCookie.value) {
    initScripts();
  }
});

watch(
  () => analyticalCookie.value,
  (newV) => {
    if (newV) initScripts();
  }
);
</script>

<style lang="scss" scoped>
.main {
  flex-grow: 1;
}
</style>
