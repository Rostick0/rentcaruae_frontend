<template>
  <form class="calc" @submit="onSubmit">
    <div class="calc__top">
      <div class="calc__top_left">
        <div class="calc__top_title calc__title">
          {{ $t("monthly") }} {{ $t("calc.rentalOffer") }}
        </div>
      </div>
      <div class="calc__top_right">
        <div class="calc__price-old">{{ $t("calc.monthlyPrice") }}</div>
        <div class="calc__price">
          {{ currentExchangeRate?.name }}
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
            >{{ currentExchangeRate?.name }}
            {{ formatNumber(getConvertedPrice(priceRentalDel)) }}
          </del>
          <div class="">
            {{ currentExchangeRate?.name }}
            {{ formatNumber(getConvertedPrice(priceRental)) }}
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
            src="frontend-images/icon/deposit.svg"
            alt="Deposit"
            loading="lazy"
            width="20"
            height="20"
          />
          <span>{{ $t("calc.Deposit") }}</span>
        </div>
        <span
          >{{ currentExchangeRate?.name }}
          {{ getConvertedPrice(car?.security_deposit?.price) }}</span
        >
      </div>
      <div class="calc-item__flex">
        <div class="calc-item__flex_left">
          <LazyNuxtImg
            src="frontend-images/icon/calendar.svg"
            alt="Calendar"
            loading="lazy"
            width="20"
            height="20"
          />
          <span>{{ $t("calc.minRentalPeriod") }}</span>
        </div>
        <span
          >{{ car?.min_days ?? 1 }}
          {{ $t("calc." + pluralize("day", car?.min_days)) }}</span
        >
      </div>
      <div class="calc-item__flex">
        <div class="calc-item__flex_left">
          <LazyNuxtImg
            src="frontend-images/icon/map.svg"
            alt="Calendar"
            loading="lazy"
            width="20"
            height="20"
          />
          <span>{{ $t("calc.totalMileageLimit") }}</span>
        </div>
        <span>{{ maxMileage }} {{ $t("calc.km") }}</span>
      </div>
      <div class="calc-item__flex">
        <div class="calc-item__flex_left">
          <LazyNuxtImg
            src="frontend-images/icon/settings.svg"
            alt="Calendar"
            loading="lazy"
            width="20"
            height="20"
          />
          <span>{{ $t("calc.serviceMaintenance") }}</span>
        </div>
        <span>{{ $t("calc.Free") }}</span>
      </div>
      <div class="calc-item__flex">
        <div class="calc-item__flex_left">
          <LazyNuxtImg
            src="frontend-images/icon/protect.svg"
            alt="Calendar"
            loading="lazy"
            width="20"
            height="20"
          />
          <span>{{ $t("calc.basicInsurance") }}</span>
        </div>
        <span>{{ $t("calc.Free") }}</span>
      </div>
      <div class="calc-item__flex">
        <div class="calc-item__flex_left">
          <LazyNuxtImg
            src="frontend-images/icon/card.svg"
            alt="Calendar"
            loading="lazy"
            width="20"
            height="20"
          />
          <span>{{ $t("VAT") }} {{ $t("Tax") }} {{ $t("Applicable") }}</span>
        </div>
        <span>+5%</span>
      </div>

      <UiButton class="calc__button" @click.prevent="clickBook">{{
        $t("calc.Book")
      }}</UiButton>
      <a
        class="d-flex"
        :href="`https://wa.me/${car?.user?.company?.tel}?text=${getWhatsappText(
          car,
          true
        )}`"
        rel="noopener nofollow"
        target="_blank"
      >
        <UiButton
          class="calc__button no-click"
          @click="clickWhatsApp"
          color="whatsapp"
          >{{ $t("calc.WhatsApp") }}</UiButton
        >
      </a>
    </div>
    <slot name="car-info" />
    <template v-if="isBook">
      <div class="calc-item" ref="book">
        <div class="calc__title">{{ $t("calc.chooseRentalDates") }}</div>
        <div class="calc-date">
          <div class="calc-date__item">
            <strong class="calc-item__size-small">{{
              $t("calc.startDate")
            }}</strong>
            <div class="text-ui">
              {{ startDateFormated }}
            </div>
          </div>
          <div class="calc-date__item">
            <strong class="calc-item__size-small">{{
              $t("calc.yourRental")
            }}</strong>
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
        :tax="tax"
      >
        <template #calc-stats>
          <div class="calc-amount__flex">
            <div class="calc-amount__flex_left">{{ $t("calc.startDate") }}</div>
            <strong class="text-ui calc-amount__size-small">{{
              startDateFormated
            }}</strong>
          </div>
          <div class="calc-amount__flex">
            <div class="calc-amount__flex_left">
              {{ $t("calc.carDelivery") }}
            </div>
            <strong class="calc-amount__size-small">{{ $t("Free") }}</strong>
          </div>
        </template>
        <template #summary>
          <div class="calc-amount__flex">
            <div class="calc__title">{{ $t("calc.monthlyPayment") }}</div>
            <strong class="calc-amount__price">
              {{ currentExchangeRate?.name }}
              <span class="calc-amount__price_val">{{ price }}</span>
            </strong>
          </div>
        </template>
      </CarForm>
      <VFormComponent :field="g_recaptcha_response" />
    </template>
  </form>
</template>

<script setup>
import lastItem from "lodash/last";
import { useForm } from "vee-validate";
import moment from "moment";
import api from "~/api";

const emits = defineEmits(["submited"]);

const props = defineProps({
  car: Object,
});

const { currentExchangeRate, getConvertedPrice } = await useExchangeRate();

const route = useRoute();

const { t } = useI18n();

const isBook = ref(route.query?.["open-book"]);
const book = ref();

onMounted(() => {
  if (isBook.value) {
    book.value?.scrollIntoView({ behavior: "smooth" });
  }
});

const clickBook = () => {
  isBook.value = true;

  nextTick(() => {
    book.value?.scrollIntoView({ behavior: "smooth" });
  });
};

const isAddStatisticWhatsApp = ref(false);

const clickWhatsApp = async () => {
  if (!isAddStatisticWhatsApp.value) return;
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
    tel: convertPhoneToDb(tel),
    car_id: route.params.id,
    type: "leasing",
  };
  const res = await api.operations.create({ data });

  g_recaptcha_response.value.modelValue = "";

  if (res?.error) {
    warningPopup(res?.errorResponse?.data?.message);
    setErrors(res?.errorResponse?.data?.errors);
    return;
  }

  success(t("calc.thankApplication"));
  isBook.value = false;
  emits("submited", true);
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

const g_recaptcha_response = ref({
  type: "recaptcha",
  name: "g_recaptcha_response",
  modelValue: "",
});

const startDateFormated = computed(() =>
  moment(start_date.value.modelValue).format("D MMM YYYY")
);

const periodRental = computed(
  () => props.car?.price_leasing?.[periodSelect.value.modelValue]?.period / 30
);

const periodText = computed(() => t(pluralize("month", periodRental.value)));

const maxMileage = computed(
  () => props?.car?.price_leasing?.[periodSelect.value.modelValue]?.mileage
);

const price = computed(() =>
  formatNumber(
    getConvertedPrice(
      props?.car?.price_leasing?.[periodSelect.value.modelValue]?.price
    )
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
const tax = computed(() => Math.round(priceRentalDel.value * 0.05));

const lastPriceLeasing = computed(() => lastItem(props.car?.price_leasing));

const minMonth = computed(() => {
  const monthCount = props.car?.price_leasing?.[0]?.period / 30;

  return `${monthCount} ${t(pluralize("month", monthCount))}`;
});

const maxMonth = computed(() => {
  const monthCount = lastPriceLeasing.value?.period / 30;

  return `${monthCount} ${t(pluralize("month", monthCount))}`;
});
</script>

<style lang="scss" scoped>
@forward "../../assets/scss/components/calc-amount";
@forward "../../assets/scss/components/car-carc";

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
