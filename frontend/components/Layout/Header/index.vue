<template>
  <header class="header">
    <div class="container">
      <div class="header__container">
        <div class="header__top">
          <button
            class="d-flex"
            v-if="$device.isMobileOrTablet"
            @click="toggleActive"
            title="Toggle menu"
          >
            <svg
              v-if="!isActive"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 15H17.5V13.3333H2.5V15ZM2.5 10.8333H17.5V9.16667H2.5V10.8333ZM2.5 5V6.66667H17.5V5H2.5Z"
                fill="#221EE3"
              />
            </svg>
            <svg
              v-else
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.827 10.5002L16.7258 4.60135C17.0922 4.23517 17.0922 3.64104 16.7258 3.27487C16.3593 2.90838 15.7658 2.90838 15.3993 3.27487L9.50047 9.17367L3.60135 3.27487C3.23486 2.90838 2.64135 2.90838 2.27487 3.27487C1.90838 3.64104 1.90838 4.23517 2.27487 4.60135L8.17399 10.5002L2.27487 16.399C1.90838 16.7651 1.90838 17.3593 2.27487 17.7254C2.45811 17.9084 2.69826 18 2.93811 18C3.17795 18 3.4181 17.9084 3.60135 17.7251L9.50047 11.8263L15.3993 17.7251C15.5825 17.9084 15.8227 18 16.0625 18C16.3024 18 16.5425 17.9084 16.7258 17.7251C17.0922 17.359 17.0922 16.7648 16.7258 16.3987L10.827 10.5002Z"
                fill="#221EE3"
              />
            </svg>
          </button>
          <NuxtLink class="header__logo d-flex" to="/">
            <Logo />
          </NuxtLink>
          <LazyUiDropdownMenu v-if="$device.isDesktopOrTablet">
            <template #body>
              <UiButton class="btn-flex">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="2" y="2" width="7" height="7" rx="2" fill="white" />
                  <rect x="11" y="2" width="7" height="7" rx="2" fill="white" />
                  <rect
                    x="11"
                    y="11"
                    width="7"
                    height="7"
                    rx="2"
                    fill="white"
                  />
                  <rect x="2" y="11" width="7" height="7" rx="2" fill="white" />
                </svg>
                <span>Rent a car</span>
              </UiButton>
            </template>
            <template #drop="{ close }">
              <LayoutHeaderRentalDropDown
                :list="rentACar"
                @close="close(), (isActive = false)"
              />
            </template>
          </LazyUiDropdownMenu>

          <div class="header__search">
            <MainSearch variant="outlined" />
          </div>
          <div class="d-flex" v-if="$device.isDesktopOrTablet">
            <VFormComponent :field="lang" />
            <VFormComponent :field="currency" />
          </div>
          <NuxtLink v-if="user" to="/seller">
            <UiButton class="btn-flex">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 1.66669C5.40002 1.66669 1.66669 5.40002 1.66669 10C1.66669 14.6 5.40002 18.3334 10 18.3334C14.6 18.3334 18.3334 14.6 18.3334 10C18.3334 5.40002 14.6 1.66669 10 1.66669ZM6.12502 15.4167C7.21669 14.6334 8.55002 14.1667 10 14.1667C11.45 14.1667 12.7834 14.6334 13.875 15.4167C12.7834 16.2 11.45 16.6667 10 16.6667C8.55002 16.6667 7.21669 16.2 6.12502 15.4167ZM15.1167 14.2667C13.7084 13.1667 11.9334 12.5 10 12.5C8.06669 12.5 6.29169 13.1667 4.88335 14.2667C3.91669 13.1084 3.33335 11.625 3.33335 10C3.33335 6.31669 6.31669 3.33335 10 3.33335C13.6834 3.33335 16.6667 6.31669 16.6667 10C16.6667 11.625 16.0834 13.1084 15.1167 14.2667Z"
                  fill="white"
                />
                <path
                  d="M10 5.00002C8.39169 5.00002 7.08335 6.30835 7.08335 7.91669C7.08335 9.52502 8.39169 10.8334 10 10.8334C11.6084 10.8334 12.9167 9.52502 12.9167 7.91669C12.9167 6.30835 11.6084 5.00002 10 5.00002ZM10 9.16669C9.30835 9.16669 8.75002 8.60835 8.75002 7.91669C8.75002 7.22502 9.30835 6.66669 10 6.66669C10.6917 6.66669 11.25 7.22502 11.25 7.91669C11.25 8.60835 10.6917 9.16669 10 9.16669Z"
                  fill="white"
                />
              </svg>
              <span>Profile</span>
            </UiButton>
          </NuxtLink>
          <UiButton
            v-else
            class="btn-flex"
            @click="open(), (authModalState = 'login')"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 1.66669C5.40002 1.66669 1.66669 5.40002 1.66669 10C1.66669 14.6 5.40002 18.3334 10 18.3334C14.6 18.3334 18.3334 14.6 18.3334 10C18.3334 5.40002 14.6 1.66669 10 1.66669ZM6.12502 15.4167C7.21669 14.6334 8.55002 14.1667 10 14.1667C11.45 14.1667 12.7834 14.6334 13.875 15.4167C12.7834 16.2 11.45 16.6667 10 16.6667C8.55002 16.6667 7.21669 16.2 6.12502 15.4167ZM15.1167 14.2667C13.7084 13.1667 11.9334 12.5 10 12.5C8.06669 12.5 6.29169 13.1667 4.88335 14.2667C3.91669 13.1084 3.33335 11.625 3.33335 10C3.33335 6.31669 6.31669 3.33335 10 3.33335C13.6834 3.33335 16.6667 6.31669 16.6667 10C16.6667 11.625 16.0834 13.1084 15.1167 14.2667Z"
                fill="white"
              />
              <path
                d="M10 5.00002C8.39169 5.00002 7.08335 6.30835 7.08335 7.91669C7.08335 9.52502 8.39169 10.8334 10 10.8334C11.6084 10.8334 12.9167 9.52502 12.9167 7.91669C12.9167 6.30835 11.6084 5.00002 10 5.00002ZM10 9.16669C9.30835 9.16669 8.75002 8.60835 8.75002 7.91669C8.75002 7.22502 9.30835 6.66669 10 6.66669C10.6917 6.66669 11.25 7.22502 11.25 7.91669C11.25 8.60835 10.6917 9.16669 10 9.16669Z"
                fill="white"
              />
            </svg>
            <span>Log in</span>
          </UiButton>
        </div>
        <div
          v-if="$device.isMobile ? isActive : true"
          @click.self="isActive = false"
          class="header__bottom"
        >
          <div class="header__bottom_inner">
            <LazyUiDropdownMenu
              class="header__bottom_rent"
              v-if="$device.isMobile"
            >
              <template #body>
                <UiButton class="btn-flex">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="7"
                      height="7"
                      rx="2"
                      fill="white"
                    />
                    <rect
                      x="11"
                      y="2"
                      width="7"
                      height="7"
                      rx="2"
                      fill="white"
                    />
                    <rect
                      x="11"
                      y="11"
                      width="7"
                      height="7"
                      rx="2"
                      fill="white"
                    />
                    <rect
                      x="2"
                      y="11"
                      width="7"
                      height="7"
                      rx="2"
                      fill="white"
                    />
                  </svg>
                  <span>Rent a car</span>
                </UiButton>
              </template>
              <template #drop="{ close }">
                <LayoutHeaderRentalDropDown
                  :list="rentACar"
                  @close="close(), (isActive = false)"
                />
              </template>
            </LazyUiDropdownMenu>
            <LazyUiSelectWithIcons
              v-if="$device.isDesktopOrTablet"
              v-model="cityWithFlag"
              :options="citiesComputed"
            />
            <div class="header__links">
              <LazyUiDropdownMenu v-for="menuItem in menu" :key="menuItem.name">
                <template #body>
                  <div class="header__link text-ui">
                    {{ menuItem.name }}
                  </div>
                </template>
                <template #drop="{ close }">
                  <LayoutHeaderDropDown
                    v-if="!menuItem?.is_brand"
                    :links="menuItem?.links"
                    @close="close(), (isActive = false)"
                  />
                  <LayoutHeaderBrandsDropDown
                    v-else
                    :links="menuItem?.links"
                    @close="close(), (isActive = false)"
                  />
                </template>
              </LazyUiDropdownMenu>
              <NuxtLink
                class="header__link text-ui"
                @click="isActive = false"
                :to="convertNameToUrl(`/${city?.name}/leasing/`)"
                >Car Leasing</NuxtLink
              >
            </div>
            <UiSelectWithIcons
              v-if="$device.isMobile"
              v-model="city"
              :options="citiesComputed"
            />
            <div class="header__bottom_select" v-if="$device.isMobile">
              <VFormComponent :field="lang" />
              <VFormComponent :field="currency" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import remove from "lodash/remove";

const { open } = useModal({
  name: "auth-modal",
});
const authModalState = useState("authModalState");

const user = useState("user");

const isActive = ref(false);

const toggleActive = () => {
  isActive.value = !isActive.value;
};

watch(
  () => isActive.value,
  () => {
    document.body.classList.toggle("overflow-hidden");
  }
);

const lang = ref({
  type: "select",
  name: "lang",
  modelValue: langOptions[0],
  withoutResetInUnmounted: true,

  bind: {
    options: langOptions,
    withLeftIcon: true,
    svgLeftIcon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.99199 1.66669C5.39199 1.66669 1.66699 5.40002 1.66699 10C1.66699 14.6 5.39199 18.3334 9.99199 18.3334C14.6003 18.3334 18.3337 14.6 18.3337 10C18.3337 5.40002 14.6003 1.66669 9.99199 1.66669ZM15.767 6.66669H13.3087C13.042 5.62502 12.6587 4.62502 12.1587 3.70002C13.692 4.22502 14.967 5.29169 15.767 6.66669ZM10.0003 3.36669C10.692 4.36669 11.2337 5.47502 11.592 6.66669H8.40866C8.76699 5.47502 9.30866 4.36669 10.0003 3.36669ZM3.55033 11.6667C3.41699 11.1334 3.33366 10.575 3.33366 10C3.33366 9.42502 3.41699 8.86669 3.55033 8.33335H6.36699C6.30033 8.88335 6.25033 9.43335 6.25033 10C6.25033 10.5667 6.30033 11.1167 6.36699 11.6667H3.55033ZM4.23366 13.3334H6.69199C6.95866 14.375 7.34199 15.375 7.84199 16.3C6.30866 15.775 5.03366 14.7167 4.23366 13.3334ZM6.69199 6.66669H4.23366C5.03366 5.28335 6.30866 4.22502 7.84199 3.70002C7.34199 4.62502 6.95866 5.62502 6.69199 6.66669ZM10.0003 16.6334C9.30866 15.6334 8.76699 14.525 8.40866 13.3334H11.592C11.2337 14.525 10.692 15.6334 10.0003 16.6334ZM11.9503 11.6667H8.05033C7.97533 11.1167 7.91699 10.5667 7.91699 10C7.91699 9.43335 7.97533 8.87502 8.05033 8.33335H11.9503C12.0253 8.87502 12.0837 9.43335 12.0837 10C12.0837 10.5667 12.0253 11.1167 11.9503 11.6667ZM12.1587 16.3C12.6587 15.375 13.042 14.375 13.3087 13.3334H15.767C14.967 14.7084 13.692 15.775 12.1587 16.3ZM13.6337 11.6667C13.7003 11.1167 13.7503 10.5667 13.7503 10C13.7503 9.43335 13.7003 8.88335 13.6337 8.33335H16.4503C16.5837 8.86669 16.667 9.42502 16.667 10C16.667 10.575 16.5837 11.1334 16.4503 11.6667H13.6337Z" fill="#221EE3"/></svg>`,
    isAlternative: true,
  },
});

// const exchangeRates = useState("exchangeRates");
const { currentExchangeRate, exchangeRates } = await useExchangeRate();

const currency = ref({
  type: "select",
  name: "currency",
  // modelValue: currencyOptions[0],
  modelValue: currentExchangeRate.value,
  withoutResetInUnmounted: true,

  bind: {
    options: exchangeRates.value,
    isAlternative: true,
  },
});

watch(
  () => currency.value.modelValue,
  (cur) => {
    currentExchangeRate.value = cur;
    // console.log(cur); 
  }
);

const cities = useState("cities");

const citiesComputed = computed(() =>
  cities.value?.map?.((item) => ({
    ...item,
    icon_url: "frontend-images/flags/ae.svg",
  }))
);

const city = useState("currentCity");

const cityWithFlag = computed({
  get: () => citiesComputed.value?.find((item) => item?.id === city.value?.id),
  set: (val) =>
    (city.value = cities?.value?.find((item) => item?.id === val?.id)),
});

const categories = useState("categories");
const brands = useState("brands");
const generations = useState("generations");
const rentalPeriods = useState("rentalPeriods");

const categoriesLinks = computed(() =>
  categories.value?.map?.((item) => ({
    ...item,
    link: convertNameToUrl(`/${city.value?.name ?? "all"}/type/${item?.name}`),
  }))
);

const brandsLinks = computed(() =>
  brands.value?.map?.((item) => ({
    ...item,
    link: convertNameToUrl(`/${city.value?.name ?? "all"}/brand/${item?.name}`),
  }))
);

const generationsLinks = computed(() =>
  generations.value?.map?.((item) => ({
    ...item,
    link: convertNameToUrl(`/${city.value?.name ?? "all"}/body/${item?.name}`),
  }))
);

const menu = computed(() => [
  {
    name: "Categories",
    links: categoriesLinks.value,
  },
  {
    name: "Brands",
    links: brandsLinks.value,
    is_brand: true,
  },
  {
    name: "Body Types",
    links: generationsLinks.value,
  },
  {
    name: "Rental by period",
    links: rentalPeriods.value,
  },
]);

const citiesLinks = computed(() =>
  cities.value?.map((item) => ({
    ...item,
    link: convertNameToUrl(`/${item?.name}`),
  }))
);

const rentACar = computed(() => {
  const data = [...menu.value];
  remove(data, (item) => item.name === "Brands");

  return [
    {
      name: "Rent car",
      links: citiesLinks.value,
    },
    ...data,
  ];
});
</script>

<style lang="scss" scoped>
.header {
  padding-top: 20px;

  &__top {
    display: flex;
    align-items: center;
    column-gap: 16px;
    margin-bottom: 6px;
  }

  &__logo {
    margin-right: 4px;
  }

  &__search {
    flex-grow: 1;
  }

  &__bottom {
    &_inner {
      display: flex;
      align-items: center;
      column-gap: 81px;
    }
  }

  &__links {
    display: flex;
    grid-gap: 21px;
  }

  &__link {
    cursor: pointer;
    padding: 12px 16px;
  }

  @media (max-width: 1024px) {
    padding-top: 8px;

    // &__container {
    //   display: flex;
    //   flex-direction: column;
    //   min-height: 100dvh;
    // }

    &__logo {
      margin-right: auto;
      // order: 1
    }

    &__top {
      grid-gap: 8px;
      flex-wrap: wrap;
    }

    &__search {
      order: 3;
      width: 100%;
    }

    &__links {
      flex-direction: column;
      grid-gap: 0;
    }

    &__bottom {
      background-color: rgba(0, 0, 0, 0.25);
      align-items: flex-start;
      position: absolute;
      overflow: hidden;
      left: 0;
      width: 100%;
      min-height: calc(100dvh - 110px);
      z-index: 2;

      &_inner {
        background-color: var(--color-bg-main);
        align-items: flex-start;
        flex-direction: column;
        row-gap: 20px;
        padding: 8px 20px;
        width: 100%;
      }

      &_rent {
        margin-bottom: -12px;
        width: 100%;

        .btn {
          justify-content: center;
          width: 100%;
        }
      }

      &_select {
        display: flex;
        flex-direction: column;
        row-gap: 20px;
        margin-left: -16px;
      }
    }
  }
}
</style>

<style lang="scss">
@forward "./../../../assets/scss/ui/";

.header {
  &__search {
    .main-search {
      &__close {
        right: 68px;
      }

      &__send.btn {
        background-color: var(--color-white);
        border-left: none;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        padding-left: 20px;
        padding-right: 20px;
        z-index: 1;
      }

      &__options {
        width: 100%;
      }
    }
  }

  .select-icons-option {
    &__text {
      text-wrap: nowrap;
      white-space: nowrap;
    }
  }

  @media (max-width: 1024px) {
    .header-rental-drop-down {
      flex-wrap: wrap;

      &-item {
        &:last-child {
          background-color: var(--color-white);
        }
      }
    }
  }
}
</style>
