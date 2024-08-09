<template>
  <div class="banner">
    <div class="banner__left">
      <h1 class="banner__title h1">Rent a car in Dubai</h1>
      <h2 class="banner__subtitle">
        Book a car for a day or a month without commission
      </h2>
      <MainSearch class="banner__search" />
      <div class="banner__links">
        <NuxtLink
          v-for="link in links"
          class="banner__link d-flex"
          :key="link.name"
          :to="link.link"
        >
          <UiButton variant="outlined">{{ link.name }}</UiButton>
        </NuxtLink>
      </div>
    </div>
    <div class="banner__right">
      <LazyNuxtImg
        class="banner__img"
        src="images/blue_lamborghini.png"
        decoding="async"
        loading="lazy"
        fit="contain"
      />
    </div>
  </div>
</template>

<script setup>
const currentCity = useState("currentCity");

const links = computed(() => {
  const link = `/${currentCity.value?.name ?? "all"}/type/`;

  return [
    {
      name: "Economy",
    },
    {
      name: "VAN",
    },
    {
      name: "SUV",
    },
    {
      name: "Convertible",
    },
    {
      name: "Business",
    },
    {
      name: "Luxury",
    },
  ].map(({ name }) => ({
    name,
    link: convertNameToUrl(link + name),
  }));
});
</script>

<style lang="scss" scoped>
.banner {
  display: flex;
  align-items: center;
  padding-top: 48px;
  margin-bottom: 43px;
  position: relative;

  &__left {
    position: relative;
    z-index: 1;
  }

  &__title {
    margin-bottom: 24px;
  }

  &__subtitle {
    font-weight: 400;
    margin-bottom: 48px;
  }

  &__search {
    margin-bottom: 41px;
    width: 92%;
  }

  &__links {
    display: flex;
    flex-wrap: wrap;
    grid-gap: 15px;
  }

  &__right {
    flex-grow: 1;
    position: absolute;
    right: -160px;
  }

  &__img {
    max-width: 708px;
    // width: 100%;
    width: 50vw;
  }
}
</style>

<style lang="scss">
.banner {
  &__link {
    .btn {
      font-weight: 700;
      // padding: 12px 8px;
    }
  }
}
</style>
