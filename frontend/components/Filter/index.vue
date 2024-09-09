<template>
  <div class="filter">
    <div class="filter__left">
      <NuxtLink
        class="filter-item text-pre-small"
        v-for="item in prices"
        :key="item?.id"
        :to="
          convertNameToUrl(
            `/${city?.name}/${
              route.fullPath.split('/')[2] === 'leasing' ? 'leasing' : 'rent'
            }/${item.car?.generation?.model_car?.brand?.name}/${
              item.car?.generation?.model_car?.name
            }/${item.car?.id}`
          )
        "
      >
        <span>{{ item?.car?.title }}</span>
        <span>from AED {{ item?.price }}</span>
      </NuxtLink>
    </div>
    <!-- <div class="filter__right">
      <VFormComponent :field="sort" />
      <UiButton class="filter__button" variant="outlined">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_309_1643)">
            <path
              d="M4.16658 1.66668C4.16658 1.20834 3.79158 0.833344 3.33325 0.833344C2.87492 0.833344 2.49992 1.20834 2.49992 1.66668V5.00001H0.833252V13.3333C0.833252 14.4167 1.53325 15.3333 2.49992 15.6833V19.1667H4.16658V15.6833C5.13325 15.3333 5.83325 14.4167 5.83325 13.3333V5.00001H4.16658V1.66668ZM3.33325 14.1667C2.87492 14.1667 2.49992 13.7917 2.49992 13.3333V11.6667H4.16658V13.3333C4.16658 13.7917 3.79158 14.1667 3.33325 14.1667ZM2.49992 10V6.66668H4.16658V10H2.49992ZM10.8333 1.66668C10.8333 1.20834 10.4583 0.833344 9.99992 0.833344C9.54158 0.833344 9.16658 1.20834 9.16658 1.66668V5.00001H7.49992V13.3333C7.49992 14.4167 8.19992 15.3333 9.16658 15.6833V19.1667H10.8333V15.6833C11.7999 15.3333 12.4999 14.4167 12.4999 13.3333V5.00001H10.8333V1.66668ZM9.99992 14.1667C9.54158 14.1667 9.16658 13.7917 9.16658 13.3333V11.6667H10.8333V13.3333C10.8333 13.7917 10.4583 14.1667 9.99992 14.1667ZM9.16658 10V6.66668H10.8333V10H9.16658ZM17.4999 5.00001V1.66668C17.4999 1.20834 17.1249 0.833344 16.6666 0.833344C16.2083 0.833344 15.8333 1.20834 15.8333 1.66668V5.00001H14.1666V13.3333C14.1666 14.4167 14.8666 15.3333 15.8333 15.6833V19.1667H17.4999V15.6833C18.4666 15.3333 19.1666 14.4167 19.1666 13.3333V5.00001H17.4999ZM16.6666 14.1667C16.2083 14.1667 15.8333 13.7917 15.8333 13.3333V11.6667H17.4999V13.3333C17.4999 13.7917 17.1249 14.1667 16.6666 14.1667ZM15.8333 10V6.66668H17.4999V10H15.8333Z"
              fill="#221EE3"
            />
          </g>
          <defs>
            <clipPath id="clip0_309_1643">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <span>Filter</span>
      </UiButton>
    </div> -->
  </div>
</template>

<script setup>
const props = defineProps({
  prices: Array,
});

const city = useState("currentCity");
const route = useRoute();

// const a = [{ id: "a", name: "Sort featured" }];

// const sort = ref({
//   type: "select",
//   name: "sort",
//   modelValue: a[0],

//   bind: {
//     options: a,
//     withLeftIcon: true,
//     svgLeftIcon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.3334 14.175V8.33333H11.6667V14.175H9.16675L12.5001 17.5L15.8334 14.175H13.3334ZM7.50008 2.5L4.16675 5.825H6.66675V11.6667H8.33341V5.825H10.8334L7.50008 2.5ZM13.3334 14.175V8.33333H11.6667V14.175H9.16675L12.5001 17.5L15.8334 14.175H13.3334ZM7.50008 2.5L4.16675 5.825H6.66675V11.6667H8.33341V5.825H10.8334L7.50008 2.5Z" fill="#221EE3"/></svg>`,
//     isAlternative: true,
//   },
// });
</script>

<style lang="scss" scoped>
.filter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  &__left {
    display: flex;
    column-gap: 14px;
    overflow: auto;
  }

  &-item {
    background-color: var(--color-white);
    color: var(--color-basic);
    border: 1px solid transparent;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    row-gap: 4px;
    font-weight: 700;
    letter-spacing: 0.02em;
    padding: 10px 8px;
    transition: 0.3s;
    min-width: 120px;

    &:hover {
      border-color: var(--color-basic);
    }
  }

  &__right {
    display: flex;
    align-items: center;
    column-gap: 2px;
  }

  &__button {
    display: flex;
    align-items: center;
    column-gap: 4px;
  }
}
</style>
