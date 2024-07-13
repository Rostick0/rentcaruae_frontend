<template>
  <header class="header">
    <div class="container">
      <div class="header__top">
        <Logo />
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
          <VFormComponent :field="make" />
        </div>
        <VFormComponent :field="lang" />
        <VFormComponent :field="currency" />
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
          <span>Log in</span>
        </UiButton>
      </div>
      <div class="header__bottom">
        <VFormComponent :field="country" />
        <div class="header__links">
          <NuxtLink
            class="header__link ui-text"
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
const make = ref({
  type: "select",
  name: "make",
  modelValue: "",

  bind: {
    debounceMs: 500,
    isSearchable: true,
    // withIcon: false,
    svgIcon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.3 11.0583L17.075 15.8333L15.8333 17.075L11.0583 12.3C10.1667 12.9417 9.09167 13.3333 7.91667 13.3333C4.925 13.3333 2.5 10.9083 2.5 7.91667C2.5 4.925 4.925 2.5 7.91667 2.5C10.9083 2.5 13.3333 4.925 13.3333 7.91667C13.3333 9.09167 12.9417 10.1667 12.3 11.0583ZM7.91667 4.16667C5.84167 4.16667 4.16667 5.84167 4.16667 7.91667C4.16667 9.99167 5.84167 11.6667 7.91667 11.6667C9.99167 11.6667 11.6667 9.99167 11.6667 7.91667C11.6667 5.84167 9.99167 4.16667 7.91667 4.16667Z" fill="#221EE3"/>
</svg>`,
    placeholder: "Search a car by brand or model",
    searchFn: () => {},
    // searchFn: fetchMake,
  },
});

const lang = ref({
  type: "select",
  name: "lang",
  modelValue: langOption[0],

  bind: {
    options: langOption,
    // slots: "dasd",
  },
});

const currency = ref({
  type: "select",
  name: "currency",
  modelValue: currencyOptions[0],

  bind: {
    options: currencyOptions,
  },
});

const country = ref({
  type: "select",
  name: "country",
  modelValue: "",

  bind: {
    debounceMs: 500,
    // searchFn: fetchMake,
  },
});

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
    link: "/",
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
    margin-bottom: 4px;
  }

  &__search {
    flex-grow: 1;
  }

  &__bottom {
    display: flex;
    align-items: center;
  }

  &__links {
    display: flex;
    grid-gap: 20px;
  }

  &__link {
    padding: 12px 16px;
  }
}
</style>

<style lang="scss">
@import "./../../../assets/scss/ui/";

.header__search {
  .control-select {
    width: 100%;
  }

  .select__value {
    @extend .input;
    width: 100%;
  }
}
</style>
