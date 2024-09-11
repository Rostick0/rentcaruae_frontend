<template>
  <div class="wrapper">
    <AmpLayoutHeader />
    <main class="main">
      <slot />
    </main>
    <LayoutFooter>
      <template #joinButton>
        <NuxtLink class="d-flex" to="/?auth-modal=true">
          <UiButton class="wrapper__footer_join" variant="outlined"
            >Join us</UiButton
          >
        </NuxtLink>
      </template>
    </LayoutFooter>
  </div>
</template>

<script setup>
await useCategory();
await useBrand();
await useGeneration();
useRentalPeriod();

// const analyticalCookie = useCookie("analytical_cookie");

// const initScripts = () => {
//   useHead({
//     script: [
//       {
//         src: "https://rentcaruae.push4site.com/sdk",
//         async: true,
//         defer: true,
//       },
//       {
//         src: "https://www.googletagmanager.com/gtag/js?id=G-E3NBJ9Z8Q2",
//         async: true,
//       },
//     ],
//     noscript: [
//       {
//         innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N9LMXWF4" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
//         tagPosition: "bodyClose",
//       },
//     ],
//   });

//   window.dataLayer = window.dataLayer || [];
//   function gtag() {
//     dataLayer.push(arguments);
//   }
//   gtag("js", new Date());

//   gtag("config", "G-E3NBJ9Z8Q2");

//   (function (w, d, s, l, i) {
//     w[l] = w[l] || [];
//     w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
//     var f = d.getElementsByTagName(s)[0],
//       j = d.createElement(s),
//       dl = l != "dataLayer" ? "&l=" + l : "";
//     j.async = true;
//     j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
//     f.parentNode.insertBefore(j, f);
//   })(window, document, "script", "dataLayer", "GTM-N9LMXWF4");
// };

// onMounted(() => {
//   if (analyticalCookie.value) {
//     nextTick(() => {
//       setTimeout(() => {
//         initScripts();
//       }, 4000);
//     });
//   }
// });

// watch(
//   () => analyticalCookie.value,
//   (newV) => {
//     if (newV) initScripts();
//   }
// );
const route = useRoute();
const config = useRuntimeConfig();

useHead({
  link: [
    {
      rel: "canonical",
      href: config.public.BASE_URL + route.fullPath.replace("/amp", ""),
    },
  ],
});
</script>

<style lang="scss" scoped>
.wrapper {
  &__footer {
    &_join {
      padding: 6px 16px;
      font-weight: 700;
      width: fit-content;
    }
  }
}

.main {
  flex-grow: 1;
}
</style>
