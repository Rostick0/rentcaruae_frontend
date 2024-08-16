<template>
  <header class="header">
    <div class="container">
      <div class="header__top">
        <NuxtLink class="header__logo d-flex" to="/">
          <Logo />
        </NuxtLink>
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
            <rect x="11" y="11" width="7" height="7" rx="2" fill="white" />
            <rect x="2" y="11" width="7" height="7" rx="2" fill="white" />
          </svg>
          <span>Rent a car</span>
        </UiButton>
        <div class="header__search">
          <MainSearch variant="outlined" />
        </div>
        <div class="d-flex">
          <VFormComponent :field="lang" />
          <VFormComponent :field="currency" />
        </div>
        <UiButton class="btn-flex" @click="open(), (authModalState = 'login')">
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
      <div class="header__bottom">
        <UiSelectWithIcons v-model="city" :options="citiesComputed" />
        <!-- <VFormComponent :field="country" /> -->
        <div class="header__links">
          <NuxtLink
            class="header__link text-ui"
            v-for="link in links"
            :key="link.name"
            :to="link.link"
            >{{ link.name }}</NuxtLink
          >
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const { open } = useModal({
  name: "auth-modal",
});
const authModalState = useState("authModalState");

// const make = ref({
//   type: "select",
//   name: "make",
//   modelValue: "",

//   bind: {
//     debounceMs: 500,
//     isSearchable: true,
//     // withIcon: false,
//     svgIcon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3 11.0583L17.075 15.8333L15.8333 17.075L11.0583 12.3C10.1667 12.9417 9.09167 13.3333 7.91667 13.3333C4.925 13.3333 2.5 10.9083 2.5 7.91667C2.5 4.925 4.925 2.5 7.91667 2.5C10.9083 2.5 13.3333 4.925 13.3333 7.91667C13.3333 9.09167 12.9417 10.1667 12.3 11.0583ZM7.91667 4.16667C5.84167 4.16667 4.16667 5.84167 4.16667 7.91667C4.16667 9.99167 5.84167 11.6667 7.91667 11.6667C9.99167 11.6667 11.6667 9.99167 11.6667 7.91667C11.6667 5.84167 9.99167 4.16667 7.91667 4.16667Z" fill="#221EE3"/>
// </svg>`,
//     placeholder: "Search a car by brand or model",
//     isAlternative: true,
//     searchFn: () => {},
//     // searchFn: fetchMake,
//   },
// });

const lang = ref({
  type: "select",
  name: "lang",
  modelValue: langOptions[0],

  bind: {
    options: langOptions,
    withLeftIcon: true,
    svgLeftIcon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.99199 1.66669C5.39199 1.66669 1.66699 5.40002 1.66699 10C1.66699 14.6 5.39199 18.3334 9.99199 18.3334C14.6003 18.3334 18.3337 14.6 18.3337 10C18.3337 5.40002 14.6003 1.66669 9.99199 1.66669ZM15.767 6.66669H13.3087C13.042 5.62502 12.6587 4.62502 12.1587 3.70002C13.692 4.22502 14.967 5.29169 15.767 6.66669ZM10.0003 3.36669C10.692 4.36669 11.2337 5.47502 11.592 6.66669H8.40866C8.76699 5.47502 9.30866 4.36669 10.0003 3.36669ZM3.55033 11.6667C3.41699 11.1334 3.33366 10.575 3.33366 10C3.33366 9.42502 3.41699 8.86669 3.55033 8.33335H6.36699C6.30033 8.88335 6.25033 9.43335 6.25033 10C6.25033 10.5667 6.30033 11.1167 6.36699 11.6667H3.55033ZM4.23366 13.3334H6.69199C6.95866 14.375 7.34199 15.375 7.84199 16.3C6.30866 15.775 5.03366 14.7167 4.23366 13.3334ZM6.69199 6.66669H4.23366C5.03366 5.28335 6.30866 4.22502 7.84199 3.70002C7.34199 4.62502 6.95866 5.62502 6.69199 6.66669ZM10.0003 16.6334C9.30866 15.6334 8.76699 14.525 8.40866 13.3334H11.592C11.2337 14.525 10.692 15.6334 10.0003 16.6334ZM11.9503 11.6667H8.05033C7.97533 11.1167 7.91699 10.5667 7.91699 10C7.91699 9.43335 7.97533 8.87502 8.05033 8.33335H11.9503C12.0253 8.87502 12.0837 9.43335 12.0837 10C12.0837 10.5667 12.0253 11.1167 11.9503 11.6667ZM12.1587 16.3C12.6587 15.375 13.042 14.375 13.3087 13.3334H15.767C14.967 14.7084 13.692 15.775 12.1587 16.3ZM13.6337 11.6667C13.7003 11.1167 13.7503 10.5667 13.7503 10C13.7503 9.43335 13.7003 8.88335 13.6337 8.33335H16.4503C16.5837 8.86669 16.667 9.42502 16.667 10C16.667 10.575 16.5837 11.1334 16.4503 11.6667H13.6337Z" fill="#221EE3"/></svg>`,
    isAlternative: true,
    // slots: "dasd",
  },
});

const currency = ref({
  type: "select",
  name: "currency",
  modelValue: currencyOptions[0],

  bind: {
    options: currencyOptions,
    isAlternative: true,
  },
});

const cities = useState("cities");

const citiesComputed = computed(() =>
  cities.value?.map?.((item) => ({ ...item, icon_url: "images/flags/ae.svg" }))
);

const city = useState("currentCity", () => citiesComputed.value?.[0]);

const links = [
  {
    name: "Categories",
    link: "/",
  },
  {
    name: "Brands",
    link: "/",
  },
  {
    name: "Body Types",
    link: "/",
  },
  {
    name: "Rental by period",
    link: "/",
  },
  {
    name: "Car Leasing",
    link: "/leasing",
  },
];
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
    display: flex;
    align-items: center;
    column-gap: 81px;
  }

  &__links {
    display: flex;
    grid-gap: 21px;
  }

  &__link {
    padding: 12px 16px;
  }
}
</style>

<style lang="scss">
@import "./../../../assets/scss/ui/";

.header__search {
  .btn.main-search__send {
    background-color: var(--color-white);
    border-left: none;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    padding-left: 20px;
    padding-right: 20px;
    z-index: 1;
  }
  // .control-select {
  //   width: 100%;
  // }
}
</style>
