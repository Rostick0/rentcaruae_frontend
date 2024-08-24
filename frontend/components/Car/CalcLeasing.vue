<template>
  <form class="calc" @submit="onSubmit">
    <div class="calc__top">
      <div class="calc__top_left">
        <div class="calc__top_title calc__title">Monthly rental offer</div>
      </div>
      <div class="calc__top_right">
        <div class="calc__price-old">Monthly price</div>
        <div class="calc__price">
          AED
          <span class="calc__price_val">{{ price }}</span>
        </div>
      </div>
    </div>
    <div class="calc-range">
      <div class="calc-range__top text-ui text-pre-small">
        <div class="">{{ periodRental }} {{ periodText }}</div>
        <div class="text-right">
          <del
            class="calc-range__del color-red"
            v-if="periodSelect.modelValue !== 0"
            >AED
            {{ formatNumber(priceRentalDel) }}
          </del>
          <div class="">
            AED
            {{ formatNumber(priceRental) }}
          </div>
        </div>
      </div>
      <VFormComponent :field="periodSelect" />
      <div class="calc-range__bottom">
        <div class="">{{ minMonth }}</div>
        <div class="">{{ maxMonth }}</div>
      </div>
    </div>
    <div class="calc-item">
      <div class="calc-item__flex">
        <div class="calc-item__flex_left">
          <LazyNuxtImg
            src="images/icon/deposit.svg"
            alt="Deposit"
            loading="lazy"
            width="20"
            heihgt="20"
          />
          <span>Deposit</span>
        </div>
        <span>AED {{ car?.security_deposit?.price }}</span>
      </div>
      <div class="calc-item__flex">
        <div class="calc-item__flex_left">
          <LazyNuxtImg
            src="images/icon/calendar.svg"
            alt="Calendar"
            loading="lazy"
            width="20"
            heihgt="20"
          />
          <span>Minimum rental period</span>
        </div>
        <span
          >{{ car?.min_days ?? 1 }} {{ pluralize("day", car?.min_days) }}</span
        >
      </div>
      <div class="calc-item__flex">
        <div class="calc-item__flex_left">
          <LazyNuxtImg
            src="images/icon/map.svg"
            alt="Calendar"
            loading="lazy"
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
            alt="Calendar"
            loading="lazy"
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
            alt="Calendar"
            loading="lazy"
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
            alt="Calendar"
            loading="lazy"
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
    <template v-if="isBook">
      <div class="calc-item">
        <div class="calc__title">Choose rental dates</div>
        <div class="calc-date">
          <div class="calc-date__item">
            <strong class="calc-item__size-small">Start date</strong>
            <div class="text-ui">
              {{ moment(start_date.modelValue).format("D MMM YYYY") }}
            </div>
          </div>
          <div class="calc-date__item">
            <strong class="calc-item__size-small">Your rental</strong>
            <div class="calc__price text-ui">
              {{ periodRental }} {{ periodText }}
            </div>
          </div>
        </div>
        <VFormComponent :field="start_date" />
      </div>
      <CarForm
        :periodRental="periodRental"
        :priceRental="priceRental"
        :periodText="periodText"
      />
    </template>
  </form>
</template>

<script setup>
import lastItem from "lodash/last";
import { useForm } from "vee-validate";
import moment from "moment";
import api from "~/api";

const props = defineProps({
  car: Object,
});

const route = useRoute();

const isBook = ref();
// const book = ref();

const clickBook = () => {
  isBook.value = true;

  // nextTick(() => {
  //   book.value?.scrollIntoView({ behavior: "smooth" });
  // });
};

const isAddStatisticWhatsApp = ref(false);

const clickWhatsApp = async () => {
  if (!isAddStatisticWhatsApp) return;
  isAddStatisticWhatsApp.value = true;

  try {
    await api.statisticsDay.create({
      data: {
        type: "whatsapp",
        car_id: props?.car?.id,
      },
    });
  } catch {}
};

const { handleSubmit, setErrors } = useForm();

const onSubmit = handleSubmit(async ({ start_date, tel, ...values }) => {
  const data = {
    ...values,
    start_date: moment(start_date).format("YYYY-MM-DD"),
    tel: convertTelToDbOrNull(tel),
    car_id: route.params.id,
    type: "leasing",
  };

  const res = await api.operations.create({ data });

  if (res?.error) {
    warningPopup(res?.errorResponse?.data?.message);
    setErrors(res?.errorResponse?.data?.errors);
    return;
  }

  success("Thank you for your application");

  isBook.value = false;
});

const periodSelect = ref({
  type: "range",
  name: "period",
  modelValue: 0,

  bind: {
    partsCount: props.car?.price_leasing?.length - 1,
  },
});

const start_date = ref({
  type: "date",
  name: "start_date",
  modelValue: new Date(),

  bind: {
    autoApply: true,
    inline: true,
    enableTimePicker: false,
    monthNameFormat: "long",
    minDate: new Date(),
  },
});

const periodRental = computed(
  () => props.car?.price_leasing?.[periodSelect.value.modelValue]?.period / 30
);

const periodText = computed(() => pluralize("month", periodRental.value));

const maxMileage = computed(() =>
  props?.car?.price_leasing?.length && Array.isArray(props?.car?.price_leasing)
    ? Math.max(...props?.car?.price_leasing?.map((item) => item?.mileage))
    : 0
);

const price = computed(() =>
  formatNumber(
    props?.car?.price_leasing?.[periodSelect.value.modelValue]?.price
  )
);

const priceRentalDel = computed(
  () =>
    (props.car?.price_leasing[0]?.price *
      props.car?.price_leasing[periodSelect.value.modelValue]?.period) /
    30
);

const priceRental = computed(
  () =>
    props.car?.price_leasing[periodSelect.value.modelValue]?.price *
    (props.car?.price_leasing[periodSelect.value.modelValue]?.period / 30)
);

const lastPriceLeasing = computed(() => lastItem(props.car?.price_leasing));

const minMonth = computed(() => {
  const monthCount = props.car?.price_leasing?.[0]?.period / 30;

  return `${monthCount} ${pluralize("month", monthCount)}`;
});

const maxMonth = computed(() => {
  const monthCount = lastPriceLeasing.value?.period / 30;

  return `${monthCount} ${pluralize("month", monthCount)}`;
});
</script>

<style lang="scss" scoped>
@import "../../assets/scss/components/car-carc";

.calc {
  &-range {
    &__top,
    &__bottom {
      display: flex;
      justify-content: space-between;
      font-weight: 500;
    }

    &__top {
      align-items: flex-end;
      font-size: 14px;
    }
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
