<template>
  <tr class="table__tr">
    <td class="table__td">
      <UiCheckbox />
    </td>
    <td class="table__td">{{ car?.id }}</td>
    <td class="table__td">{{ car?.title }}</td>
    <td class="table__td"></td>
    <td class="table__td">
      <UiSwitch />
    </td>
    <td class="table__td">
      {{ moment(car?.created_at).format("DD MMM YYYY") }}
    </td>
    <td class="table__td">
      <template v-for="item in prices" :key="item?.id">
        {{ `${item?.price} / ${item?.period}` }} <br />
      </template>
    </td>
    <td class="table__td">
      <NuxtLink class="link" :to="'/admin/cars/' + car?.id">Edit</NuxtLink>
    </td>
    <td class="table__td">
      <UiButton>Promote</UiButton>
    </td>
  </tr>
</template>

<script setup>
import moment from "moment";

const props = defineProps({
  car: Object,
});

const prices = computed(() =>
  props.car?.price_periods?.map((item) => ({
    price: `AED ${formatNumber(item?.price)}`,
    period: convertPeriod(item?.period),
  }))
);
</script>

<style lang="scss" scoped></style>
