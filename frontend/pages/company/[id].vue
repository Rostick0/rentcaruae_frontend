<template>
  <PageCatalog
    :breadcrumbs="breadcrumbs"
    :paramsCar="{ 'filterEQ[user_id]': data.owner?.id }"
  >
    <template #topBlock>
      <div class="company">
        <div class="company__top">
          <h1 class="company__title h1">{{ data.name }}</h1>
          <LazyNuxtImg
            class="company__img"
            :src="data.image"
            :alt="data.name"
            decoding="async"
            loading="lazy"
            fit="contain"
            width="139"
            height="56"
          />
        </div>
        <div class="company__bottom">
          <div class="company__description">
            <p v-if="data?.description">{{ data.description }}</p>
            <div class="company__address">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.99984 1.66666C6.77484 1.66666 4.1665 4.27499 4.1665 7.49999C4.1665 11.875 9.99984 18.3333 9.99984 18.3333C9.99984 18.3333 15.8332 11.875 15.8332 7.49999C15.8332 4.27499 13.2248 1.66666 9.99984 1.66666ZM5.83317 7.49999C5.83317 5.19999 7.69984 3.33332 9.99984 3.33332C12.2998 3.33332 14.1665 5.19999 14.1665 7.49999C14.1665 9.89999 11.7665 13.4917 9.99984 15.7333C8.2665 13.5083 5.83317 9.87499 5.83317 7.49999Z"
                  fill="#221EE3"
                />
                <path
                  d="M9.99984 9.58332C11.1504 9.58332 12.0832 8.65058 12.0832 7.49999C12.0832 6.3494 11.1504 5.41666 9.99984 5.41666C8.84924 5.41666 7.9165 6.3494 7.9165 7.49999C7.9165 8.65058 8.84924 9.58332 9.99984 9.58332Z"
                  fill="#221EE3"
                />
              </svg>
              <span>{{ address }}</span>
            </div>
          </div>
          <div class="company__bottom_right">
            <div class="company__action">
              <a
                class="d-flex"
                :href="`https://www.google.ru/maps/place/${address}`"
                rel="noopener nofollow"
                target="_blank"
              >
                <UiButton class="company__btn" variant="outlined"
                  >View on map</UiButton
                >
              </a>
              <a
                class="d-flex"
                :href="`https://wa.me/${data?.owner?.tel}`"
                rel="noopener nofollow"
                target="_blank"
              >
                <UiButton class="company__btn" color="whatsapp"
                  >WhatsApp</UiButton
                >
              </a>
            </div>
            <div class="company__schedule">
              <div
                class="company__schedule_item"
                v-for="item in companySchedules"
              >
                <span>{{ item.week_day }}</span>
                <span>
                  {{ item.period }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </PageCatalog>
</template>

<script setup>
const breadcrumbs = ref([
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Dubai",
    link: "/",
  },
  {
    name: "Car rental",
    link: "/",
  },
  {
    name: "Yeti car",
  },
]);

const id = useRoute().params?.id;

const { data, get } = await useApi({
  name: "companies.get",
  params: {
    extends: "owner,company_schedules,city",
  },
  requestParams: {
    id,
  },
});

await get();

const address = computed(() =>
  `${data.value?.city?.name} ${data.value?.aread_name ?? ""} ${
    data.value?.building_name ?? ""
  } ${data.value?.office_number ?? ""}`.trim()
);

const companySchedules = computed(() =>
  data.value?.company_schedules?.map((item) => ({
    ...item,
    period:
      item?.start && item?.end && item?.is_show
        ? item.start + " - " + item.end
        : "-",
    week_day: daysWeek[item?.week_day],
  }))
);

// const dataa = {
//   name: "Yeti car rental",
//   image: "images/fake/yeti-rental-dubai1.png 1.png",
//   description:
//     "Yeti Car Rental is a company with a believe in a high-quality service for our customers. Our fleet consist of new / luxury / super cars, which will fully incorporate your needs and requirements. We have Kia Sportage, Kia Optima, Kia Picanto, Kia Rio, Hyundai Sonata, Hyundai Elantra, Toyota Yaris, Infiniti and many more! You are most welcome to contact us and place an inquiry for corporate lease, long and short-term rentals. Be first to make a booking and get ZERO-mileage car. If you want to rent a car in Dubai - Yeti is the best for You!",
//   address: "902, Al Ameri Tower, Barsha Heights, Dubai - UAE",
//   map_address: "",
//   whatsapp: "",
//   schedule: [
//     {
//       week_day: "Monday",
//       start: "9:00 am",
//       end: "8:00 pm",
//     },
//     {
//       week_day: "Tuesday",
//       start: "9:00 am",
//       end: "8:00 pm",
//     },
//     {
//       week_day: "Wednesday",
//       start: "9:00 am",
//       end: "8:00 pm",
//     },
//     {
//       week_day: "Thursday",
//       start: "9:00 am",
//       end: "8:00 pm",
//     },
//     {
//       week_day: "Friday",
//       start: "9:00 am",
//       end: "8:00 pm",
//     },
//     {
//       week_day: "Saturday",
//       start: "10:00 am",
//       end: "8:00 pm",
//     },
//     {
//       week_day: "Sunday",
//       start: "10:00 am",
//       end: "8:00 pm",
//     },
//   ],
// };
</script>

<style lang="scss" scoped>
.company {
  margin-bottom: 40px;

  &__top {
    display: flex;
    align-items: center;
    column-gap: 88px;
    margin-bottom: 40px;
  }

  &__title {
    margin-bottom: 0;
  }

  &__img {
    flex-shrink: 0;
  }

  &__bottom {
    display: flex;
    font-size: 14px;
    font-weight: 700;
    justify-content: space-between;

    &_right {
      display: flex;
      column-gap: 60px;
    }
  }

  &__description {
    width: 100%;
    max-width: 552px;
  }

  &__address {
    display: flex;
    align-items: center;
    margin-top: 4px;

    span {
      line-height: 1;
    }
  }

  &__action {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    flex-shrink: 0;
    width: 130px;
  }

  &__btn {
    width: 100%;
  }

  &__schedule {
    display: flex;
    flex-direction: column;
    row-gap: 4px;
    min-width: fit-content;

    &_item {
      display: flex;
      column-gap: 10px;
      justify-content: space-between;
      width: 264px;
    }
  }
}
</style>
