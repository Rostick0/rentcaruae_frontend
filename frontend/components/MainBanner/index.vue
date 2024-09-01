<template>
  <div class="banner">
    <div class="container">
      <div class="banner__container">
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
            alt="RentCarUAE"
            decoding="async"
            loading="lazy"
            fit="contain"
          />
        </div>
      </div>
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
      name: "Cabrio",
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
  padding-top: 48px;
  margin-bottom: 43px;
  position: relative;
  overflow: hidden;

  &__container {
    display: flex;
    align-items: center;
  }

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
    right: 0;
  }

  &__img {
    max-width: 708px;
    width: 50vw;
  }

  @media (max-width: 1280px) {
    &__img {
      width: 46vw;
    }
  }

  @media (max-width: 1024px) {
    &__subtitle {
      font-size: 20px;
    }

    &__left {
      max-width: 55vw;
    }

    &__right {
      right: -64px;
    }

    &__img {
      width: 50vw;
    }
  }

  @media (max-width: 680px) {
    &__container {
      align-items: flex-start;
    }

    &__subtitle {
      margin-bottom: 216px;
    }

    &__left {
      max-width: 100%;
    }

    &__search {
      margin-bottom: 20px;
      width: 100%;
    }

    &__right {
      top: 240px;
      right: 0;
      transform: translateY(-50%);
    }

    &__img {
      width: 495px;
    }
  }

  @media (max-width: 576px) {
    &__right {
      right: -10vw;
    }
  }

  @media (max-width: 480px) {
    &__right {
      top: 260px;
      right: calc(-20vw - 100px);
    }
  }

  @media (max-width: 340px) {
    &__right {
      top: 300px;
      right: calc(-30vw - 100px);
    }
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
