<template>
  <div class="calc">
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
    <div class="calc-item">
      <div class="calc-item__flex">
        <div class="calc-item__flex_left">
          <amp-img
            src="/frontend-images/icon/deposit.svg"
            alt="Deposit"
            width="20"
            height="20"
          />
          <span>Deposit</span>
        </div>
        <span>AED {{ car?.security_deposit?.price }}</span>
      </div>
      <div class="calc-item__flex">
        <div class="calc-item__flex_left">
          <amp-img
            src="/frontend-images/icon/calendar.svg"
            alt="Calendar"
            width="20"
            height="20"
          />
          <span>Minimum rental period</span>
        </div>
        <span
          >{{ car?.min_days ?? 1 }} {{ pluralize("day", car?.min_days) }}</span
        >
      </div>
      <div class="calc-item__flex">
        <div class="calc-item__flex_left">
          <amp-img
            src="/frontend-images/icon/map.svg"
            alt="Calendar"
            width="20"
            height="20"
          />
          <span>Total mileage limit</span>
        </div>
        <span>{{ maxMileage }} km</span>
      </div>
      <div class="calc-item__flex">
        <div class="calc-item__flex_left">
          <amp-img
            src="/frontend-images/icon/settings.svg"
            alt="Calendar"
            width="20"
            height="20"
          />
          <span>Service and maintenance</span>
        </div>
        <span>Free</span>
      </div>
      <div class="calc-item__flex">
        <div class="calc-item__flex_left">
          <amp-img
            src="/frontend-images/icon/protect.svg"
            alt="Calendar"
            width="20"
            height="20"
          />
          <span>Basic insurance</span>
        </div>
        <span>Free</span>
      </div>
      <div class="calc-item__flex">
        <div class="calc-item__flex_left">
          <amp-img
            src="/frontend-images/icon/card.svg"
            alt="Calendar"
            width="20"
            height="20"
          />
          <span>VAT Tax Applicable</span>
        </div>
        <span>+5%</span>
      </div>

      <NuxtLink
        class="d-fle"
        :to="route.path?.replace('/amp', '') + '?open-book=true'"
      >
        <UiButton class="calc__button">Book</UiButton>
      </NuxtLink>
      <a
        class="d-flex"
        @click="clickWhatsApp"
        :href="`https://wa.me/${car?.user?.tel}?text=${getWhatsappText(
          car,
          true
        )}`"
        rel="noopener nofollow"
        target="_blank"
      >
        <UiButton class="calc__button no-click" @click.prevent color="whatsapp"
          >WhatsApp</UiButton
        >
      </a>
    </div>
    <slot name="car-info" />
  </div>
</template>

<script setup>
import lastItem from "lodash/last";
import moment from "moment";
import api from "~/api";

const route = useRoute();

const props = defineProps({
  car: Object,
});

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
const startDateFormated = computed(() =>
  moment(start_date.value.modelValue).format("D MMM YYYY")
);

const periodRental = computed(
  () => props.car?.price_leasing?.[periodSelect.value.modelValue]?.period / 30
);

const periodText = computed(() => pluralize("month", periodRental.value));

const maxMileage = computed(
  () => props?.car?.price_leasing?.[periodSelect.value.modelValue]?.mileage
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
@import "../../../assets/scss/components/calc-amount";
@import "../../../assets/scss/components/car-carc";
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
