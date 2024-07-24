<template>
  <div class="main-search">
    <div class="main-search__field">
      <input
        class="main-search__input"
        v-model="search"
        type="еуче"
        :placeholder="placeholder"
      />
      <button
        class="d-flex main-search__close"
        @click="search = ''"
        v-show="search?.length > 1"
        type="reset"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.827 10.5002L16.7258 4.60135C17.0922 4.23517 17.0922 3.64104 16.7258 3.27487C16.3593 2.90838 15.7658 2.90838 15.3993 3.27487L9.50047 9.17367L3.60135 3.27487C3.23486 2.90838 2.64135 2.90838 2.27487 3.27487C1.90838 3.64104 1.90838 4.23517 2.27487 4.60135L8.17399 10.5002L2.27487 16.399C1.90838 16.7651 1.90838 17.3593 2.27487 17.7254C2.45811 17.9084 2.69826 18 2.93811 18C3.17795 18 3.4181 17.9084 3.60135 17.7251L9.50047 11.8263L15.3993 17.7251C15.5825 17.9084 15.8227 18 16.0625 18C16.3024 18 16.5425 17.9084 16.7258 17.7251C17.0922 17.359 17.0922 16.7648 16.7258 16.3987L10.827 10.5002Z"
            fill="#1D1B20"
            fill-opacity="0.2"
          />
        </svg>
      </button>
      <UiButton class="d-flex main-search__send">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_417_350)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.3 11.0583L17.075 15.8333L15.8333 17.075L11.0583 12.3C10.1667 12.9417 9.09167 13.3333 7.91667 13.3333C4.925 13.3333 2.5 10.9083 2.5 7.91667C2.5 4.925 4.925 2.5 7.91667 2.5C10.9083 2.5 13.3333 4.925 13.3333 7.91667C13.3333 9.09167 12.9417 10.1667 12.3 11.0583ZM7.91667 4.16667C5.84167 4.16667 4.16667 5.84167 4.16667 7.91667C4.16667 9.99167 5.84167 11.6667 7.91667 11.6667C9.99167 11.6667 11.6667 9.99167 11.6667 7.91667C11.6667 5.84167 9.99167 4.16667 7.91667 4.16667Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_417_350">
              <rect width="20" height="20" rx="10" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </UiButton>
    </div>
    <div class="main-search__options" v-show="isShow">
      <div class="main-search__models">
        <UiButton
          class="main-search-model"
          v-for="model in models"
          :key="model?.id"
          variant="outlined"
        >
          {{ model.name }}
        </UiButton>
        <!-- <div class="main-search-model">Audi A6</div> -->
      </div>
      <div class="main-search__companies">
        <div
          class="main-search-company"
          v-for="company in companies"
          :key="company.id"
        >
          <LazyNuxtImg
            class="main-search-company__img"
            :src="company.image_url"
            :alt="company.name"
            loading="lazy"
            width="40"
            height="40"
          />
          <span class="main-search-company__name">{{ company.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  placeholder: {
    type: String,
    default: "Search a car by brand or model",
  },
});

const isShow = ref(false);
const search = ref();

watch(
  () => search.value,
  (newV) => {
    if (newV?.length >= 3) {
      isShow.value = true;
    } else {
      isShow.value = false;
    }
  }
);

const models = [
  {
    id: 1,
    name: "Audi A5",
  },
  {
    id: 2,
    name: "Audi A6",
  },
];

const companies = [
  {
    id: 1,
    name: "BMW",
    image_url: "images/fake/Logos (3).png",
  },
  {
    id: 2,
    name: "Alfa Romeo",
    image_url: "images/fake/Logos (1).png",
  },
];
</script>

<style lang="scss" scoped>
.main-search {
  position: relative;

  &__field {
    // background-color: var(--color-basic);
    border-radius: 8px;
    display: flex;
    position: relative;
  }

  &__input {
    border: 1px solid var(--color-basic);
    border-radius: 8px;
    font-size: 16px;
    padding: 8px 12px;
    position: relative;
    width: 100%;

    &::placeholder {
      color: var(--color-text20);
    }
  }

  &__close {
    align-self: center;
    position: absolute;
    right: 114px;
  }

  &__send {
    padding: 12px 40px;
    margin-left: -16px;
    padding-left: 56px;
  }

  &__options {
    background-color: var(--color-white);
    border-radius: 8px;
    padding: 12px 10px;
    position: absolute;
    width: calc(100% - 104px);
  }

  &__models {
    display: flex;
    flex-wrap: wrap;
    grid-gap: 8px;
    margin-bottom: 16px;
  }

  &-model {
    border-radius: 30px;
    padding: 4px 12px;
  }

  &__companies {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 16px 20px;
    // position: absolute;
    // width: fit-content;
  }

  &-company {
    display: flex;
    align-items: center;
    column-gap: 8px;
  }
}
</style>
