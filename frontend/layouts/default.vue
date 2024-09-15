<template>
  <div class="wrapper">
    <!-- {{ route.path }} -->
    <LayoutHeader />
    <main class="main">
      <slot />
    </main>
    <LazyNuxtLazyHydrate whenVisible>
      <LazyLayoutFooter>
        <template #joinButton>
          <UiButton
            class="wrapper__footer_join"
            @click="open(), (authModalState = 'register')"
            variant="outlined"
            >Join us</UiButton
          >
        </template>
      </LazyLayoutFooter>
    </LazyNuxtLazyHydrate>
    <LazyModalCookie />
  </div>
</template>

<script setup>
await useCategory();
await useBrand();
await useGeneration();
useRentalPeriod();

const route = useRoute();
const config = useRuntimeConfig();

const authModalState = useState("authModalState");

const { open } = useModal({
  name: "auth-modal",
});

const analyticalCookie = useCookie("analytical_cookie");

const initScripts = () => {
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
    noscript: [
      {
        innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N9LMXWF4" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        tagPosition: "bodyClose",
      },
    ],
  });

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());

  gtag("config", "G-E3NBJ9Z8Q2");

  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != "dataLayer" ? "&l=" + l : "";
    j.async = true;
    j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, "script", "dataLayer", "GTM-N9LMXWF4");
};

onMounted(() => {
  if (analyticalCookie.value) {
    nextTick(() => {
      setTimeout(() => {
        initScripts();
      }, 5000);
    });
  }
});

watch(
  () => analyticalCookie.value,
  (newV) => {
    if (newV) initScripts();
  }
);

const setCanoncalLink = () => ({
  rel: "canonical",
  href: config.public.BASE_URL + route.path + (route.path === "/" ? "" : "/"),
});

watch(
  () => route.path,
  (newV) => {
    useHead({
      link: [setCanoncalLink()],
    });
  }
);

useHead({
  link: [setCanoncalLink()],
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
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
