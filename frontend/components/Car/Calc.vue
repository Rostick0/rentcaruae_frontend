<template>
  <form class="calc" @submit="onSubmit">
    <div class="calc__top">
      <div class="calc__top_left">
        <div class="calc__top_title calc__title">
          {{ periodSelect.modelValue?.name }} {{ $t("calc.rentalOffer") }}
        </div>
        <div class="calc__top_period">
          <span>{{ $t("calc.selectedPeriod") }}:</span>
          <div>
            <VFormComponent :field="periodSelect" />
          </div>
        </div>
      </div>
      <div class="calc__top_right">
        <div class="calc__price-old">
          {{ periodSelect.modelValue?.name }}
          <del class="color-red" v-if="priceSpecial"
            >{{ currentExchangeRate?.name }} {{ priceSpecial }}</del
          >
        </div>
        <div class="calc__price">
          {{ currentExchangeRate?.name }}
          <span class="calc__price_val">{{ price }}</span>
        </div>
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
        <strong v-if="without_deposite.modelValue" class="color-basic">{{
          $t("calc.FREE")
        }}</strong>
        <span v-else
          >{{ currentExchangeRate?.name }}
          {{ getConvertedPrice(car?.security_deposit?.price) }}</span
        >
      </div>
      <!-- {{car}} -->
      <div class="calc-item__flex" v-if="car?.free_per_day_security">
        <div class="calc-item__flex_left">
          <VFormComponent
            class="calc-item__switch calc-item__size-small"
            :field="without_deposite"
          />
        </div>
        <div class="calc-item__flex_right">
          {{ currentExchangeRate?.name }}
          {{ getConvertedPrice(WITHOUT_DEPOSITE_PRICE) }} <br />
          <span class="calc-item__size-small">{{ $t("calc.perDay") }}</span>
        </div>
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
        @click="clickWhatsApp"
        :href="`https://wa.me/${car?.user?.company?.tel}?text=${getWhatsappText(
          car
        )}`"
        rel="noopener nofollow"
        target="_blank"
      >
        <UiButton
          class="calc__button no-click"
          @click.prevent
          color="whatsapp"
          >{{ $t("calc.WhatsApp") }}</UiButton
        >
      </a>
    </div>
    <slot name="car-info" />
    <template v-if="isBook">
      <div class="calc-item" ref="book">
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
            <div class="calc__price text-ui">
              {{ periodRental }} {{ periodText }}
            </div>
          </div>
        </div>
        <VFormComponent :field="period" />
      </div>
      <CarForm
        :periodRental="periodRental"
        :priceRental="priceRental"
        :periodText="periodText"
        :tax="tax"
      >
        <template #calc-stats>
          <div class="calc-amount__flex" v-if="without_deposite.modelValue">
            <div class="calc-amount__flex_left">{{ $t("depositeFree") }}</div>
            <strong class="calc-amount__size-small"
              >{{ currentExchangeRate?.name }}
              {{ withoutDepositePrice }}</strong
            >
          </div>
        </template>
        <template #summary>
          <div class="calc-amount__flex">
            <div class="calc__title">{{ $t("Total") }}</div>
            <strong class="calc-amount__price">
              {{ currentExchangeRate?.name }}
              <span class="calc-amount__price_val">{{
                formatNumber(getConvertedPrice(total))
              }}</span>
            </strong>
          </div>
        </template>
      </CarForm>
      <VFormComponent :field="g_recaptcha_response" />
    </template>
  </form>
</template>

<script setup>
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
  if (isAddStatisticWhatsApp.value) return;
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

const onSubmit = handleSubmit(async ({ period, tel, ...values }) => {
  const data = {
    ...values,
    start_date: moment(period?.[1]).format("YYYY-MM-DD"),
    period: periodRental.value,
    tel: convertPhoneToDb(tel),
    car_id: route.params.id,
    type: "rent",
  };
  const res = await api.operations.create({ data });

  g_recaptcha_response.value.modelValue = "";

  if (res?.error) {
    warningPopup(res?.errorResponse?.data?.message);
    setErrors(res?.errorResponse?.data?.errors);
    return;
  }

  success(t('calc.thankApplication'));
  isBook.value = false;
  emits("submited", true);
});

const translitedPeriodSelect = periodOptions.map((item) => ({
  ...item,
  name: t(item.name),
}));

const periodSelect = ref({
  type: "select",
  name: "period",
  modelValue: translitedPeriodSelect[0],

  bind: {
    options: translitedPeriodSelect,
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

const g_recaptcha_response = ref({
  type: "recaptcha",
  name: "g_recaptcha_response",
  modelValue: "",
});

const periodRental = ref(
  moment(period.modelValue?.[1]).diff(moment(period.modelValue?.[0]), "days") +
    1
);

const periodText = computed(() => pluralize("day", periodRental?.value));

const maxMileage = computed(
  () =>
    props?.car?.price?.find(
      (item) => item?.period === periodSelect.value.modelValue?.period
    )?.mileage
);

const priceSpecial = computed(() =>
  props?.car?.price_special?.find(
    (item) => item?.period === periodSelect.value.modelValue.period
  )?.price
    ? formatNumber(
        getConvertedPrice(
          props?.car?.price?.find(
            (item) => item?.period === periodSelect.value.modelValue.period
          )?.price
        )
      )
    : null
);

const price = computed(() =>
  formatNumber(
    getConvertedPrice(
      props?.car?.price_special?.find(
        (item) => item?.period === periodSelect.value.modelValue.period
      )?.price ??
        props?.car?.price?.find(
          (item) => item?.period === periodSelect.value.modelValue.period
        )?.price
    )
  )
);

const withoutDepositePrice = computed(() =>
  without_deposite.value?.modelValue
    ? getConvertedPrice(45 * periodRental.value)
    : 0
);

const priceRental = computed(() =>
  getPeriodPrice(props.car, periodRental.value)
);

const preTotal = computed(() =>
  Math.round(priceRental.value + withoutDepositePrice.value)
);
const tax = computed(() => Math.round(preTotal.value * 0.05));
const total = computed(() => preTotal.value + tax.value);

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
@forward "../../assets/scss/components/car-carc";
@forward "../../assets/scss/components/calc-amount";
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
