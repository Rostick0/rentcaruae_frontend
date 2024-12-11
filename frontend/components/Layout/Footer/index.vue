<template>
  <footer class="footer" id="footer">
    <div class="container">
      <div class="footer__container">
        <NuxtLink class="footer__top" :to="$localePath('/')'">
          <Logo class="footer__logo" />
        </NuxtLink>

        <div class="footer__center">
          <div class="footer-item">
            <div class="footer-item__title text-ui">{{ $t("rentCar") }}</div>
            <div class="footer-item__list">
              <NuxtLink
                class="footer-item__link"
                v-for="city in cities"
                :to="$localePath(convertNameToUrl(`/${city.name}/`))"
                @click="currentCity = city"
                :key="city.id"
                >{{ $t(city.name) }}</NuxtLink
              >
            </div>
          </div>

          <div class="footer-item">
            <div class="footer-item__title text-ui">{{ $t("categories") }}</div>
            <div class="footer-item__list">
              <NuxtLink
                class="footer-item__link"
                v-for="category in categories"
                :key="category.id"
                :to="
                  $localePath(
                    convertNameToUrl(
                      `/${currentCity?.name ?? 'all'}/type/${category?.name}/`
                    )
                  )
                "
                >{{ $t("categoriesList." + category.name) }}</NuxtLink
              >
            </div>
          </div>

          <div class="footer-item">
            <div class="footer-item__title text-ui">{{ $t("brands") }}</div>
            <div class="footer-item__list">
              <NuxtLink
                class="footer-item__link"
                v-for="brand in brandsLimit"
                :key="brand.id"
                :to="
                  $localePath(
                    convertNameToUrl(
                      `/${currentCity?.name ?? 'all'}/brand/${brand?.name}/`
                    )
                  )
                "
                >{{ brand.name }}</NuxtLink
              >
            </div>
          </div>

          <div class="footer-item">
            <div class="footer-item__title text-ui">{{ $t("bodyTypes") }}</div>
            <div class="footer-item__list">
              <NuxtLink
                class="footer-item__link"
                v-for="generation in generations"
                :key="generation.id"
                :to="
                  $localePath(
                    convertNameToUrl(
                      `/${currentCity?.name ?? 'all'}/body/${generation?.name}/`
                    )
                  )
                "
                >{{ $t("bodyTypesList." + generation.name) }}</NuxtLink
              >
            </div>
          </div>

          <div class="footer-item">
            <div class="footer-item__title text-ui">
              {{ $t("rentalByPeriod") }}
            </div>
            <div class="footer-item__list">
              <NuxtLink
                class="footer-item__link"
                v-for="period in rentalPeriods"
                :key="period?.link"
                :to="$localePath(period?.link)"
                >{{ $t("rentalPeriod." + period?.name) }}</NuxtLink
              >
            </div>
          </div>

          <div class="footer-item">
            <div class="footer-item__title text-ui">{{ $t("aboutUs") }}</div>
            <div class="footer-item__list">
              <NuxtLink
                class="footer-item__link"
                :to="$localePath('/blogs/')"
                >{{ $t("blog") }}</NuxtLink
              >
              <NuxtLink
                class="footer-item__link"
                :to="$localePath('/privacy_policy/')"
                >{{ $t("privacyPolicy") }}</NuxtLink
              >
              <NuxtLink
                class="footer-item__link"
                :to="$localePath('/terms_of_service/')"
                >{{ $t("termsOfUse") }}</NuxtLink
              >
              <NuxtLink
                class="footer-item__link"
                :to="$localePath('/sitemap/')"
                >{{ $t("siteMap") }}</NuxtLink
              >
              <!-- <NuxtLink class="footer-item__link" :to="localePath('/amp/sitemap/')"
                >Site map amp</NuxtLink
              > -->
              <NuxtLink class="footer-item__link" :to="$localePath('/faq/')">{{
                $t("FAQ")
              }}</NuxtLink>
              <a class="footer-item__link" href="mailto:hello@rentcaruae.com">{{
                $t("contactUs")
              }}</a>
            </div>
          </div>

          <div class="footer-item">
            <div class="footer-item__title text-ui">{{ $t("followUs") }}</div>
            <div class="footer-item__btns">
              <!-- <a class="footer-item__icon" href="#">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 18.8C14.5 18.8 13.2 17.6 13.2 16C13.2 14.5 14.4 13.2 16 13.2C17.5 13.2 18.8 14.4 18.8 16C18.8 17.5 17.5 18.8 16 18.8Z"
                    fill="#221EE3"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M19.4 9.2H12.6C11.8 9.3 11.4 9.4 11.1 9.5C10.7 9.6 10.4 9.8 10.1 10.1C9.86261 10.3374 9.75045 10.5748 9.61489 10.8617C9.59983 10.8936 9.58448 10.9261 9.56862 10.9593C9.52369 11.0533 9.48336 11.1496 9.44752 11.2475C9.34291 11.5333 9.2 11.9238 9.2 12.6V19.4C9.3 20.2 9.4 20.6 9.5 20.9C9.6 21.3 9.8 21.6 10.1 21.9C10.3374 22.1374 10.5748 22.2495 10.8617 22.3851C10.8936 22.4002 10.9261 22.4155 10.9593 22.4314C11.0533 22.4763 11.1496 22.5166 11.2475 22.5525C11.5333 22.6571 11.9238 22.8 12.6 22.8H19.4C20.2 22.7 20.6 22.6 20.9 22.5C21.3 22.4 21.6 22.2 21.9 21.9C22.1374 21.6626 22.2495 21.4252 22.3851 21.1383C22.4002 21.1064 22.4155 21.0739 22.4314 21.0407C22.4763 20.9467 22.5166 20.8504 22.5525 20.7525C22.6571 20.4667 22.8 20.0762 22.8 19.4V12.6C22.7 11.8 22.6 11.4 22.5 11.1C22.4 10.7 22.2 10.4 21.9 10.1C21.6626 9.86261 21.4252 9.75045 21.1383 9.61488C21.1065 9.59984 21.0739 9.58448 21.0407 9.56862C20.9467 9.52368 20.8504 9.48335 20.7525 9.44752C20.4667 9.3429 20.0762 9.2 19.4 9.2ZM16 11.7C13.6 11.7 11.7 13.6 11.7 16C11.7 18.4 13.6 20.3 16 20.3C18.4 20.3 20.3 18.4 20.3 16C20.3 13.6 18.4 11.7 16 11.7ZM21.4 11.6C21.4 12.1523 20.9523 12.6 20.4 12.6C19.8477 12.6 19.4 12.1523 19.4 11.6C19.4 11.0477 19.8477 10.6 20.4 10.6C20.9523 10.6 21.4 11.0477 21.4 11.6Z"
                    fill="#221EE3"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0 8C0 3.58172 3.58172 0 8 0H24C28.4183 0 32 3.58172 32 8V24C32 28.4183 28.4183 32 24 32H8C3.58172 32 0 28.4183 0 24V8ZM12.6 7.7H19.4C20.3 7.8 20.9 7.9 21.4 8.1C22 8.4 22.4 8.6 22.9 9.1C23.4 9.6 23.7 10.1 23.9 10.6C24.1 11.1 24.3 11.7 24.3 12.6V19.4C24.2 20.3 24.1 20.9 23.9 21.4C23.6 22 23.4 22.4 22.9 22.9C22.4 23.4 21.9 23.7 21.4 23.9C20.9 24.1 20.3 24.3 19.4 24.3H12.6C11.7 24.2 11.1 24.1 10.6 23.9C10 23.6 9.6 23.4 9.1 22.9C8.6 22.4 8.3 21.9 8.1 21.4C7.9 20.9 7.7 20.3 7.7 19.4V12.6C7.8 11.7 7.9 11.1 8.1 10.6C8.4 10 8.6 9.6 9.1 9.1C9.6 8.6 10.1 8.3 10.6 8.1C11.1 7.9 11.7 7.7 12.6 7.7Z"
                    fill="#221EE3"
                  />
                </svg>
              </a> -->
              <a
                class="footer-item__icon"
                href="https://t.me/RentCarUAE"
                target="_blank"
                rel="noopener nofollow"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="32" height="32" rx="8" fill="white" />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0 8C0 3.58172 3.58172 0 8 0H24C28.4183 0 32 3.58172 32 8V24C32 28.4183 28.4183 32 24 32H8C3.58172 32 0 28.4183 0 24V8ZM16.6919 12.0074C15.2589 12.6034 12.3949 13.8371 8.09992 15.7083C7.40248 15.9856 7.03714 16.257 7.00388 16.5223C6.94767 16.9706 7.50915 17.1472 8.27374 17.3876C8.37774 17.4203 8.4855 17.4542 8.59598 17.4901C9.34822 17.7346 10.3601 18.0207 10.8862 18.0321C11.3633 18.0424 11.8959 17.8457 12.4839 17.4419C16.4968 14.7331 18.5683 13.3639 18.6983 13.3344C18.7901 13.3136 18.9172 13.2874 19.0034 13.3639C19.0895 13.4405 19.0811 13.5855 19.0719 13.6244C19.0163 13.8615 16.8123 15.9106 15.6717 16.971C15.3161 17.3015 15.0639 17.536 15.0124 17.5896C14.8969 17.7096 14.7791 17.823 14.666 17.9321C13.9672 18.6058 13.4431 19.111 14.695 19.936C15.2967 20.3325 15.7781 20.6603 16.2584 20.9874C16.7829 21.3446 17.306 21.7009 17.9829 22.1446C18.1554 22.2576 18.3201 22.375 18.4805 22.4894C19.0909 22.9246 19.6393 23.3155 20.3168 23.2532C20.7105 23.217 21.1172 22.8468 21.3237 21.7427C21.8118 19.1335 22.7712 13.4801 22.9929 11.1505C23.0123 10.9464 22.9879 10.6851 22.9683 10.5705C22.9486 10.4558 22.9076 10.2924 22.7586 10.1715C22.582 10.0283 22.3095 9.99805 22.1877 10.0001C21.6335 10.01 20.7834 10.3056 16.6919 12.0074Z"
                    fill="#221EE3"
                  />
                </svg>
              </a>
              <a
                class="footer-item__icon"
                href="https://x.com/RentCarUAE"
                target="_blank"
                rel="noopener nofollow"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="32" height="32" rx="8" fill="#221EE3" />
                  <path
                    d="M23.58 23.3333L17.7167 14.7853L17.7267 14.7933L23.0133 8.66666H21.2467L16.94 13.6533L13.52 8.66666H8.88667L14.3607 16.6473L14.36 16.6467L8.58667 23.3333H10.3533L15.1413 17.7853L18.9467 23.3333H23.58ZM12.82 10L21.0467 22H19.6467L11.4133 10H12.82Z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
            <div class="footer__rental text-pre-small">
              {{ $t("carRentalCompany") }}
            </div>
            <slot name="joinButton" />
          </div>
        </div>
        <div class="footer__bottom">© Rentcaruae 2024</div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const cities = useState("cities");
const currentCity = useState("currentCity");

const categories = useState("categories");

const brands = useState("brands");
const brandsLimit = computed(
  () => brands.value?.length && [...brands.value]?.slice(0, 8)
);

const generations = useState("generations");

const rentalPeriods = useState("rentalPeriods");
</script>

<style lang="scss" scoped>
.footer {
  background-color: var(--color-grey);
  padding: 40px 0 30px;

  &__top {
    display: inline-flex;
    margin-bottom: 38px;
  }

  &__logo {
    color: var(--color-basic);
  }

  &__center {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    grid-gap: 20px 44px;
    margin-bottom: 32px;
  }

  &-item {
    &:last-child {
      display: flex;
      flex-direction: column;
    }

    &__list {
      display: flex;
      flex-direction: column;
      row-gap: 4px;
      padding: 8px 12px;
    }

    &__link {
      font-size: 14px;
      transition: 0.3s;

      &:hover {
        color: var(--color-basic);
      }
    }

    &__btns {
      display: flex;
      column-gap: 8px;
      padding: 8px;
    }

    &__icon {
      display: inline-flex;
    }
  }

  &__rental {
    color: var(--color-basic);
    margin: auto 0 8px;
    max-width: 124px;
  }

  // &__join {
  //   padding: 6px 16px;
  //   font-weight: 700;
  //   width: fit-content;
  // }

  &__bottom {
    font-size: 14px;
  }

  @media (max-width: 1024px) {
    padding: 20px 0;

    &__top {
      margin-bottom: 20px;
    }

    &__center {
      grid-gap: 20px;
    }
  }

  @media (max-width: 480px) {
    &__center {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style>
