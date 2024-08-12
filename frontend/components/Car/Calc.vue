<template>
  <form class="calc" @submit="onSubmit">
    <div class="calc__top">
      <div class="calc__top_left">
        <div class="calc__top_title calc__title">
          {{ periodSelect.modelValue?.name }} rental offer
        </div>
        <div class="calc__top_period">
          <span>Selected period:</span>
          <div>
            <VFormComponent :field="periodSelect" />
          </div>
        </div>
      </div>
      <div class="calc__top_right">
        <div class="calc__price-old">
          {{ periodSelect.modelValue?.name }}
          <del class="del" v-if="priceSpecial">AED {{ priceSpecial }}</del>
        </div>
        <div class="calc__price">
          AED
          <span class="calc__price_val">{{ price }}</span>
        </div>
      </div>
    </div>
    <!-- <UiRange modelValue="50" /> -->
    <div class="calc-item">
      <div class="calc-item__flex">
        <div class="calc-item__flex_left">
          <LazyNuxtImg
            src="images/icon/deposit.svg"
            loading="lazy"
            alt="Deposit"
            width="20"
            heihgt="20"
          />
          <span>Deposit</span>
        </div>
        <span>AED {{ car?.security_deposit?.price }}</span>
      </div>
      <div class="calc-item__flex" v-if="!car?.free_per_day_security">
        <div class="calc-item__flex_left">
          <VFormComponent
            class="calc-item__switch calc-item__size-small"
            :field="without_deposite"
          />
        </div>
        <div class="calc-item__flex_right">
          AED 45 <br />
          <span class="calc-item__size-small">per day</span>
        </div>
      </div>
      <div class="calc-item__flex">
        <div class="calc-item__flex_left">
          <LazyNuxtImg
            src="images/icon/calendar.svg"
            loading="lazy"
            alt="Calendar"
            width="20"
            heihgt="20"
          />
          <span>Minimum rental period</span>
        </div>
        <span
          >{{ car?.min_days ?? 1 }}
          {{ car?.min_days > 1 ? "days" : "day" }}</span
        >
      </div>
      <div class="calc-item__flex">
        <div class="calc-item__flex_left">
          <LazyNuxtImg
            src="images/icon/map.svg"
            loading="lazy"
            alt="Calendar"
            width="20"
            heihgt="20"
          />
          <span>Total mileage limit</span>
        </div>
        <span>{{ maxMileage }} km</span>
      </div>
      <div class="calc-item__flex">
        <div class="calc-item__flex_left">
          <LazyNuxtImg
            src="images/icon/settings.svg"
            loading="lazy"
            alt="Calendar"
            width="20"
            heihgt="20"
          />
          <span>Service and maintenance</span>
        </div>
        <span>Free</span>
      </div>
      <div class="calc-item__flex">
        <div class="calc-item__flex_left">
          <LazyNuxtImg
            src="images/icon/protect.svg"
            loading="lazy"
            alt="Calendar"
            width="20"
            heihgt="20"
          />
          <span>Basic insurance</span>
        </div>
        <span>Free</span>
      </div>
      <div class="calc-item__flex">
        <div class="calc-item__flex_left">
          <LazyNuxtImg
            src="images/icon/card.svg"
            loading="lazy"
            alt="Calendar"
            width="20"
            heihgt="20"
          />
          <span>VAT Tax Applicable</span>
        </div>
        <span>+5%</span>
      </div>

      <UiButton class="calc__button" @click.prevent="clickBook">Book</UiButton>
      <a
        class="d-flex"
        @click="clickWhatsApp"
        :href="`https://wa.me/${car?.user?.tel}`"
        rel="noopener nofollow"
        target="_blank"
      >
        <UiButton class="calc__button no-click" @click.prevent color="whatsapp"
          >WhatsApp</UiButton
        >
      </a>
    </div>
    <div class="calc-item">
      <div class="calc__title">Choose rental dates</div>
      <div class="calc-date">
        <div class="calc-date__item">
          <strong class="calc-item__size-small">Pick-up date</strong>
          <div class="text-ui">
            {{ moment(period.modelValue?.[0]).format("D MMM YYYY") }}
          </div>
        </div>
        <div class="calc-date__item">
          <strong class="calc-item__size-small">Drop-off date</strong>
          <div class="text-ui">
            {{ moment(period.modelValue?.[1]).format("D MMM YYYY") }}
          </div>
        </div>
        <div class="calc-date__item">
          <strong class="calc-item__size-small">Your rental</strong>
          <div class="calc__price text-ui">{{ daysRental }} {{ dayText }}</div>
        </div>
      </div>
      <VFormComponent :field="period" />
    </div>
    <div class="calc-item" ref="book" v-if="isBook">
      <div class="calc__title">Your booking details</div>
      <VFormComponent :field="tel" />
      <VFormComponent :field="full_name" />
      <VFormComponent :field="email" />
      <div class="calc__amount">
        <div class="calc-item__flex">
          <div class="calc-item__flex_left">
            <span>Rental</span>
            <span>{{ daysRental }} {{ dayText }}</span>
          </div>
          <strong class="calc-item__size-small"
            >AED {{ formatNumber(priceRental) }}</strong
          >
        </div>
        <div class="calc-item__flex">
          <div class="calc-item__flex_left">
            <span>VAT</span>
            <span>Tax (5%)</span>
          </div>
          <strong class="calc-item__size-small"
            >+ AED {{ formatNumber(tax) }}</strong
          >
        </div>
        <div class="calc-item__hr"></div>
        <div class="calc-item__flex">
          <div class="calc__title">Total</div>
          <strong class="calc__price">
            AED
            <span class="calc__price_val">{{
              formatNumber(priceRental + tax)
            }}</span>
          </strong>
        </div>
      </div>
      <UiButton class="calc__button">Book</UiButton>
    </div>
  </form>
</template>

<script setup>
import { useForm } from "vee-validate";
import moment from "moment";
import api from "~/api";

const props = defineProps({
  car: Object,
});

const isBook = ref();
const book = ref();

const clickBook = () => {
  isBook.value = true;

  nextTick(() => {
    book.value?.scrollIntoView({ behavior: "smooth" });
  });
};

const isAddStatisticWhatsApp = ref(false);

const clickWhatsApp = async () => {
  if (!isAddStatisticWhatsApp) return;

  try {
    await api.statisticsDay.create({
      data: {
        type: "whatsapp",
        car_id: props?.car?.id,
      },
    });
    isAddStatisticWhatsApp.value = true;
  } catch {}
};

const { handleSubmit } = useForm();

const onSubmit = handleSubmit(async (values) => {
  // console.log(values);
  // await api.operations.create()
});

const periodSelect = ref({
  type: "select",
  name: "period",
  modelValue: periodOptions[0],

  bind: {
    options: periodOptions,
    isAlternative: true,
    // slots: "dasd",
  },
});

const period = ref({
  type: "date",
  name: "period",
  modelValue: [new Date(), new Date()],

  bind: {
    inline: true,
    enableTimePicker: false,
    range: true,
    monthNameFormat: "long",
    // options: periodOptions,
    // slots: "dasd",
  },
});

const without_deposite = ref({
  type: "switch",
  name: "without_deposite",
  modelValue: false,

  bind: {
    label:
      "You can rent a car without any deposit dy including the additional service fee in your rental price",
  },
});

const daysRental = ref(
  moment(period.modelValue?.[1]).diff(moment(period.modelValue?.[0]), "days") +
    1
);

const dayText = computed(() => (daysRental?.value > 1 ? "days" : "day"));

const maxMileage = computed(() =>
  props?.car?.price?.length && Array.isArray(props?.car?.price)
    ? Math.max(...props?.car?.price?.map((item) => item?.mileage))
    : 0
);

const priceSpecial = computed(() =>
  formatNumber(
    props?.car?.price_special?.find(
      (item) => item?.period === periodSelect.value.modelValue.period
    )?.price &&
      props?.car?.price?.find(
        (item) => item?.period === periodSelect.value.modelValue.period
      )?.price
  )
);

const price = computed(() =>
  formatNumber(
    props?.car?.price_special?.find(
      (item) => item?.period === periodSelect.value.modelValue.period
    )?.price ??
      props?.car?.price?.find(
        (item) => item?.period === periodSelect.value.modelValue.period
      )?.price
  )
);

const priceRental = computed(
  () =>
    getPeriodPrice(props.car, daysRental.value) +
    (without_deposite.value?.modelValue ? 45 * daysRental.value : 0)
);
const tax = computed(() => priceRental.value * 0.05);

watch(
  () => period.value.modelValue,
  () => {
    daysRental.value =
      moment(period.value.modelValue?.[1]).diff(
        moment(period.value.modelValue?.[0]),
        "days"
      ) + 1;
  }
);

const tel = ref({
  type: "tel",
  name: "tel",
  modelValue: [],

  bind: {
    label: "Phone number",
    // slots: "dasd",
  },
});

const full_name = ref({
  type: "text",
  name: "full_name",
  modelValue: "",
  rules: "required|max:255",

  bind: {
    label: "Full Name",
  },
});

const email = ref({
  type: "text",
  name: "email",
  modelValue: "",
  rules: "required|email|max:255",

  bind: {
    label: "E-mail",
  },
});
</script>

<style lang="scss" scoped>
.calc {
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  &__title {
    font-size: 24px;
    font-weight: 700;
  }

  &__top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    font-weight: 700;

    &_title {
      margin-bottom: 4px;

      &::first-letter {
        text-transform: uppercase;
      }
    }

    &_right {
      text-align: end;
    }

    &_period {
      display: flex;
      column-gap: 10px;
    }
  }

  &__price {
    color: var(--color-basic);
    font-size: 20px;

    &-old {
      font-size: 12px;

      &::first-letter {
        text-transform: uppercase;
      }
    }

    &_val {
      font-size: 28px;
    }
  }

  &-item {
    background-color: var(--color-white);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    padding: 24px 12px;

    &__flex {
      display: flex;
      align-items: center;
      justify-content: space-between;

      &_left {
        display: flex;
        align-items: center;
        column-gap: 4px;
        font-size: 14px;

        img {
          flex-shrink: 0;
        }
      }

      &_right {
        text-align: end;
      }
    }

    &__size-small {
      font-size: 12px;
    }

    &__hr {
      background-color: #f5f5f5;
      width: 100%;
      height: 1px;
    }
  }

  &-date {
    display: flex;
    column-gap: 12px;

    &__item {
      background-color: #f5f5f5;
      border-radius: 8px;
      padding: 8px;

      &:last-child {
        background-color: transparent;
        margin-left: auto;
        text-align: right;
      }
    }
  }

  &__button {
    padding: 12px;
    width: 100%;
  }

  &__amount {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }
}
</style>

<style lang="scss">
.calc {
  &__top {
    &_period {
      .select__value {
        padding: 0;
        padding-right: 40px;
      }
    }
  }

  .switch {
    &__label {
      font-size: 12px;
      max-width: 284px;
    }
  }
}
</style>
