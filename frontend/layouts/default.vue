<template>
  <div class="wrapper">
    <!-- {{ route.path }} -->
    <LayoutHeader />
    <main class="main">
      <slot />
    </main>
    <LazyNuxtLazyHydrate whenVisible>
      <!-- <LazyLayoutFooter>
        <template #joinButton>
          <UiButton
            class="wrapper__footer_join"
            @click="open(), (authModalState = 'register')"
            variant="outlined"
            >{{ $t("joinUs") }}</UiButton
          >
        </template>
      </LazyLayoutFooter> -->
    </LazyNuxtLazyHydrate>
    <LazyModalCookie />
    <LazyAuthModal />
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
      {
        innerHTML: `<div><img src="https://mc.yandex.ru/watch/98356212" style="position:absolute; left:-9999px;" alt="" /></div>`,
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

  (function (m, e, t, r, i, k, a) {
    m[i] =
      m[i] ||
      function () {
        (m[i].a = m[i].a || []).push(arguments);
      };
    m[i].l = 1 * new Date();
    for (var j = 0; j < document.scripts.length; j++) {
      if (document.scripts[j].src === r) {
        return;
      }
    }
    (k = e.createElement(t)),
      (a = e.getElementsByTagName(t)[0]),
      (k.async = 1),
      (k.src = r),
      a.parentNode.insertBefore(k, a);
  })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

  ym(98356212, "init", {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
  });
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
  href: config.public.BASE_URL + route.path,
});

watch(
  () => route.path,
  () => {
    useHead({
      link: [setCanoncalLink()],
    });
  }
);

const localeHead = useLocaleHead({ key: "" });

useHead({
  htmlAttrs: {
    lang: localeHead.value.htmlAttrs?.lang,
  },
  link: [setCanoncalLink(), ...(localeHead.value.link || [])],
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
