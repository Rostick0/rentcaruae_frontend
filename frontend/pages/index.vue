<template>
  <div class="container">
    <MainBanner />
    <MainBrands />
    <div class="car-cards">
      <CarCardShortList
        v-if="specialCars?.length"
        :cars="specialCars"
        title="Special offers"
        linkText="All special offers"
        :link="`/`"
      />
      <CarCardShortList
        v-if="luxuryCars?.length"
        :cars="luxuryCars"
        title="Luxury cars"
        linkText="All Luxury cars"
        link="/"
      />
      <CarCardShortList
        v-if="suvCars?.length"
        :cars="suvCars"
        title="SUV for rent"
        linkText="All SUV"
        link="/"
      />
    </div>
    <div class="rental-service">
      <h2 class="rental-service__title">Car rental service</h2>
      <div class="rental-service__content">
        <div class="rental-service__description">
          <p>
            Renty offers different car rental plans, from a standard one-day
            agreement to yearly rentals. You can usually hire a luxury vehicle
            for at least one day. However, some cars are eligible for an hourly
            hire. Our car rental platform also provides fully
            <a href="" class="text-decoration-underline"
              >featured car leasing in the UAE,</a
            >
            including top-notch vehicles from all the categories listed on the
            website.
          </p>
          <br />
          <p>
            Customers can also rent economy cars for a month or even a year. It
            is also quite common for people to extend their rental agreement.
            Contact us to learn more about available plans for the vehicle of
            your choice.
          </p>
        </div>
        <NuxtLink class="rental-service__link text-ui" to="/">
          Show more
        </NuxtLink>
      </div>
    </div>
    <!-- <div class="faq">
      <h2 class="faq__title">Frequently Asked Questions</h2>
      <div class="faq__content">
        <div class="faq-item">
          <h3 class="faq-item__title">Practical Information</h3>
          <div class="faq-item__list">
            <UiSpoiler>
              <template #title>What about parking availability?</template>
              <template #content>
                We charge daily rental fees, using the 24-hour time format. For
                example, a car rented at 2:00 pm will be due back at the same
                time the following day. We urge all customers to verify the
                return date and time to avoid extra charges. The best course of
                action is to contact our team of professionals and provide them
                with the necessary information.
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title
                >On what schedule do you charge for the rental?</template
              >
              <template #content>
                We charge daily rental fees, using the 24-hour time format. For
                example, a car rented at 2:00 pm will be due back at the same
                time the following day. We urge all customers to verify the
                return date and time to avoid extra charges. The best course of
                action is to contact our team of professionals and provide them
                with the necessary information.
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title
                >What can I expect to pay for car rentals in Dubai?</template
              >
              <template #content>
                We charge daily rental fees, using the 24-hour time format. For
                example, a car rented at 2:00 pm will be due back at the same
                time the following day. We urge all customers to verify the
                return date and time to avoid extra charges. The best course of
                action is to contact our team of professionals and provide them
                with the necessary information.
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title
                >Can I rent a car from Dubai International Airport
                24/7?</template
              >
              <template #content>
                We charge daily rental fees, using the 24-hour time format. For
                example, a car rented at 2:00 pm will be due back at the same
                time the following day. We urge all customers to verify the
                return date and time to avoid extra charges. The best course of
                action is to contact our team of professionals and provide them
                with the necessary information.
              </template>
            </UiSpoiler>
          </div>
        </div>
        <div class="faq-item">
          <h3 class="faq-item__title">Practical Information</h3>
          <div class="faq-item__list">
            <UiSpoiler>
              <template #title>What about parking availability?</template>
              <template #content>
                We charge daily rental fees, using the 24-hour time format. For
                example, a car rented at 2:00 pm will be due back at the same
                time the following day. We urge all customers to verify the
                return date and time to avoid extra charges. The best course of
                action is to contact our team of professionals and provide them
                with the necessary information.
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title
                >On what schedule do you charge for the rental?</template
              >
              <template #content>
                We charge daily rental fees, using the 24-hour time format. For
                example, a car rented at 2:00 pm will be due back at the same
                time the following day. We urge all customers to verify the
                return date and time to avoid extra charges. The best course of
                action is to contact our team of professionals and provide them
                with the necessary information.
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title
                >What can I expect to pay for car rentals in Dubai?</template
              >
              <template #content>
                We charge daily rental fees, using the 24-hour time format. For
                example, a car rented at 2:00 pm will be due back at the same
                time the following day. We urge all customers to verify the
                return date and time to avoid extra charges. The best course of
                action is to contact our team of professionals and provide them
                with the necessary information.
              </template>
            </UiSpoiler>
            <UiSpoiler>
              <template #title
                >Can I rent a car from Dubai International Airport
                24/7?</template
              >
              <template #content>
                We charge daily rental fees, using the 24-hour time format. For
                example, a car rented at 2:00 pm will be due back at the same
                time the following day. We urge all customers to verify the
                return date and time to avoid extra charges. The best course of
                action is to contact our team of professionals and provide them
                with the necessary information.
              </template>
            </UiSpoiler>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup>
const cars = [
  {
    id: 1,
    title: "Ferrari F8 Tributo Spyder",
    price_old: 800,
    price: 699,
    image: {
      path: "images/fake/blue_ferrari-f-tributo-spyder_2023_5106_main_418c0a75d6958ea527747c6032734721 1.png",
    },
    make: {
      name: "",
      path: "images/fake/Logos (2).png",
    },
  },
  {
    id: 2,
    title: "BMW 430i cabrio",
    price_old: 800,
    price: 499,
    image: {
      path: "images/fake/blue_ferrari-f-tributo-spyder_2023_5106_main_418c0a75d6958ea527747c6032734721 1 (1).png",
    },
    make: {
      name: "",
      path: "images/fake/Logos (3).png",
    },
  },
  {
    id: 3,
    title: "Rolls Royce Cullinan",
    price_old: 800,
    price: 599,
    image: {
      path: "images/fake/blue_ferrari-f-tributo-spyder_2023_5106_main_418c0a75d6958ea527747c6032734721 1 (2).png",
    },
    make: {
      name: "",
      path: "images/fake/Logos (4).png",
    },
  },
];

const { data: specialCars, get: getSpecialCars } = await useApi({
  name: "car.getAll",
  params: {
    extends: "images.image,price,price_special,generation.model_car.brand",
    "filterNEEQ[price_special.id]": true,
    sort: '-id',
    limit: 4,
  },
});

await getSpecialCars();

const { data: luxuryCars, get: getLuxuryCars } = await useApi({
  name: "car.getAll",
  params: {
    extends: "images.image,price,price_special,generation.model_car.brand",
    "filterEQ[category_id]": 6,
    sort: '-id',
    limit: 4,
  },
});

await getLuxuryCars();

const { data: suvCars, get: getsuvCars } = await useApi({
  name: "car.getAll",
  params: {
    extends: "images.image,price,price_special,generation.model_car.brand",
    "filterEQ[category_id]": 3,
    sort: '-id',
    limit: 4,
  },
});

await getsuvCars();
</script>

<style lang="scss" scoped>
.car-cards {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  margin-bottom: 20px;
}

.rental-service {
  margin-bottom: 42px;

  &__title {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    min-height: 44px;
  }

  &__content {
    max-width: 840px;

    p {
      line-height: 1;
    }
  }

  &__description {
    font-size: 14px;
    margin-bottom: 4px;
  }

  &__link {
    color: var(--color-basic);
    display: block;
    padding: 12px 16px;
    margin-left: auto;
    width: fit-content;
  }
}

.faq {
  &__title {
    display: flex;
    align-items: center;
    margin-bottom: 14px;
    min-height: 44px;
  }

  &__content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 24px;
  }

  &-item {
    &__title {
      font-size: 16px;
      font-weight: 500;
    }

    &__list {
      display: flex;
      flex-direction: column;
      row-gap: 8px;
      margin-top: 8px;
    }
  }
}
</style>
