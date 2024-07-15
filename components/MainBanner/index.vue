<template>
  <div class="banner">
    <div class="banner__left">
      <h1 class="banner__title h1">Rent a car in Dubai</h1>
      <h2 class="banner__subtitle">
        Book a car for a day or a month without commission
      </h2>
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
        loading="lazy"
        fit="contain"
      />
    </div>
  </div>
</template>

<script setup>
const links = [
  {
    name: "Economy",
    link: "/",
  },
  {
    name: "VAN",
    link: "/",
  },
  {
    name: "SUV",
    link: "/",
  },
  {
    name: "Convertible",
    link: "/",
  },
  {
    name: "Business",
    link: "/",
  },
  {
    name: "Luxury",
    link: "/",
  },
];
</script>

<style lang="scss" scoped>
.banner {
  display: flex;
  margin-bottom: 40px;

  &__title {
    margin-bottom: 20px;
  }

  &__subtitle {
    margin-bottom: 40px;
  }

  &__links {
    display: flex;
    flex-wrap: wrap;
    grid-gap: 16px;
  }

  &__right {
    flex-grow: 1;
  }

  &__img {
    width: 100%;
  }
}
</style>
