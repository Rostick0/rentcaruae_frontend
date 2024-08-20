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
          >{{ car?.min_days ?? 1 }} {{ pluralize("day", car?.min_days) }}</span
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
          <div class="calc__price text-ui">{{ periodRental }} {{ periodText }}</div>
        </div>
      </div>
      <VFormComponent :field="period" />
    </div>
    <CarForm
      v-if="isBook"
      :periodRental="periodRental"
      :priceRental="priceRental"
      :periodText="periodText"
    />
  </form>
</template>

<script setup>
import { useForm } from "vee-validate";
import moment from "moment";
import api from "~/api";

const props = defineProps({
  car: Object,
});

const route = useRoute();

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

const { handleSubmit } = useForm();

const onSubmit = handleSubmit(async ({ period, tel, ...values }) => {
  const data = {
    ...values,
    start_date: moment(period?.[1]).format("YYYY-MM-DD"),
    period: periodRental.value,
    tel: convertTelToDbOrNull(tel),
    car_id: route.params.id,
    type: "economy",
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
  type: "select",
  name: "period",
  modelValue: periodOptions[0],

  bind: {
    options: periodOptions,
    isAlternative: true,
  },
});

const period = ref({
  type: "date",
  name: "period",
  modelValue: [new Date(), new Date()],

  bind: {
    autoApply: true,
    inline: true,
    enableTimePicker: false,
    range: true,
    monthNameFormat: "long",
    minDate: new Date(),
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

const periodRental = ref(
  moment(period.modelValue?.[1]).diff(moment(period.modelValue?.[0]), "days") +
    1
);

const periodText = computed(() => pluralize("day", periodRental?.value));

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
    getPeriodPrice(props.car, periodRental.value) +
    (without_deposite.value?.modelValue ? 45 * periodRental.value : 0)
);

watch(
  () => period.value.modelValue,
  () => {
    periodRental.value =
      moment(period.value.modelValue?.[1]).diff(
        moment(period.value.modelValue?.[0]),
        "days"
      ) + 1;
  }
);
</script>

<style lang="scss" scoped>
@import "../../assets/scss/components/car-carc";
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
