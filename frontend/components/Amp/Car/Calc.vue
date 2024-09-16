<template>
  <div class="calc">
    <div class="calc__top">
      <div class="calc__top_left">
        <div class="calc__top_title calc__title">
          {{ periodSelect.modelValue?.name }} rental offer
        </div>
      </div>
      <div class="calc__top_right">
        <div class="calc__price-old">
          {{ periodSelect.modelValue?.name }}
          <del class="color-red" v-if="priceSpecial"
            >AED {{ priceSpecial }}</del
          >
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
      <div class="calc-item__flex" v-if="!car?.free_per_day_security">
        <div class="calc-item__flex_left">
          <div>
            You can rent a car without any deposit dy including the additional
            service fee in your rental price
          </div>
        </div>
        <div class="calc-item__flex_right">
          AED 45 <br />
          <span class="calc-item__size-small">per day</span>
        </div>
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

      <NuxtLink :to="route.path?.replace('/amp', '') + '?open-book=true'">
        <UiButton class="calc__button">Book</UiButton>
      </NuxtLink>
      <a
        class="d-flex"
        @click="clickWhatsApp"
        :href="`https://wa.me/${car?.user?.tel}?text=${getWhatsappText(car)}`"
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
  type: "select",
  name: "period",
  modelValue: periodOptions[0],

  bind: {
    options: periodOptions,
    isAlternative: true,
  },
});

const maxMileage = computed(
  () =>
    props?.car?.price?.find(
      (item) => item?.period === periodSelect.value.modelValue?.period
    )?.mileage
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
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/components/car-carc";
@import "../../../assets/scss/components/calc-amount";
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
