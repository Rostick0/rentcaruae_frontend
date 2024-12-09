<template>
  <div class="admin-dashboard">
    <h1 class="h1 seller">Dashboard</h1>
    <div class="admin-dashboard__charts">
      <div class="">
        <AnyChartStats
          :datasets="[
            {
              backgroundColor: '#10c44d',
              borderColor: '#10c44d',
              label: 'Payments',
              data: chartData.paymentsData,
            },
          ]"
          :labels="labels"
        />
      </div>
      <div class="">
        <AnyChartStats
          :datasets="[
            {
              backgroundColor: '#a82130',
              borderColor: '#a82130',
              label: 'Spendings',
              data: chartData.spendingsData,
            },
          ]"
          :labels="labels"
        />
      </div>
      <div class="">
        <AnyChartStats
          :datasets="[
            {
              backgroundColor: '#221ee3',
              borderColor: '#221ee3',
              label: 'Booking',
              data: chartData.bookingAppData,
            },
            {
              backgroundColor: '#10c44d',
              borderColor: '#10c44d',
              label: 'Whatsapp',
              data: chartData.whatsAppData,
            },
          ]"
          :labels="labels"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";

const { data, get } = await useApi({
  name: "statisticsDay.getAll",
  params: {
    "filterGEQ[date]": moment().add(-29, "days").format("YYYY-MM-DD"),
    for_admin: true,
    sort: "date",
    limit: 30,
  },
});
await get();

const { data: dataPayments, get: getPayments } = await useApi({
  name: "depositeUsers.union",
  params: {
    sort: "date",
    limit: 30,
  },
});
await getPayments();

const lastThirtyDays = ref(
  [...new Array(30)].map(
    (i, idx, arr) =>
      moment()
        .startOf("day")
        .subtract(arr.length - 1 - idx, "days")
        // .format("DD")
        .format("YYYY-MM-DD")
    // .format("DD-MM-YYYY")
  )
);

const labels = computed(() =>
  lastThirtyDays.value.map((item) => {
    const day = item.split("-")[2];

    if (["01", "02"].includes(day))
      return new Date(item)?.toLocaleDateString("en-us", {
        month: "short",
      });

    return day;
  })
);

const chartData = computed(() => {
  const paymentsData = [];
  const spendingsData = [];
  const bookingAppData = [];
  const whatsAppData = [];

  lastThirtyDays.value.forEach((item) => {
    paymentsData.push(
      dataPayments.value?.find?.((el) => el?.date === item)?.sum ?? 0
    );

    const el = data.value?.find?.((el) => el?.date === item) ?? {
      price: 0,
      booking: 0,
      whatsapp: 0,
    };

    spendingsData.push(el?.price);
    bookingAppData.push(el?.booking);
    whatsAppData.push(el?.whatsapp);
  });

  return { paymentsData, spendingsData, bookingAppData, whatsAppData };
});

definePageMeta({
  layout: "admin",
});
</script>

<style lang="scss" scoped>
.admin-dashboard {
  &__charts {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 40px;
  }
}
</style>
